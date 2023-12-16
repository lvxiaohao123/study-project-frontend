<template>
    <div>
      <el-header></el-header>
      <div class="product-page">
        <el-button type="primary" @click="ToInsert()">添加用户</el-button>
        <h1 class="page-title">用户列表</h1>
        <el-table :data="users" style="width: 100%">
          <el-table-column prop="username" label="用户名"></el-table-column>
          <el-table-column prop="password" label="密码"></el-table-column>

          <el-table-column prop="email" label="电子邮箱"></el-table-column>
          <el-table-column prop="role" label="用户类型">

          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button type="primary" @click="goTouserUpdate(row.id)">编辑</el-button>
              <el-button type="primary" @click="Deleteuser(row.id)">删除</el-button>
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
  
  const users = ref([]);

  const fetchuserData = async () => {
    try {
      const response = await axios.get('/api/user/findAllUser');
      users.value = response.data;
    } catch (error) {
      console.error('获取设备数据时出错：', error);
    }
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', options);
  };

  const goTouserUpdate = (userId) => {
    router.push(`/UpdateUser/${userId}`);
  };
  
  const Deleteuser = async (userId) => {
    try {
      await axios.post(`/api/user/deleteUserByID?id=${userId}`);
      // 如果删除成功，你可能还需要重新获取设备数据以更新列表
      fetchuserData();
    } catch (error) {
      console.error('删除设备时出错：', error);
    }
  };
  function ToInsert(){
  router.push(`/InsertUser`);
}

  onMounted(() => {
    fetchuserData();
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
    