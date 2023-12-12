<template>
  <Header></Header>
  <HomeSide></HomeSide>
  <div class="product-container">
    <h2>收藏夹</h2>
    <ul class="product-list">
      <li v-for="Fproduct in Fproducts" :key="Fproduct.device_id.id" class="product-item">
        <div class="product-image">
          <img :src="Fproduct.device_id.image_path" alt="Product Image">
        </div>
        <div v-if="Fproduct" class="product-details " @click="goToDeviceDetail(Fproduct.device_id.id)">
          <h3 style="cursor: pointer;">{{ Fproduct.device_id.name }}</h3>
          <p class="description">{{ Fproduct.device_id.description.slice(0, 25) }}{{ Fproduct.device_id.description.length > 30 ? '...' : '' }}</p>
          <p>¥: {{ Fproduct.device_id.price }}</p>
        </div>
        <div>
          <button @click="deleteProduct(Fproduct)">删除</button>
          </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { useStore } from '@/stores';
import router from "@/router";

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
    const response = await axios.post(`/api/favorite/deleteFavoriteByID?id=${Fproduct.id}`);
    ElMessage.success('删除成功！');
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
.product-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: grey;
  max-height: 700px;
}

.product-list {
  list-style: none;
  padding: 0;
  margin: 0;
  /* cursor: pointer; */
  max-height: 600px;
  overflow-y: auto; /* 添加垂直滚动条 */
}

.product-list img {
  max-width: 100%;
  height: 100px;
}

.product-list li {
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 0; /* 列表圆角 */
  background-color: #fff;
  width: auto;
  display: flex;
  justify-content: space-between;
}

.product-list li:hover {
  background-color: #f0f0f0;
}

button {
  background-color: firebrick; /* 设置按钮背景色为蓝色 */
  color: #fff; /* 设置按钮文本颜色为白色 */
  padding: 8px 16px; /* 添加内边距 */
  margin: 10px;
  border: none; /* 移除边框 */
  cursor: pointer;
  height: 40px;
  border-radius: 4px; /* 圆角按钮 */
  background-color: firebrick;
}

button:hover {
  background-color: darkred; /* 悬浮时改变背景颜色 */
}
</style>
