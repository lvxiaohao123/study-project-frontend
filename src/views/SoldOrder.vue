<template>
  <Header></Header>
  <HomeSide></HomeSide>
  <div class="order-container">
    <h2><el-icon><Coin /></el-icon>我卖出的</h2>
    <ul class="order-list">
      <li v-for="order in orders" :key="order.device_id.id" class="order-item">
        <div class="order-image">
          <img :src="order.device_id.image_path" alt="Order Image">
        </div>
        <div v-if="order" class="order-details ">
          <h3 style="cursor: pointer;">{{ order.device_id.name }}</h3>
          <p class="description">{{ order.device_id.description.slice(0, 25) }}{{ order.device_id.description.length > 30 ? '...' : '' }}</p>
          <p>¥: {{ order.device_id.price }}</p>
          <p :style="{ color: order.status === '待发货' ? 'red' : order.status === '已发货' ? 'green' : 'black' }">
          ¥: {{ order.status }}
        </p>
        </div>
        <button v-if="order.status !== '已发货'" style="background-color: darkorange;" @click="shipProduct(order.id)">已发货</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { useStore } from '@/stores';
import router from "@/router";
import '../css/UserHome.css';

const store = useStore();
const orders = ref([]);

const fetchOrderData = async () => {
  try {
    const response = await axios.get(`/api/order/findSeller?id=${store.auth.user.id}`);
    orders.value = response.data;
  } catch (error) {
    console.error('Error fetching order data:', error);
    ElMessage.error('Failed to fetch order data');
  }
};

const shipProduct = async (orderId) => {
  try {
    await axios.post(`/api/order/confirmOrder?id=${orderId}`);
    ElMessage.success('发货成功');
    fetchOrderData();
  } catch (error) {
    console.error('发货时出错:', error);
    ElMessage.error('发货失败');
  }
};

onMounted(() => {
  fetchOrderData();
});

</script>


<style scoped>
</style>
