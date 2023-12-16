<template>
    <div>
      <el-header></el-header>
      <div class="post-page">
        <h1 class="page-title">帖子列表</h1>
        <el-table :data="posts" style="width: 100%">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="user_id.id" label="用户ID"></el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="content" label="内容"></el-table-column>
          <el-table-column prop="create_date" label="创建日期">
          <template #default="{ row }">{{ formatDate(row.create_date) }}</template>
        </el-table-column>
          <el-table-column prop="image_path" label="图片路径"></el-table-column>
          <el-table-column label="操作">
            <template #default="{ row }">

              <el-button type="primary" @click="deletePost(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import router from '../../router';
  
  const posts = ref([]);
  
  const fetchPostData = async () => {
    try {
      const response = await axios.get('/api/post/findAllPost');
      posts.value = response.data;
    } catch (error) {
      console.error('获取贴子数据时出错：', error);
    }
  };
  const formatDate = (timestamp) => {
    console.log(posts);
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}年${month}月${day}日`;
};


  const goToPostUpdate = (postId) => {
    router.push(`/UpdatePost/${postId}`);
  };
  
  const deletePost = async (postId) => {
    try {
      await axios.post(`/api/post/deletePostByID?id=${postId}`);
      // 如果删除成功，你可能还需要重新获取设备数据以更新列表
      fetchPostData();
    } catch (error) {
      console.error('删除贴子时出错：', error);
    }
  };
  
  function toInsert() {
    router.push(`/InsertPost`);
  }
  
  onMounted(() => {
    fetchPostData();
  });
  </script>
  
  <style scoped>
  .post-page {
    max-width: 1200px;
    margin: 20px auto;
  }
  
  .page-title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  </style>
  