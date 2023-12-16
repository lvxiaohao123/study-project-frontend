<template>
    <Hander></Hander>
    <div class="device-form-container">
      <h1>发布设备</h1>
      <form @submit.prevent="submitDevice">
        <label for="title">新闻资讯标题:</label>
        <input type="text" id="title" v-model="device.title" required>
  
        <label for="author">新闻资讯作者:</label>
        <input type="text" id="author" v-model="device.author" required>
  
        <!-- <label for="create_date">创建日期:</label>
        <input type="text" id="create_date" v-model="device.create_date" required> -->
  
        <label for="content">新闻资讯内容:</label>
        <textarea id="content" v-model="device.content" required></textarea>
  
        <label for="image_path">设备图片路径:</label>
        <input type="file" id="image_path" accept="image/*" @change="handleImageUpload" required>
  
        <button type="submit">发布新闻资讯</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useStore } from '@/stores';
  import router from '../../router';
  
  const file = ref(null);
  const store = useStore();
  const device = ref({
    title: '',
    author: '',
    // create_date: '',
    create_date:new Date(),
    content: '',
    image_path: '',
    id: store.auth.user.id
  });
  
  const goBack = () => {
    router.push('/Forum'); // 返回新闻列表页的路由
  };
  
  const handleImageUpload = (event) => {
    file.value = event.target.files[0];
  };
  
  const submitDevice = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file.value);
      formData.append('title', device.value.title);
      formData.append('author', device.value.author);
      formData.append('create_date', device.value.create_date);
      formData.append('content', device.value.content);
      formData.append('image_path', device.value.image_path);
      formData.append('id', device.value.id);
  
      // 发送设备数据和图片文件到后端
      await axios.post('/api/news/addNews', formData);
  
      // 清空表单
      device.value = {
        title: '',
        author: '',
        create_date: '',
        content: '',
        image_path: '',
        id: store.auth.user.id
      };
  
      // 提示用户发布成功
      alert('新闻资讯发布成功！');
      router.push("/newsManage");
    } catch (error) {
      console.error('Error publishing device:', error);
      alert('新闻资讯发布失败！');
    }
  };
  </script>
  
  <style scoped>
  .device-form-container {
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
  /* 样式保持不变 */
  </style>
  