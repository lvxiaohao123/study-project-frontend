<template>
    <Hender></Hender>
    <div class="order-confirmation">
      <h2>订单确认</h2>
  
      <!-- 用户信息 -->
      <div class="user-info">
        <h3>用户信息</h3>
        <p><strong>用户名:</strong> {{ user.username }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>地址:</strong> 
          <!-- 显示原有地址，并允许用户输入新地址 -->
          <el-input v-model="user.address" placeholder="请输入新地址"></el-input>
        </p>
      </div>
  
      <!-- 订单详情 -->
      <div class="order-details">
        <h3>订单详情</h3>
        <ul>
          <li>
            <span>{{ device.name }}</span>
            <span>价格: ¥{{ device.price }}</span>
          </li>
        </ul>
        <div class="product-image"><img :src="`../../${device.image_path}`" alt="Product Image"></div>
        <p style="color: red;"><strong >金额:</strong> ¥{{ device.price }}</p>
      </div>
  
      <!-- 确认按钮 -->
      <el-button @click="confirmOrder" type="primary" style="margin-top: 20px;">确认订单</el-button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { ElButton, ElInput } from 'element-plus';
  import { useRoute, useRouter } from 'vue-router';
  import { useStore } from '@/stores';
  
  const store = useStore();
  const device = ref({});
  const route = useRoute();
  const router = useRouter();
  const user = ref({
    id: store.auth.user.id,
    username: store.auth.user.username,
    email: store.auth.user.email,
    address: store.auth.user.address
  });
  
  const fetchDeviceDetails = async () => {
    try {
      const deviceId = route.params.id;
      const response = await axios.get(`/api/findDeviceByID?id=${deviceId}`);
      device.value = response.data;
    } catch (error) {
      console.error('Error fetching device details:', error);
    }
  };
  
  onMounted(() => {
    fetchDeviceDetails();
  });
  
  const confirmOrder = async () => {
    console.log(user.value.address)
    try {
      // 创建订单对象
      const order = {
        id: null,
        buyer_id: user.value,
        device_id: device.value.id,
        order_date: new Date(),
        status: '待确认',
        address: user.value.address // 使用用户输入的新地址
      };
  
      // 发送订单数据到后端
      const response = await axios.post('/api/getorder', order);
  
      // 处理后端响应，可能需要根据后端返回的数据进行其他操作
      console.log('Order confirmation response:', response.data);
  
      // 执行任何必要的操作以确认订单
      // 例如，在存储中更新订单状态
      store.commit('confirmOrder', order);
  
      // 也可以导航到“感谢”页面或执行其他操作
      // router.push('/thank-you');
    } catch (error) {
      console.error('Error confirming order:', error);
      // 处理错误，例如显示错误提示
      // this.$message.error('订单确认失败，请联系客服！');
    }
  };
  </script>
  
  <style scoped>
  .product-image img {
    height: 60%;
    width: auto;
    max-width: 60%;
    border-radius: 8px;
  }
  .order-confirmation {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .user-info,
  .order-details {
    margin-bottom: 20px;
  }
  
  .order-details ul {
    list-style-type: none;
    padding: 0;
  }
  
  .order-details li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  
  .order-details p {
    text-align: right;
    margin: 0;
  }
  
  .confirm-button {
    margin-top: 20px;
    width: 100%;
  }
  </style>
  