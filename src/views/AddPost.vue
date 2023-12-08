<template>
   <button style="margin: 10px;" @click="goBack">返回</button>
  <div class="add-post-container">
    <h1>添加帖子</h1>
    <form @submit.prevent="submitPost">
      <label for="title">标题:</label>
      <input type="text" id="title" v-model="post.title" required>

      <label for="content">内容:</label>
      <textarea id="content" v-model="post.content" required></textarea>

      <label for="image">上传图片:</label>
      <input type="file" id="image" style="border:none ;" @change="handleFileChange" accept="image/*">

      <button type="submit">提交</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { ElMessage } from "element-plus";
import { useStore } from "@/stores";
import router from "@/router";


const store = useStore();
const post = ref({
  title: '',
  content: '',
  author: '',
  image: null,
  create_date:new Date(),
  id:store.auth.user.id,
});

const submitPost = async () => {
  try {
    const formData = new FormData();
    formData.append('id', post.value.id);
    formData.append('title', post.value.title);
    formData.append('content', post.value.content);
    formData.append('file', post.value.image);
    formData.append('create_date', post.value.create_date);

    // 向后端发送 POST 请求
    const response = await axios.post('/api/addPost', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('帖子添加成功:', response.data);
    // 跳转到/Forum
    router.push('/Forum');
  } catch (error) {
    console.error('帖子添加失败:', error);
  }
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  post.value.image = file;
};

const goBack = () => {
  router.push('/Forum'); // 假设有一个路由配置为 '/index'
};
</script>

<style scoped>
.add-post-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
}

input, textarea {
  margin-bottom: 15px;
  padding: 8px;
  border: 1px solid black;
  border-radius: 4px;
}

.image {
  margin-bottom: 15px;
  padding: 8px;
  border-radius: 4px;
}


button {
  background-color: #3498db;
  color: #fff;
  padding: 10px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
}
</style>
