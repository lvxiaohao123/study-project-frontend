<template>
  <div class="device-form-container">
    <button @click="goBack">返回</button>
    <h1>编辑设备</h1>
    <form @submit.prevent="submitDevice">
      <label for="name">设备名称:</label>
      <input type="text" id="name" v-model="device.name" required>

      <label for="description">设备描述:</label>
      <textarea id="description" v-model="device.description" required></textarea>

      <label for="price">设备价格:</label>
      <input type="number" id="price" v-model="device.price" required>

      <label for="location">设备位置:</label>
      <input type="text" id="location" v-model="device.location" required>

      <label for="available">设备可用性:</label>
      <select id="available" v-model="device.available" required>
        <option value="1">可用</option>
        <option value="0">不可用</option>
      </select>

      <label for="image">设备图片:</label>
      <input type="file" id="image" accept="image/*" @change="handleImageUpload" required>

      <button type="submit">提交编辑</button>
    </form>
    

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import router from "@/router";

const file = ref(null);
const route = useRoute();
const device = ref({
  name: '',
  description: '',
  price: null,
  location: '',
  available: 1,
  create_date: new Date(),
  id: route.params.id
});

const goBack = () => {
  router.push('/UserDevice');
};

const handleImageUpload = (event) => {
  file.value = event.target.files[0];
};

const submitDevice = async () => {
  try {
    const formData = new FormData();
    formData.append('file', file.value);
    formData.append('name', device.value.name);
    formData.append('description', device.value.description);
    formData.append('price', device.value.price);
    formData.append('location', device.value.location);
    formData.append('available', device.value.available);
    formData.append('id', device.value.id);

    // 发送设备数据和图片文件到后端
    await axios.post(`/api/device/updateDevice`, formData);

    // 提示用户发布成功
    alert('设备更新成功！');
    router.push("/UserDevice");
  } catch (error) {
    console.error('Error publishing device:', error);
    alert('设备编辑失败！');
  }
};

onMounted(async () => {
  // 在组件挂载后可以进行一些初始化操作
  try {
    const response = await axios.get(`/api/device/findDeviceByID?id=${route.params.id}`);
    const fetchedDevice = response.data; // Assuming the API response contains the device data
    // 将获取到的设备数据填充到 device 对象中
    Object.assign(device.value, fetchedDevice);
  } catch (error) {
    console.error('Error fetching device data:', error);
  }
});
</script>

<style scoped>
.device-form-container {
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

button {
  margin-right: 50px;
  margin-top: 10px;
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
