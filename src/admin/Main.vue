<template>
  <div>
    <canvas ref="lineChart"></canvas>
  </div>
</template>

<script>
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}年${month}月${day}日`;
};

export default {
  data() {
    return {
      deviceData: [],
    };
  },
  mounted() {
    this.fetchDeviceData();
  },
  methods: {
    fetchDeviceData() {
      axios.get('/api/device/findAllDevice')
        .then(response => {
          // 转换日期字符串为 JavaScript Date 对象
          this.deviceData = response.data.map(device => ({
            ...device,
            create_date: new Date(device.create_date),
          }));
          this.renderLineChart();
        })
        .catch(error => {
          console.error('Error fetching device data', error);
        });
    },
    renderLineChart() {
  Chart.register(...registerables, 'date-fns');  // 注册适配器

  const ctx = this.$refs.lineChart.getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: this.deviceData.map(device => device.create_date),
      datasets: [{
        label: 'Device Count',
        borderColor: 'rgb(75, 192, 192)',
        data: this.deviceData.map(device => device.id),
      }],
    },
    options: {
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
          },
          title: {
            display: true,
            text: 'Create Date',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Device Count',
          },
        },
      },
    },
  });
},

    
  },
};
</script>

<style>
/* 在这里添加样式，根据需要调整图表的外观 */
</style>
