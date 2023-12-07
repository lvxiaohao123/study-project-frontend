<template>
  <div>
    <h1>论坛</h1>

    <div>
      <label for="searchInput">搜索：</label>
      <input type="text" id="searchInput" v-model="searchStr" @input="searchPosts">
    </div>

    <div v-if="posts.length === 0">
      <p>没有找到帖子。</p>
    </div>

    <ul v-else>
      <li v-for="post in posts" :key="post.id">
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
        <button @click="deletePost(post.id)">删除</button>
      </li>
    </ul>

    <div>
      <h2>添加新帖子：</h2>
      <label for="newTitle">标题：</label>
      <input type="text" id="newTitle" v-model="newPost.title">

      <label for="newContent">内容：</label>
      <textarea id="newContent" v-model="newPost.content"></textarea>

      <button @click="addPost">添加帖子</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: [],
      searchStr: '',
      newPost: {
        title: '',
        content: ''
      }
    };
  },
  mounted() {
    this.fetchAllPosts();
  },
  methods: {
    fetchAllPosts() {
      axios.get('/api/findAllPost')
        .then(response => {
          this.posts = response.data;
        })
        .catch(error => {
          console.error('获取帖子时出错：', error);
        });
    },
    searchPosts() {
      axios.get(`/api/findPostByStr?searchStr=${this.searchStr}`)
        .then(response => {
          this.posts = response.data;
        })
        .catch(error => {
          console.error('搜索帖子时出错：', error);
        });
    },
    deletePost(postId) {
      axios.delete(`/api/deletePostByID?id=${postId}`)
        .then(response => {
          if (response.status === 200) {
            this.fetchAllPosts();
          } else {
            console.error('删除帖子时出错：', response);
          }
        })
        .catch(error => {
          console.error('删除帖子时出错：', error);
        });
    },
    addPost() {
      axios.post('/api/addPost', this.newPost)
        .then(response => {
          if (response.status === 200) {
            this.fetchAllPosts();
            this.newPost.title = '';
            this.newPost.content = '';
          } else {
            console.error('添加帖子时出错：', response);
          }
        })
        .catch(error => {
          console.error('添加帖子时出错：', error);
        });
    }
  }
};
</script>

<style scoped>
/* Add your component styles here */
</style>
