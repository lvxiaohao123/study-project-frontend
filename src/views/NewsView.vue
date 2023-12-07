<template>
  <div class="news-container">
    <h1>新闻列表</h1>
    <ul class="news-list">
      <li v-for="newsItem in news" :key="newsItem.id" @click="showNewsDetail(newsItem)">
        {{ newsItem.title }}
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
import {useStore} from "@/stores";
import router from "@/router";

const store = useStore();
  const news = ref([]);
  
  const fetchProductData = async () => {
    try {
      const response = await axios.get('/api/findNewsById');
      news.value = response.data;
    } catch (error) {
      console.error('Error fetching news data:', error);
      ElMessage.error('Failed to fetch news data');
    }
  };
  
  onMounted(() => {
    fetchProductData();
  });

const goBack = () => {
  selectedNews.value = null;
  // 可以根据具体的路由配置来实现返回
  router.push('/index'); // 假设有一个路由配置为 '/news'
};
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
