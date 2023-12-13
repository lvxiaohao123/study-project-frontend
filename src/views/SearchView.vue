<template>
  <Header></Header>
  <div class="news-container">
    <button @click="goBack">返回</button>
      <h1>资讯列表</h1>
      <ul class="news-list">
        <li v-for="newsItem in news" :key="newsItem.id" @click="showNewsDetail(newsItem)">
          <div style="width: 30%; float: left;">
            <h3>{{ newsItem.title }}</h3>
            <img :src="newsItem.image_path" alt="post Image">
            <p>{{ formatDate(newsItem.create_date) }}</p>
          </div>
          <div style="width: 70%; float: left;margin: 40px;">
            <p>{{ newsItem.content.slice(0, 80) }}{{ newsItem.content.length > 30 ? '......' : '' }}</p>
          </div>
        </li>
      </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from "element-plus";
import router from "@/router";
import axios from 'axios';
import { useRoute} from 'vue-router';

const news = ref([]);
const selectedNews = ref(null);
const route = useRoute();

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}年${month}月${day}日`;
};



const fetchNewsList = async () => {
  try {
    const searchStr = route.params.searchStr;
    const response = await axios.get(`/api/news/findNewsByStr?searchStr=${searchStr}`);
    news.value = response.data;
  } catch (error) {
    console.error('Error fetching device details:', error);
  }
};

  
  onMounted(() => {
    fetchNewsList();
  });

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

</script>

<style scoped>
.news-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color:grey;
  max-height: 700px;
  /* background-size: cover;
  background-image: url('../../src/img/0100.jpeg'); */
}

.news-list {
  list-style: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  max-height: 600px;
  overflow-y: auto; /* 添加垂直滚动条 */
}

.news-list img {
    max-width: 100%;
    height: 100px;
}

.news-list li {
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 0;/*列表圆角*/
  background-color: #fff;
  width: auto;
  display: flex; 
  justify-content: space-between;
}

.news-list li:hover {
  background-color: #f0f0f0;
}

button {
    background-color: #3498db; /* 设置按钮背景色为蓝色 */
    color: #fff; /* 设置按钮文本颜色为白色 */
    padding: 8px 16px; /* 添加内边距 */
    margin: 10px;
    border: none; /* 移除边框 */
    cursor: pointer;
    border-radius: 4px; /* 圆角按钮 */
  }
</style>
