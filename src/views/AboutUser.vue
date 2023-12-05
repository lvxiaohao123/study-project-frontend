<template>
    <div class="profile-container">
      <div class="profile-header">
        <h1>Welcome, {{ store.auth.user.username }}!</h1>
        <el-button @click="logout" type="danger" plain>Logout</el-button>
      </div>
      
      <div class="profile-section">
        <h2>Your Products</h2>
        <ul class="product-list">
          <li v-for="product in products" :key="product.id" class="product-item">
            <div class="product-image">
              <img :src="product.image_path" alt="Product Image">
            </div>
            <div class="product-details">
              <h3>{{ product.name }}</h3>
              <p class="description">{{ product.description }}</p>
              <p>Price: {{ product.price }}</p>
              <p>Location: {{ product.location }}</p>
              <p>Availability: {{ product.available ? 'Available' : 'Not Available' }}</p>
              <p>Create Date: {{ product.create_date }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { ElMessage } from "element-plus";
  import { useStore } from "@/stores";
  import router from "@/router";
  
  const store = useStore();
  const products = ref([]);
  
  const fetchProductData = async () => {
    try {
      const response = await axios.get('/api/findAllDevice');
      products.value = response.data;
    } catch (error) {
      console.error('Error fetching product data:', error);
      ElMessage.error('Failed to fetch product data');
    }
  };
  
//   onMounted(() => {
//     fetchProductData();
//   });
  
</script>
  
  <style scoped>
    .profile-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
  
    .profile-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
  
    .profile-section {
      background-color: #f4f4f4;
      padding: 20px;
      border-radius: 8px;
    }
  
    .product-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  
    .product-item {
      display: flex;
      border: 1px solid #ddd;
      margin-bottom: 10px;
      padding: 10px;
      border-radius: 8px;
      background-color: #fff;
    }
  
    .product-image img {
      max-width: 100px;
      max-height: 100px;
      object-fit: cover;
      margin-right: 20px;
    }
  
    .product-details {
      flex-grow: 1;
    }
  
    .description {
      margin-bottom: 10px;
    }
  </style>
  