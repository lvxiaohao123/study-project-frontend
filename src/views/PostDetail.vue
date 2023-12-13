<!-- PostDetailView.vue -->
<template>
    <Header></Header>
    <div class="profile-container">
      <div class="profile-section">
          <button style="margin: 10px;" @click="goBack">返回</button>
          <div  v-if="selectedPost">
            <div>
              <p class="date"><el-icon><User /></el-icon>{{ selectedPost.user_id.username }}</p>
              <p class="date"><el-icon><Clock /></el-icon>{{ formatDate(selectedPost.create_date) }}</p>
            </div>
            <div>
              <h2 style="margin-left: 20px;">{{ selectedPost.title }}</h2>
              <p style="margin: 20px;">{{ selectedPost.content }}</p>
              <img :src="selectedPost.image_path" alt="Post Image">
            </div>
            <h3>评论</h3>
            <div>
              <input v-model="newComment" type="text" placeholder="输入评论">
              <button @click="addComment">提交评论</button>
            </div>
            <ul class="comment-list">
              <li v-for="commentItem in comments" :key="commentItem.id">
                <p v-if="commentItem.user_id && commentItem.user_id.username" class="comment-name">
                  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>{{ commentItem.user_id.username }}</p>
                <p class="comment-item">{{ commentItem.content }}<br/><br/><span class="date2"><el-icon><Clock /></el-icon>{{ formatDate(commentItem.create_date) }}</span></p>
                <div>
                <p class="date"></p>
                </div>
              </li>
            </ul>
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
  import { useStore } from "@/stores";


  const store = useStore();
  const comments = ref([]);
  const newComment = ref('')
  const selectedPost = ref(null);

  const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
};//格式化时间

const addComment = async () => {
  const post = router.currentRoute.value.params;
  if (newComment.value.trim() !== '') {
    const comment = {
      user_id: store.auth.user,
      content: newComment.value,
      post_id:post,
      create_date: new Date().toISOString(),
    };

    try {
      // 发送 POST 请求来添加评论
      const response = await axios.post('/api/reply/addReply', comment);
    // 插入新评论到数组的开头
    comments.value.unshift(comment);


    // 清空评论输入框
    newComment.value = '';

      console.log('回复添加成功:', response.data);
    } catch (error) {
      console.error('回复添加失败:', error);
    }
  }
};//添加评论

  const fetchPostDetail = async () => {
    const postId = router.currentRoute.value.params.id;
    try {
      const response = await axios.get(`/api/post/findPostByID?id=${postId}`);
      selectedPost.value = response.data;
      console.log(selectedPost.value.image_path)
    } catch (error) {
      console.error('Error fetching post detail:', error);
      ElMessage.error('Failed to fetch post detail');
    }
  };
  
  const goBack = () => {
    router.push('/Forum'); // 返回新闻列表页的路由
  };
  
  onMounted(() => {
    fetchPostDetail();
  });

  const fetchCommentData = async () => {
    const postId = router.currentRoute.value.params.id;
    try {
      const response1 = await axios.get(`/api/reply/findReplyByPID?id=${postId}`);
      comments.value = response1.data.reverse();
      console.log(comments.value);
    } catch (error) {
      console.error('Error fetching comments data:', error);
      ElMessage.error('Failed to fetch comments data');
    }
};

  
  onMounted(() => {
    fetchCommentData();
  });

</script>

<style scoped>

.profile-container {
    max-width: 100vw;
    margin: 0 auto;
    /* padding: 20px; */
    height: 700px;
    background-size: cover;
    background-image: url('../../src/img/0100.jpeg');
    max-height: 700px;
  }
  
  .profile-section {
    background-color: rgba(255, 255, 255, 0.97); /* 80% 的不透明度的白色 */
    padding: 20px;
    border-radius: 8px;
    border-bottom: 2px solid #5bc0de;  
    width: 700px;
    margin: 0 auto; /* 设置左右外边距为 auto 实现水平居中 */
    border: 2px solid grey;
    max-height: 100vh;
    overflow-y: auto; /* 添加垂直滚动条 */
}
.post-detail {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

input {
  border: 3px solid gray;
  height: 40px;
  border-radius: 3px;
  width: 600px;
}

.post-content {
  font-size: 16px;
  line-height: 1.5;
}

.post-image {
  max-width: 100%;
  height: 100px;
  margin-top: 10px;
}

.comments-section {
  margin-top: 20px;
}

.comment-list {
  list-style: none;
  padding: 0;
  margin: 10px;
}

.comment-item {
  margin: 15px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  border-bottom: 2px solid rgb(218, 214, 214);
  margin-left: 40px;
}

.comment-text {
  font-size: 14px;
}

.comment-date {
  font-size: 12px;
  color: gray;
}


.comment-form textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  font-size: 14px;
}

.comment-form button {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  font-size: 14px;
}



.comment-name {
  color: crimson;
  font: bold;
}

.comment-form button:hover {
  background-color: #45a049;
}

.date {
    margin: 0;
    color: gray;
    display: inline; /* 或者 display: inline-block; */
    margin: 20px;
  }

img {
  max-width: 100%;
  height: 300px;
}

  .date2 {
    color: gray;
    display: inline; /* 或者 display: inline-block; */
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
