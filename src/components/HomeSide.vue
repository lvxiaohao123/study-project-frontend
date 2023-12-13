<template>
  <div>
      <!-- 顶部导航栏 -->
      <header>
          <nav class="nav-links">
              <router-link to="/UserDevice"><el-icon><Goods /></el-icon>我的发布</router-link>
              <router-link to="/Favorite"><el-icon><CollectionTag /></el-icon>收藏夹</router-link>
              <router-link to="/MyOrder"><el-icon><List /></el-icon>我买到的</router-link>
              <router-link to="/SoldOrder"><el-icon><Coin /></el-icon>我卖出的</router-link>
          </nav>
      </header>

      <!-- 页面内容 -->
      <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import {ElMessage} from "element-plus";
import router from "@/router";
import {useStore} from "@/stores";
import { ref } from 'vue'
const input = ref('')
import {
Delete,
Edit,
Message,
Search,
Star,
} from '@element-plus/icons-vue'
import {
ArrowDown,
Check,
CircleCheck,
CirclePlus,
CirclePlusFilled,
Plus,
} from '@element-plus/icons-vue'




</script>

<style scoped>
/* 样式可以根据需要进行调整 */
header {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color:lightblue;
  color: white;
}

.nav-links {
  display: flex;
  justify-content: flex-end; 
  flex-grow: 1; /* 占据剩余空间 */
}

nav a {
  margin-left: 15px; /* 调整链接间距 */
  color: white;
  text-decoration: none;
}

.logo {
  font-size: 1.5rem;
}

nav {
  display: flex;
}

nav a {
  margin-right: 15px;
  color: white;
  text-decoration: none;
}

div a {
  text-decoration: none;
}

.search-bar {
  display: flex;
  align-items: center;
}

.search-bar input {
  padding: 5px;
  margin-right: 5px;
}

.search-bar button {
  padding: 5px;
}
.avatar-container {
  display: flex; /* 使用 Flex 布局 */
  align-items: center; /* 垂直居中 */
  gap: 20px; /* 间距大小，根据需要调整 */
}

.logout {
  color: brown;
}
</style>
