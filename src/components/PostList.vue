<!-- PostList.vue -->
<template>
  <div class="profile-container">
    <div class="profile-section">
      <h2 class="section-title">帖子列表：</h2>
      <ul class="post-list">
        <li v-for="postItem in post" :key="postItem.id" class="post-item">
          <div class="post-image">
            <img :src="postItem.image_path" alt="post Image">
            <h3 style="margin: 0;">{{ postItem.title }}</h3>
            <p class="date">{{ formatPostDate(postItem.create_date) }}</p>
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
import router from "@/router";

  const post = ref([]);
  
  const formatPostDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString(); // 只返回年月日部分
};

  const fetchProductData = async () => {
    try {
      const response = await axios.get('/api/findAllPosts');
      post.value = response.data;
    } catch (error) {
      console.error('Error fetching post data:', error);
      ElMessage.error('Failed to fetch post data');
    }
  };
  
  onMounted(() => {
    fetchProductData();
  });
</script>
<style scoped>
  .profile-container {
    max-width: 100vw;
    margin: 0 auto;
    padding: 20px;
    background-size: cover;
    background-image: url('src/img/0100.jpeg');
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

  .post-list {
    list-style: none;
  }

  .post-item {
    width: 100%; /* 设置固定宽度 */
    border: 1px solid #ddd;
    margin-right: 30px;
    margin-bottom: 20px; /* 间距调整 */
    padding: 10px;
    border-radius: 8px;
    background-color: #fff;
  }

  .post-image img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }

  .post-details {
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

