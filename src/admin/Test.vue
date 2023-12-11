<template>
  <div>
    <el-header></el-header>
    <div class="product-page">
      <h1 class="page-title">设备列表</h1>
      <el-table :data="devices" style="width: 100%">
        <el-table-column prop="name" label="设备名称"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column prop="price" label="价格">
          <template #default="{ row }">¥{{ row.price.toFixed(2) }}</template>
        </el-table-column>
        <el-table-column prop="location" label="地点"></el-table-column>
        <el-table-column prop="available" label="状态">
          <template #default="{ row }">{{ row.available ? '可用' : '不可用' }}</template>
        </el-table-column>
        <el-table-column prop="create_date" label="创建日期">
          <template #default="{ row }">{{ formatDate(row.create_date) }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" @click="goToDeviceDetail(row.id)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import router from '../router';
  
  const devices = ref([]);
  
  const fetchDeviceData = async () => {
    try {
      const response = await axios.get('/api/device/findAllDevice');
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
  
  const goToDeviceDetail = (deviceId) => {
    router.push(`/device/${deviceId}`);
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
  </style>
  