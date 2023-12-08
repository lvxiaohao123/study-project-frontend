<template>
  <Header></Header>
  <div class="profile-container">
    <div class="profile-section">
      <button @click="goBack">返回</button>
        <div v-if="selectedNews" class="news-detail-container">
          <h1>{{ selectedNews.title }}</h1>
          <div class="message">
            <p class="date" style="margin-left: 70%;">作者：{{ selectedNews.author }}</p>
            <p class="date">发布日期: {{ formatDate(selectedNews.create_date )}}</p>
          </div>
          <div class="content">
            <img :src="selectedNews.image_path" alt="News Image">
            <p class="content">{{ selectedNews.content }}</p>    
          </div>      
        </div>
        <div v-else>
          <p>Loading...</p> <!-- 或者其他加载状态的提示 -->
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { ElMessage } from 'element-plus';
  import router from '@/router';
  
  const selectedNews = ref(null);
  const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString(); // 只返回年月日部分
};
  const fetchNewsDetail = async () => {
    const newsId = router.currentRoute.value.params.id;
  
    try {
      const response = await axios.get(`/api/news/findNewsByID?id=${newsId}`);
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
  max-width: auto;
  margin: 0 auto;
  padding: 20px;
  overflow-y: auto; /* 添加垂直滚动条 */
  max-height: 500px; /* 设置最大高度，根据需要调整 */
}

  .date {
    color: grey;
    display: inline; /* 或者 display: inline-block; */
    margin-right: 20px;
  }

h1 {
  text-align: center;
}
.message {
  margin: 20px;
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

  .profile-container {
    max-width: 100vw;
    margin: 0 auto;
    padding: 20px;
    background-size: cover;
    background-image: url('../../src/img/0100.jpeg');
  }
  .profile-section {
    background-color: rgba(255, 255, 255, 0.95); /* 80% 的不透明度的白色 */
    padding: 20px;
    border-radius: 8px;
    border-bottom: 2px solid #5bc0de;
    height: 600px;
}

.content {
  text-indent: 2em; /* 首段缩进两字符 */
  line-height: 2; /* 段间距1.5倍 */
  font-size: large;
}

img {
  max-width: 100%;
  height: 300px;
}

.content {
  text-indent: 2em; /* 首段缩进两字符 */
  line-height: 2; /* 段间距1.5倍 */
  font-size: large;
}

.content img {
  float: left; /* 让图片向左浮动 */
  max-width: 50%; /* 图片最大宽度为内容的一半，根据需要调整 */
  margin-right: 20px; /* 右边距，以便文字不紧贴图片 */
}

  </style>
  