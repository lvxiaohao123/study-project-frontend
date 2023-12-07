<template>
    <Header></Header>
    <div class="product-page">
      <h1 class="page-title">商品列表</h1>
      <div class="product-list">
        <div v-for="device in devices" :key="device.id" class="product-card">
          <div class="product-image">
            <img :src="device.image_path" alt="Product Image">
          </div>
          <div class="product-details">
            <h2 class="product-name">{{ device.name }}</h2>
            <p class="product-description">{{ device.description }}</p>
            <p class="product-price">价格: ¥{{ device.price.toFixed(2) }}</p>
            <p class="product-location">地点: {{ device.location }}</p>
            <p class="product-status">
              状态: {{ device.available ? '可用' : '不可用' }}
            </p>
            <p class="product-date">
              创建日期: {{ formatDate(device.create_date) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const devices = ref([]);
  
  const fetchDeviceData = async () => {
    try {
      const response = await axios.get('/api/findAllDevice');
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
  
  onMounted(() => {
    fetchDeviceData();
  });
  </script>
  
  <style scoped>
  .product-page {
    max-width: 1200px;
    margin: 20px auto;
  }
  
  .page-title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .product-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }
  
  .product-card {
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
  }
  
  .product-card:hover {
    transform: scale(1.05);
  }
  
  .product-image img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-bottom: 1px solid #e0e0e0;
    border-radius: 8px 8px 0 0;
  }
  
  .product-details {
    padding: 15px;
  }
  
  .product-name {
    font-size: 18px;
    margin-bottom: 8px;
  }
  
  .product-description {
    color: #666;
    margin-bottom: 12px;
  }
  
  .product-price {
    color: #e4393c;
    margin-bottom: 8px;
  }
  
  .product-location,
  .product-status,
  .product-date {
    margin-bottom: 8px;
    color: #999;
  }
  </style>
  