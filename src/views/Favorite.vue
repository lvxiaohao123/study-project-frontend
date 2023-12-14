<template>
  <Header></Header>
  <HomeSide></HomeSide>
  <div class="order-container">
    <h2><el-icon><CollectionTag /></el-icon>收藏夹</h2>

    <!-- 当有收藏商品时渲染列表，否则显示 <el-empty> -->
    <ul v-if="Fproducts.length > 0" class="order-list">
      <li v-for="Fproduct in Fproducts" :key="Fproduct.device_id.id" class="order-item">
        <!-- 收藏商品的详细信息 -->
        <div class="order-image">
          <img :src="Fproduct.device_id.image_path" alt="Product Image">
        </div>
        <div v-if="Fproduct" class="order-details " @click="goToDeviceDetail(Fproduct.device_id.id)">
          <h3 style="cursor: pointer;">{{ Fproduct.device_id.name }}</h3>
          <p class="description">{{ Fproduct.device_id.description.slice(0, 25) }}{{ Fproduct.device_id.description.length > 30 ? '...' : '' }}</p>
          <p>¥: {{ Fproduct.device_id.price }}</p>
        </div>

        <!-- 删除按钮 -->
        <div>
          <button @click="deleteProduct(Fproduct)">删除</button>
        </div>
      </li>
    </ul>

    <!-- 没有收藏商品时显示 <el-empty> -->
    <el-empty v-else description="description" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { useStore } from '@/stores';
import router from "@/router";
import '../css/UserHome.css';

const store = useStore();
const Fproducts = ref([]);

const fetchFProductData = async () => {
  try {
    const response = await axios.get(`/api/favorite/findFavoriteByUID?user_id=${store.auth.user.id}`);
    Fproducts.value = response.data;
  } catch (error) {
    console.error('Error fetching Fproduct data:', error);
    ElMessage.error('Failed to fetch Fproduct data');
  }
};

const deleteProduct = async (Fproduct) => {
  try {
    // 获取 user 和 device，假设它们分别存储在 store.auth.user 和 Fproduct.device 中
    const user = store.auth.user;
    const device = Fproduct.device_id;

    // 构造要发送的数据对象
    const requestData = {
      user_id: user,
      device_id: device,
    };

    // 发送请求，将数据作为 JSON 放在请求体中
    const response = await axios.post('/api/favorite/deleteFavorite', requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    ElMessage.success('删除成功！');

    // 更新数据
    await fetchFProductData();
  } catch (error) {
    console.error('Error fetching Fproduct data:', error);
    ElMessage.error('删除失败！');
  }
};


onMounted(() => {
  fetchFProductData();
});


const goToDeviceDetail = (productId) => {
  router.push(`/device/${productId}`);
};
</script>


<style scoped>
</style>
