
<template>
    <div class="user-form-container">
      <h1>编辑用户信息</h1>
      <form @submit.prevent="submitUser">
        <label for="username">用户名:</label>
        <input type="text" id="username" v-model="user.username" required>
  
        <label for="password">密码:</label>
        <textarea type="text" id="description" v-model="user.password" required></textarea>
  
        <label for="email">电子邮箱:</label>
        <input  type="text" id="email" v-model="user.email" required>
  
        <label for="address">地址:</label>
        <input type="text" id="address" v-model="user.address" required>

        <label for="role">用户类型:</label>
            <select id="role" v-model="user.role" required>
              <option value="管理员">管理员</option>
              <option value="普通用户">普通用户</option>
              <!-- 添加更多用户类型选项 -->
          </select>
        <button type="submit">提交编辑</button>
      </form>
      <button @click="goBack">返回</button>
  
      </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  import router from '../../router';
  
  const file = ref(null);
  const route = useRoute();
  const user = ref({
    username: '',
    password: '',
    email: '',
    address: '',
    role: '',
    id: route.params.id
  });
  
  const goBack = () => {
    router.push('/user');
  };
  
  const handleImageUpload = (event) => {
    file.value = event.target.files[0];
  };
  
  const submitUser = async () => {
    try {
      const formData = new FormData();

      formData.append('username', user.value.username);
      formData.append('password', user.value.password);
      formData.append('email', user.value.email);
      formData.append('address', user.value.address);
      formData.append('role', user.value.role);
      formData.append('id', user.value.id);
      
  
      // 发送设备数据和图片文件到后端
      await axios.post(`/api/user/updateUser`, formData);
  
      // 提示用户发布成功
      alert('用户编辑成功！');
      router.push("/user");
    } catch (error) {
      console.error('Error publishing user:', error);
      alert('用户编辑失败！');
    }
  };
  
  onMounted(async () => {
    // 在组件挂载后可以进行一些初始化操作
    try {
      const response = await axios.get(`/api/user/findUserByID?id=${route.params.id}`);
      const fetchedUser = response.data; // Assuming the API response contains the user data
      // 将获取到的设备数据填充到 user 对象中
      Object.assign(user.value, fetchedUser);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  });
  </script>
  
  <style scoped>
.news-form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  margin-bottom: 8px;
}

input,
textarea,
select {
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  padding: 8px;
  margin-bottom: 16px;
  box-sizing: border-box;
}

img {
  max-width: 100%; /* Ensure the image doesn't exceed the container width */
  max-height: 400px; /* Set a maximum height for the image */
  margin-bottom: 16px;
}

button {
  margin-right: 50px;
  margin-top: 50px;
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
