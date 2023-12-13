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
                <el-icon @click="addFavorite"><Star /></el-icon>
                <h1>{{ device.name }}</h1>
                <p class="description">{{ device.description }}</p>
                <p>价格: <span style="color: red;">¥{{ device.price }}</span></p>
                <p>地点: {{ device.location }}</p>
                <p>发布日期: {{ formatDate(device.create_date) }}</p>

                <!-- 添加条件渲染 -->
                <template v-if="hasProduct(device.id) && device.available!='已售出'" >
                  <button class="purchase-button" @click="goToUpdateProduct(device.id)">编辑</button>
                </template>
                <template v-if="device.available!='已售出' && !hasProduct(device.id)">
                  <el-button @click="purchase" type="primary" class="purchase-button">购买</el-button>
                </template>
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
  import {useStore} from "@/stores";
  
  const device = ref({});
  const route = useRoute();
  const router = useRouter();
  const store = useStore()
   const products = ref([]);

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

 

const fetchProductData = async () => {
  try {
    const response = await axios.get(`/api/device/findUserAbleDevice?user_id=${store.auth.user.id}`);
    products.value = response.data;
  } catch (error) {
    console.error('Error fetching product data:', error);
    ElMessage.error('Failed to fetch product data');
  }
};//检查该商品是否是自己发布的商品
  
const hasProduct = (productId) => {
  return products.value.some(product => product.id === productId);
};

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

const addFavorite = async () => {
    try {
      const favoriteData = {
        device_id: device.value,// 设备
        user_id: store.auth.user ,
      };

      const response = await axios.post(`/api/favorite/addFavorite`, favoriteData);

      // 处理成功，可以显示提示信息给用户
      console.log('商品已收藏:', response.data);
      ElMessage.success('收藏成功！');
      router.push(`/Shop`);
    } catch (error) {
      console.error('添加商品到收藏夹时出错:', error);
      ElMessage.error('收藏失败！');
      // 处理错误，可以显示错误消息给用户或者记录错误日志
    }
  };

  onMounted(() => {
  fetchProductData();
});

const goToUpdateProduct = (productId) => {
  router.push(`/UpdateDevice/${productId}`);
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
  max-width: 300px;
  border-radius: 8px;
}

.product-info-card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px; /* 添加上边距，让信息框和图片分开 */
  width: 800px;
  max-width: 800x; /* 设置信息框最大宽度，以便更好地控制它的宽度 */
}

.purchase-button {
  background-color: rgb(154, 150, 150); /* 设置按钮背景色为蓝色 */
  color: #fff; /* 设置按钮文本颜色为白色 */
  padding: 8px 16px; /* 添加内边距 */
  margin: 10px;
  border: none; /* 移除边框 */
  cursor: pointer;
  height: 40px;
  border-radius: 4px; /* 圆角按钮 */
}
</style>