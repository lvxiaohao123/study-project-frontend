<template>
    <div>
      <el-header></el-header>
      <div class="order-page">
        <h1 class="page-title">订单列表</h1>
        <el-table :data="orders" style="width: 100%">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="buyer_id.username" label="买家"></el-table-column>
          <el-table-column prop="device_id." label="设备"></el-table-column>
          <el-table-column prop="order_date" label="创建日期">
          <template #default="{ row }">{{ formatDate(row.order_date) }}</template>
        </el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
         
        </el-table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import router from '../router';
  
  const orders = ref([]);
  
  const fetchOrderData = async () => {
    try {
      const response = await axios.get('/api/order/findBuyer');
      orders.value = response.data;
    } catch (error) {
      console.error('获取订单数据时出错：', error);
    }
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', options);
  };
  
  const goToOrderUpdate = (orderId) => {
    router.push(`/UpdateOrder/${orderId}`);
  };
  
  const deleteOrder = async (orderId) => {
    try {
      await axios.post(`/api/order/deleteOrderByID?id=${orderId}`);
      // 如果删除成功，你可能还需要重新获取订单数据以更新列表
      fetchOrderData();
    } catch (error) {
      console.error('删除订单时出错：', error);
    }
  };
  
  function toInsert() {
    router.push(`/InsertOrder`);
  }
  
  onMounted(() => {
    fetchOrderData();
  });
  </script>
  
  <style scoped>
  .order-page {
    max-width: 1200px;
    margin: 20px auto;
  }
  
  .page-title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  </style>
  