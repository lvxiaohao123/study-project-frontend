<template>
  <Header></Header>
  <el-container class="profile-container">
    <!-- 头部 -->
    <el-header class="profile-header">
      <div class="user-avatar">
        <!-- Add user avatar or profile image here -->
        <img src="avatar.jpg" alt="User Avatar">
      </div>
      <div class="user-info">
        <h1>{{ store.auth.user.username }}的个人主页</h1>
        <p>欢迎回来！</p>
        <el-button @click="logout" type="danger" plain>退出登录</el-button>
      </div>
    </el-header>

    <!-- 主体内容 -->
    <el-main>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card>
            <template #header>
              <h2>你发布的的商品</h2>
            </template>
            <div class="product-list">
              <el-row :gutter="20">
                <el-col v-for="product in products" :key="product.id" :span="8">
                  <el-card class="product-card">
                    <div class="product-image">
                      <img :src="product.image_path" alt="Product Image">
                    </div>
                    <div class="product-details">
                      <h3>{{ product.name }}</h3>
                      <p class="description">{{ product.description }}</p>
                      <p>价格: {{ product.price }}</p>
                      <p>地点: {{ product.location }}</p>
                      <p>状态: {{ product.available ? '可用' : '不可用' }}</p>
                      <p>创建日期: {{ product.create_date }}</p>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { ElCard, ElRow, ElCol, ElButton } from 'element-plus';
import { useStore } from '@/stores';
import router from '@/router';

const store = useStore();
const products = ref([]);

const fetchProductData = async () => {
  try {
    const response = await axios.get('/api/device/findAllDevice');
    products.value = response.data;
  } catch (error) {
    console.error('Error fetching product data:', error);
    ElMessage.error('Failed to fetch product data');
  }
};

const logout = () => {
  // Implement logout functionality
  router.push('/login'); // Redirect to login page after logout
};

onMounted(() => {
  fetchProductData();
});
</script>

<style scoped>
.profile-container {
  max-width: 1200px;
  margin: 0 auto;
}

.profile-header {
  background-color: #fff;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-avatar img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.user-info {
  margin-top:auto ;
  text-align: right;
}

.product-list {
  margin-top: 20px;
}

.product-card {
  margin-bottom: 20px;
  transition: transform 0.3s;
}

.product-card:hover {
  transform: scale(1.05);
}

.product-image img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-bottom: 1px solid #e0e0e0;
}

.product-details {
  padding: 15px;
}

.description {
  color: #666;
}

.el-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
</style>
