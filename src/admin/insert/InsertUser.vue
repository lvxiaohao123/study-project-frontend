
<template>
    <div class="user-form-container">
      <h1>添加用户</h1>
      <form @submit.prevent="submitUser">
        <label for="username">用户名:</label>
        <input type="text" id="username" v-model="user.username" required>
  
        <label for="password">密码:</label>
        <textarea type="text" id="description" v-model="user.password" required></textarea>
  
        <label for="email">电子邮箱:</label>
        <input  type="text" id="email" v-model="user.email" required>
  
        <label for="address">地址:</label>
        <input type="text" id="address" v-model="user.address" required>

        <label for="role">用户类型:</label>
            <select id="role" v-model="user.role" required>
              <option value="管理员">管理员</option>
              <option value="普通用户">普通用户</option>
              <!-- 添加更多用户类型选项 -->
          </select>


        <button type="submit">提交添加</button>
      </form>
      <button @click="goBack">返回</button>
  
      </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';

  import router from '../../router';
  

  const user = ref({
    username: '',
    password: '',
    email: '',
    address: '',
    role:'',
  });
  
  const goBack = () => {
    router.push('/user');
  };
  

  
  const submitUser = async () => {
    try {
      const formData = new FormData();
      
      formData.append('username', user.value.username);
      formData.append('password', user.value.password);
      formData.append('email', user.value.email);
      formData.append('address', user.value.address);
      formData.append('role', user.value.role);
      
  
      // 发送设备数据和图片文件到后端
      await axios.post(`/api/user/addUser`, formData);
  
      // 提示用户发布成功
      alert('用户添加成功！');
      router.push("/user");
    } catch (error) {
      console.error('Error publishing user:', error);
      alert('用户添加失败！');
    }
  };
  

  </script>
  
  <style scoped>
  .user-form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  label {
    display: block;
    margin-bottom: 8px;
  }
  
  input,
  textarea,
  select {
    width: 100%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    padding: 8px;
    margin-bottom: 16px;
    box-sizing: border-box;
  }
  
  button {
    margin-right: 50px;
    margin-top: 50px;
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  