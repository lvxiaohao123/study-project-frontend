<template>
  <Header></Header>
  <HomeSide></HomeSide>
  <div class="order-container">
    <h2>我的订单</h2>
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
        <div>
          <button @click="deleteOrder(order.id)">取消订单</button>
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
    await axios.post(`/api/device/deleteOrderByID?id=${orderId}`);
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

</script>


<style scoped>
.order-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: grey;
  max-height: 700px;
}

.order-list {
  list-style: none;
  padding: 0;
  margin: 0;
  /* cursor: pointer; */
  max-height: 600px;
  overflow-y: auto; /* 添加垂直滚动条 */
}

.order-list img {
  max-width: 100%;
  height: 100px;
}

.order-list li {
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 0; /* 列表圆角 */
  background-color: #fff;
  width: auto;
  display: flex;
  justify-content: space-between;
}

.order-list li:hover {
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
