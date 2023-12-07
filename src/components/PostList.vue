<!-- postList.vue -->
<template>
  <div class="profile-container">
    <div class="profile-section">
      <h2 class="section-title">帖子列表：</h2>
      <el-button type="primary" :icon="Edit" circle @click="goAddPost"/>
      <ul class="post-list">
        <li v-for="postItem in post" :key="postItem.id" @click="goToPostDetail(postItem.id)">
          <div class="post-image">
            <p style="margin: 0;font-size: 18px;color:#015197;">{{ postItem.title }}</p>
            <p class="content">{{postItem.content}}</p>
            <img :src="postItem.image_path" alt="post Image">
          </div>
          <div>
            <p class="date"><el-icon><User /></el-icon>{{ postItem.user_id.username }}</p>
            <p class="date"><el-icon><Clock /></el-icon>{{ formatDate(postItem.create_date) }}</p>
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
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'

  const post = ref([]);
  
  const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}年${month}月${day}日`;
};


const goAddPost = () => {
    router.push('/Addpost'); //跳转添加帖子页面
  };

  const fetchProductData = async () => {
    try {
      const response = await axios.get('/api/findAllPost');
      post.value = response.data;
      console.log(post.value);
    } catch (error) {
      console.error('Error fetching post data:', error);
      ElMessage.error('Failed to fetch post data');
    }
  };
  
  onMounted(() => {
    fetchProductData();
  });

  const goToPostDetail = (newsId) => {
  router.push(`/post/${newsId}`);
};

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
    background-color: rgba(255, 255, 255, 0.97); /* 80% 的不透明度的白色 */
    padding: 20px;
    border-radius: 8px;
    border-bottom: 2px solid #5bc0de;  
    width: 800px;
    margin: 0 auto; /* 设置左右外边距为 auto 实现水平居中 */
}


  .section-title {
    border-bottom: 2px solid #5bc0de; /* 添加蓝色横线边框 */
    display: inline-block; /* 让边框包裹标题内容 */
    padding-bottom: 5px; /* 调整边框与文字的间距 */
    margin-right: 600px;
    margin-bottom: 20px;
  }

  .post-list {
    list-style: none;
    /* display: flex;
    flex-wrap: wrap; 允许多行布局 */
  }

  .post-list li {
    cursor: pointer;
    width: 500px; /* 设置固定宽度 */
    border: 1px solid #ddd;
    margin-right: 30px;
    margin-bottom: 20px; /* 间距调整 */
    padding: 10px;
    background-color: #fff;
    border:none;
  }

  .post-image img {
    max-width: 100%;
    height: 100px;
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
    display: inline; /* 或者 display: inline-block; */
    margin-left: 20px;
    margin-right: 20px;
  }

  .news-container {
    max-width: 100vw;
    margin: 0 auto;
    padding: 20px;
    background-size: cover;
    background-image: url('src/img/0100.jpeg');
  }

  .content {
    color: grey;
  }
</style>
