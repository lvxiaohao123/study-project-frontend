<template>
    <div v-if="selectedNews" class="news-detail-container">
      <h2>{{ selectedNews.title }}</h2>
      <p>{{ selectedNews.content }}</p>
      <p>日期: {{ selectedNews.create_date }}</p>
      <button @click="goBack">返回</button>
    </div>
    <div v-else>
      <p>Loading...</p> <!-- 或者其他加载状态的提示 -->
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { ElMessage } from 'element-plus';
  import router from '@/router';
  
  const selectedNews = ref(null);
  
  const fetchNewsDetail = async () => {
    const newsId = router.currentRoute.value.params.id;
  
    try {
      const response = await axios.get(`/api/findNewsByID?id=${newsId}`);
      selectedNews.value = response.data;
    } catch (error) {
      console.error('Error fetching news detail:', error);
      ElMessage.error('Failed to fetch news detail');
    }
  };
  
  const goBack = () => {
    router.push('/news'); // 返回新闻列表页的路由
  };
  
  onMounted(() => {
    fetchNewsDetail();
  });
  </script>
  
  <style scoped>
  /* 样式可以根据你的需求进行调整 */
  .news-detail-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  </style>
  