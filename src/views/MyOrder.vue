<template>
  <Header></Header>
  <HomeSide></HomeSide>
  <div class="order-container">
    <h2><el-icon><List /></el-icon>我买到的</h2>

    <!-- 当有订单时渲染订单列表，否则显示 <el-empty> -->
    <ul v-if="orders.length > 0" class="order-list">
      <li v-for="order in orders" :key="order.device_id.id" class="order-item">
        <!-- 订单的详细信息 -->
        <div class="order-image">
          <img :src="order.device_id.image_path" alt="Order Image">
        </div>
        <div v-if="order" class="order-details " @click="goToDeviceDetail(order.device_id.id)">
          <h3 style="cursor: pointer;">{{ order.device_id.name }}</h3>
          <p class="description">{{ order.device_id.description.slice(0, 25) }}{{ order.device_id.description.length > 30 ? '...' : '' }}</p>
          <p>¥: {{ order.device_id.price }}</p>
          <p :style="{ color: order.status === '待发货' ? 'red' : order.status === '已发货' ? 'green' : 'black' }">
            订单状态: {{ order.status }}
          </p>
        </div>

        <!-- 取消订单按钮 -->
        <div>
          <button v-if="order.status !== '已发货'" @click="deleteOrder(order.id)">取消订单</button>
        </div>
      </li>
    </ul>

    <!-- 没有订单时显示 <el-empty> -->
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
const orders = ref([]);

const fetchOrderData = async () => {
  try {
    const response = await axios.get(`/api/order/findBuyer?id=${store.auth.user.id}`);
    orders.value = response.data;
  } catch (error) {
    console.error('Error fetching order data:', error);
    ElMessage.error('Failed to fetch order data');
  }
};

const deleteOrder = async (orderId) => {
  try {
    await axios.post(`/api/order/deleteOrderByID?id=${orderId}`);
    ElMessage.success('取消订单');
    // 可选：删除后刷新产品数据
    fetchOrderData();
  } catch (error) {
    console.error('取消订单发生错误:', error);
    ElMessage.error('取消订单失败！');
  }
};

onMounted(() => {
  fetchOrderData();
});

const goToDeviceDetail = (productId) => {
  router.push(`/device/${productId}`);
};//跳转商品详情页

</script>


<style scoped>

</style>
