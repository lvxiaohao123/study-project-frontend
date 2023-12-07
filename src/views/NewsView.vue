<template>
  <Header></Header>
  <div class="news-container">
    <h1>新闻列表</h1>
    <ul class="news-list">
      <li v-for="newsItem in news" :key="newsItem.id" @click="showNewsDetail(newsItem)">
        <h3>{{ newsItem.title }}</h3>
        <p>{{ newsItem.create_date }}</p>
        <!-- 其他新闻信息 -->
      </li>
    </ul>

    <div v-if="newsItem">
      <h2>{{ newsItem.title }}</h2>
      <p>日期: {{ newsItem.author }}</p>
      <p>日期: {{ newsItem.create_date }}</p>
      <p>{{ newsItem.content }}</p>
      <button @click="goBack">返回</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { ElMessage } from "element-plus";
import { useStore } from "@/stores";
import router from "@/router";

const store = useStore();
const news = ref([]);
const selectedNews = ref(null);

const fetchNewsData = async () => {
  try {
    const response = await axios.get('/api/findAllNews');
    news.value = response.data;
  } catch (error) {
    console.error('Error fetching news data:', error);
    ElMessage.error('Failed to fetch news data');
  }
};

const showNewsDetail = (newsItem) => {
  selectedNews.value = newsItem;
  // 跳转到新闻详情页面，假设有一个路由配置为 '/news/:id'
  router.push(`/news/${newsItem.id}`);
};

const goBack = () => {
  selectedNews.value = null;
  // 可以根据具体的路由配置来实现返回
  router.push('/index'); // 假设有一个路由配置为 '/index'
};

onMounted(() => {
  fetchNewsData();
});
</script>

<style scoped>
.news-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.news-list {
  list-style: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
}

.news-list li {
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  background-color: #fff;
}

.news-list li:hover {
  background-color: #f0f0f0;
}
</style>
