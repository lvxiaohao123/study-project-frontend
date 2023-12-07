<template>
  <div class="add-post-container">
    <h1>添加帖子</h1>
    <form @submit.prevent="submitPost">
      <label for="title">标题:</label>
      <input type="text" id="title" v-model="post.title" required>

      <label for="content">内容:</label>
      <textarea id="content" v-model="post.content" required></textarea>

      <label for="author">作者:</label>
      <input type="text" id="author" v-model="post.author" required>

      <button type="submit">提交</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const post = ref({
  title: '',
  content: '',
  author: ''
});

const submitPost = () => {
  // 在这里处理提交逻辑，可以使用 post.value 对象获取表单数据
  console.log('提交帖子:', post.value);
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
