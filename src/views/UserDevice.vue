<template>
  <Header></Header>
  <HomeSide></HomeSide>
  <div class="product-container">
    <h2>我的设备</h2>
    <ul class="product-list">
      <li v-for="product in products" :key="product.id" class="product-item">
        <div class="product-image">
          <img :src="product.image_path" alt="Product Image">
        </div>
        <div v-if="product" class="product-details " @click="goToDeviceDetail(product.id)">
          <h3 style="cursor: pointer;">{{ product.name }}</h3>
          <p class="description">{{ product.description.slice(0, 25) }}{{ product.description.length > 30 ? '...' : '' }}</p>
          <p>¥: {{ product.price }}</p>
          <p v-if="product.available === 1">设备状态: 未售出</p>
          <p v-else>设备状态: 已售出</p>
        </div>
        <div>
          
          <template v-if="product.available === 0">
            <button style="background-color:darkorange;" @click="shipProduct(product.id)">已发货</button>
          </template>
          <!-- 如果 available 不为 0，显示删除按钮 -->
          <template v-else>
            <button @click="goToUpdateProduct(product.id)">编辑</button><br/>
            <button @click="deleteProduct(product.id)">下架</button>
          </template>
        </div>
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

const store = useStore();
const products = ref([]);

const fetchProductData = async () => {
  try {
    const response = await axios.get(`/api/device/findDeviceByUID?user_id=${store.auth.user.id}`);
    products.value = response.data;
  } catch (error) {
    console.error('Error fetching product data:', error);
    ElMessage.error('Failed to fetch product data');
  }
};

const deleteProduct = async (productId) => {
  try {
    await axios.post(`/api/device/deleteDeviceByID?id=${productId}`);
    ElMessage.success('产品删除成功');
    // 可选：删除后刷新产品数据
    fetchProductData();
  } catch (error) {
    console.error('删除产品时出错:', error);
    ElMessage.error('产品删除失败');
  }
};

onMounted(() => {
  fetchProductData();
});

const goToUpdateProduct = (productId) => {
  router.push(`/UpdateDevice/${productId}`);
};

const goToDeviceDetail = (productId) => {
  router.push(`/device/${productId}`);
};
</script>


<style scoped>
.product-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: grey;
  max-height: 700px;
}

.product-list {
  list-style: none;
  padding: 0;
  margin: 0;
  /* cursor: pointer; */
  max-height: 600px;
  overflow-y: auto; /* 添加垂直滚动条 */
}

.product-list img {
  max-width: 100%;
  height: 100px;
}

.product-list li {
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 0; /* 列表圆角 */
  background-color: #fff;
  width: auto;
  display: flex;
  justify-content: space-between;
}

.product-list li:hover {
  background-color: #f0f0f0;
}

button {
  background-color: firebrick; /* 设置按钮背景色为蓝色 */
  color: #fff; /* 设置按钮文本颜色为白色 */
  padding: 8px 16px; /* 添加内边距 */
  margin: 10px;
  border: none; /* 移除边框 */
  cursor: pointer;
  height: 40px;
  border-radius: 4px; /* 圆角按钮 */
  background-color: firebrick;
}

button:hover {
  background-color: darkred; /* 悬浮时改变背景颜色 */
}
</style>
