<template>
    <div>
      <Header></Header>
      <div class="product-detail">
        <el-container class="container">
          <!-- 商品详情主体内容 -->
          <el-main class="main">
            <el-row class="product-row">
              <el-col :span="12">
                <!-- 商品图片 -->
                <div class="product-image">
                  <img :src="`../../${device.image_path}`" alt="Product Image">
                </div>
              </el-col>
              <el-col :span="12">
                <!-- 商品信息 -->
                <el-card class="product-info-card">
                  <h1>{{ device.name }}</h1>
                  <p class="description">{{ device.description }}</p>
                  <p>价格: <span style="color: red;">¥{{ device.price }}</span></p>
                  <p>地点: {{ device.location }}</p>
                  <p>状态: {{ device.available ? '可用' : '不可用' }}</p>
                  <p>创建日期: {{ formatDate(device.create_date) }}</p>
                  <el-button @click="purchase" type="primary" class="purchase-button">购买</el-button>
                </el-card>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
      </div>
    </div>
  </template>

  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { ElButton, ElContainer, ElHeader, ElMain, ElCard, ElRow, ElCol } from 'element-plus';
  import { useRoute, useRouter } from 'vue-router';
  
  const device = ref({});
  const route = useRoute();
  const router = useRouter();
  
  const fetchDeviceDetails = async () => {
    try {
      const deviceId = route.params.id;
      const response = await axios.get(`/api/device/findDeviceByID?id=${deviceId}`);
      device.value = response.data;
    } catch (error) {
      console.error('Error fetching device details:', error);
    }
  };
  
  onMounted(() => {
    fetchDeviceDetails();
  });
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', options);
  };
  
const purchase = () => {
  if (router && device && device.value && device.value.id) {
    // 导航逻辑
    router.push(`/to-buy/${device.value.id}`);
  } else {
    console.error('购买失败，缺少必要的信息');
  }
};


  </script>
<style scoped>
.product-row {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-image img {
  height: 60%;
  width: auto;
  max-width: 800px;
  border-radius: 8px;
}

.product-info-card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px; /* 添加上边距，让信息框和图片分开 */
  width: 800px;
  max-width: 800x; /* 设置信息框最大宽度，以便更好地控制它的宽度 */
}

.purchase-button {
  margin-top: 20px;
  width: 100%;
}
</style>