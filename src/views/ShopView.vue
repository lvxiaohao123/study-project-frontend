<template>
  <Header></Header>
  <div class="product-page">
    <h1 class="page-title">商品列表</h1>

    <!-- 当有设备时渲染设备列表，否则显示 <el-empty> -->
    <div v-if="devices.length > 0" class="product-list">
      <div  v-for="device in devices" :key="device.id" class="product-card" @click="goToDeviceDetail(device.id)">
        <div class="product-image">
          <img :src="device.image_path" alt="Product Image">
        </div>
        <div class="product-details">
          <h2 class="product-name">{{ device.name }}</h2>
          <p class="product-description">{{ device.description.slice(0, 20) }}{{ device.description.length > 30 ? '...' : '' }}</p>
          <p class="product-price">¥:{{ device.price.toFixed(2) }}</p>
        </div>
      </div>
    </div>

    <!-- 没有设备时显示 <el-empty> -->
    <el-empty v-else description="description" />
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from '../router';
import '../css/ShopView.css';
  
  const devices = ref([]);
  
  const fetchDeviceData = async () => {
    try {
      const response = await axios.get('/api/device/findAvailableDevice');
      devices.value = response.data;
    } catch (error) {
      console.error('Error fetching device data:', error);
    }
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', options);
  };
  
  const goToDeviceDetail = (deviceId) => {
  router.push(`/device/${deviceId}`);
};

  onMounted(() => {
    fetchDeviceData();
  });
  </script>
  
  <style scoped>
  </style>
  