<template>
    <div class="news-form-container">
      <h1>编辑新闻资讯</h1>
      <img :src="`../../${news.image_path}`" alt="Product Image">
      <form @submit.prevent="submitDevice">
        <label for="title">新闻标题:</label>
        <input type="text" id="title" v-model="news.title" required>
  
        <label for="author">新闻作者:</label>
        <input type="text" id="author" v-model="news.author" required>
  
        <label for="content">新闻内容:</label>
        <textarea id="content" v-model="news.content" required></textarea>
  
  
  
        <label for="image">设备图片:</label>
        <p>当前选图片路径: {{ news.image_path }}</p>
        <input type="file" id="image" accept="image/*" @change="handleImageUpload">
  
        <button type="submit">提交编辑</button>
      </form>
      <button @click="goBack">返回</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  import router from '../../router';
  
  const file = ref(null);
  const route = useRoute();
  const news = ref({
    title: '',
    author: '',
    content: '',
   
    image_path: '',
    id: route.params.id
  });
  
  const goBack = () => {
    router.push('/newsManage');
  };
  
  const handleImageUpload = (event) => {
    file.value = event.target.files[0];
  };
  
  const submitDevice = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file.value);
      formData.append('title', news.value.title);
      formData.append('author', news.value.author);
      formData.append('content', news.value.content);
   
      formData.append('id', news.value.id);
      formData.append('image_path', news.value.image_path);

      
  
      // 发送设备数据和图片文件到后端
      await axios.post(`/api/news/updateNews`, formData);
  
      // 提示用户发布成功
      alert('设备更新成功！');
      router.push("/newsManage");
    } catch (error) {
      console.error('Error publishing news:', error);
      alert('设备编辑失败！');
    }
  };
  
  onMounted(async () => {
    // 在组件挂载后可以进行一些初始化操作
    try {
      const response = await axios.get(`/api/news/findNewsByID?id=${route.params.id}`);
      const fetchedDevice = response.data; // Assuming the API response contains the users data
      // 将获取到的设备数据填充到 news 对象中
      Object.assign(news.value, fetchedDevice);
    } catch (error) {
      console.error('Error fetching news data:', error);
    }
  });
  </script>
  
  <style scoped>
  .news-form-container {
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
  
  img {
    max-width: 100%; /* Ensure the image doesn't exceed the container width */
    max-height: 400px; /* Set a maximum height for the image */
    margin-bottom: 16px;
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
  