<template>
  <div class="profile-container">
    <div class="profile-section">
      <h2 class="section-title">科普小知识</h2>
      <h3 class="to-More" @click="toMoreNews()">更多新闻>>></h3>
      <ul class="news-list">
        <li v-for="(newsItem) in news.slice(0, 6)" :key="newsItem.id" class="news-item" @click="goToNewsDetail(newsItem.id)">
          <div class="news-image">
            <img :src="newsItem.image_path" alt="News Image">
            <h3 style="margin: 0;">{{ newsItem.title }}</h3>
            <p class="date">{{ formatDate(newsItem.create_date) }}</p>
          </div>
        </li>     
      </ul>
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

const fetchNewsData = async () => {
  try {
    const response = await axios.get('/api/findAllNews');
    news.value = response.data;
  } catch (error) {
    console.error('Error fetching news data:', error);
    ElMessage.error('Failed to fetch news data');
  }
};
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString(); // 只返回年月日部分
};

const goToNewsDetail = (newsId) => {
  router.push(`/news/${newsId}`);
};

onMounted(() => {
  fetchNewsData();
});

function toMoreNews(){
  router.push('/News');
}
</script>


<style scoped>
  .to-More{
    cursor: pointer;
    float: right;
}
  .profile-container {
    max-width: 100vw;
    margin: 0 auto;
    padding: 20px;
    background-size: cover;
    background-image: url('../../src/img/0100.jpeg');
  }
  .profile-section {
    background-color: rgba(255, 255, 255, 0.9); /* 80% 的不透明度的白色 */
    padding: 20px;
    border-radius: 8px;
    border-bottom: 2px solid #5bc0de;
}


  .section-title {
    border-bottom: 2px solid #5bc0de; /* 添加蓝色横线边框 */
    display: inline-block; /* 让边框包裹标题内容 */
    padding-bottom: 5px; /* 调整边框与文字的间距 */
  }

  .news-list {
    list-style: none;
    display: flex;
    flex-wrap: wrap; /* 允许多行布局 */
  }

  .news-item {
    cursor: pointer;
    width: 26.5%; /* 设置固定宽度 */
    border: 1px solid #ddd;
    margin-left: 50px;
    margin-right: 20px;
    margin-top: 10px;
    margin-bottom: 20px; /* 间距调整 */
    padding: 10px;
    border-radius: 8px;
    background-color: #fff;
  }

  .news-image img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }

  .news-details {
    flex-grow: 1;
  }

  .description {
    margin-bottom: 10px;
  }

  .date {
    margin: 0;
    color: gray;
  }
</style>