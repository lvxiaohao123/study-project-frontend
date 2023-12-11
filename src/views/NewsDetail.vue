<template>
  <Header></Header>
  <div v-if="selectedNews" class="news-detail-container">
    <el-card class="news-card">
      <h2>{{ selectedNews.title }}</h2>
      <p class="news-content">{{ selectedNews.content }}</p>
      <p class="news-date">日期: {{ formatDate(selectedNews.create_date) }}</p>
      <el-button @click="goBack" type="primary" class="back-button">返回</el-button>
    </el-card>
  </div>
  <div v-else>
    <el-alert
      title="Loading..."
      type="info"
      description="正在加载，请稍候..."
    ></el-alert>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { ElMessage, ElCard, ElButton, ElAlert } from 'element-plus';
import router from '@/router';

const selectedNews = ref(null);

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString(); // 只返回年月日部分
};

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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.news-card {
  width: 100%;
  max-width: 800px;
  margin: 20px;
  padding: 20px;
  text-align: left;
}

.news-content {
  line-height: 1.6;
}

.news-date {
  margin-top: 20px;
  color: #999;
}

.back-button {
  margin: center;
  margin-top: 20px;
}
</style>
