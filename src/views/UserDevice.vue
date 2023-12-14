<template>
  <Header></Header>
  <HomeSide></HomeSide>
  <div class="order-container">
    <h2><el-icon><Goods /></el-icon>我的发布</h2>

    <!-- 当有商品时渲染商品列表，否则显示 <el-empty> -->
    <ul v-if="products.length > 0" class="order-list">
      <li v-for="product in products" :key="product.id" class="order-item">
        <!-- 商品的详细信息 -->
        <div class="order-image">
          <img :src="product.image_path" alt="Product Image">
        </div>
        <div v-if="product" class="order-details " @click="goToDeviceDetail(product.id)">
          <h3 style="cursor: pointer;">{{ product.name }}</h3>
          <p class="description">{{ product.description.slice(0, 25) }}{{ product.description.length > 30 ? '...' : '' }}</p>
          <p>¥: {{ product.price }}</p>
          <p v-if="product.available === '上架'">设备状态: 未售出</p>
          <p v-else-if="product.available === '已售出'">设备状态: 已售出</p>
          <p v-else-if="product.available === '下架'">设备状态: 下架中</p>
        </div>

        <!-- 根据商品状态显示不同按钮 -->
        <div v-if="product.available === '下架'">         
            <button @click="goToUpdateProduct(product.id)">编辑</button><br/>
            <button @click="deleteProduct(product.id)">删除</button><br/>
            <button @click="PutOnDevice(product.id)">上架</button>
        </div>
        <div v-else-if="product.available === '上架'">         
            <button @click="goToUpdateProduct(product.id)">编辑</button><br/>
            <button @click="deleteProduct(product.id)">删除</button><br/>
            <button @click="PullOffDevice(product.id)">下架</button>
        </div>
      </li>
    </ul>

    <!-- 没有商品时显示 <el-empty> -->
    <el-empty v-else description="description" />
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
const products = ref([]);

const fetchProductData = async () => {
  try {
    const response = await axios.get(`/api/device/findUserAbleDevice?user_id=${store.auth.user.id}`);
    products.value = response.data;
  } catch (error) {
    console.error('Error fetching product data:', error);
    ElMessage.error('Failed to fetch product data');
  }
};//查找自己发布的商品

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

const PutOnDevice = async (productId) => {
  try {
    await axios.post(`/api/device/PutOnDevice?id=${productId}`);
    ElMessage.success('上架成功');
    // 可选：删除后刷新产品数据
    fetchProductData();
  } catch (error) {
    console.error('上架时出错:', error);
    ElMessage.error('产品上架失败');
  }
};

const PullOffDevice = async (productId) => {
  try {
    await axios.post(`/api/device/PullOffDevice?id=${productId}`);
    ElMessage.success('下架成功');
    // 可选：删除后刷新产品数据
    fetchProductData();
  } catch (error) {
    console.error('下架时出错:', error);
    ElMessage.error('下架失败');
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
};//跳转商品详情页
</script>


<style scoped>
</style>
