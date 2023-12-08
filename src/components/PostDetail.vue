<!-- PostDetailView.vue -->
<template>
  <header></header>
  <div>
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <img :src="`../../${post.image_path}`" alt="Post Image">

    <h3>评论</h3>
    <ul>
      <li v-for="comment in post.comments" :key="comment.id">
        <p><strong>{{ comment.user_id }}</strong>: {{ comment.content }}</p>
        <p class="date">{{ comment.create_date }}</p>
      </li>
    </ul>

    <!-- 可选：添加评论表单 -->
    <div>
      <textarea v-model="newComment" rows="3" placeholder="输入评论"></textarea>
      <button @click="addComment">提交评论</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        id: 1,
        user_id: 123,
        title: '帖子标题',
        content: '帖子内容',
        create_date: '2023-01-01',
        image_path: '/path/to/image.jpg',
        comments: [
          { id: 1, user_id: 456, content: '很有用！', create_date: '2023-01-02' },
          { id: 2, user_id: 789, content: '谢谢分享。', create_date: '2023-01-03' },
          // 其他评论...
        ],
      },
      newComment: '',
    };
  },
  methods: {
    addComment() {
      // 在这里添加新评论到评论列表中
      const newComment = {
        id: this.post.comments.length + 1,
        user_id: 123, // 替换为当前用户的ID或其他逻辑
        content: this.newComment,
        create_date: new Date().toLocaleDateString(), // 或使用实际的日期逻辑
      };

      this.post.comments.push(newComment);
      this.newComment = ''; // 清空输入框
    },
  },
};
</script>

<style scoped>
.post-detail {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.post-content {
  font-size: 16px;
  line-height: 1.5;
}

.post-image {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
}

.comments-section {
  margin-top: 20px;
}

.comment-list {
  list-style: none;
  padding: 0;
}

.comment-item {
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
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

.comment-form button:hover {
  background-color: #45a049;
}
</style>
