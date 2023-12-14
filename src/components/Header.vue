<template>
    <div>
        <!-- 顶部导航栏 -->
        <header>
            <!-- Logo -->
            <div class="logo">复健设备综合云平台</div>

            <!-- 搜索框 -->
            <div class="search-bar">
                <el-input v-model="input" placeholder="搜索资讯" />
                <el-button type="primary" @click="searchNews"><el-icon><Search /></el-icon>搜索</el-button>
            </div>

            <!-- 导航选项 -->
            <nav>
                <router-link to="/">首页</router-link>
                <router-link to="/Shop">商城</router-link>
                <router-link to="/Forum">论坛</router-link>
                <router-link to="/AEDmap">AED设备</router-link>
            </nav>

            <div class="avatar-container">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
                <a href="#">{{store.auth.user ? store.auth.user.username : ''}}</a>
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                    用户中心<el-icon class="el-icon--right"><arrow-down /></el-icon>
                    </span>
                    <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="toAbout()"><el-icon><House /></el-icon>个人中心</el-dropdown-item>
                        <el-dropdown-item @click="toUpload()"><el-icon><Plus /></el-icon>发布商品</el-dropdown-item>
                        <el-dropdown-item @click="logout()" type="danger" plain class="logout"><el-icon><SwitchButton /></el-icon>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                    </template>
                </el-dropdown>
             </div>
        </header>

        <!-- 页面内容 -->
        <router-view></router-view>
    </div>
</template>

<script setup>
import axios from 'axios';
import {get} from "@/net";
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

const store = useStore()

function toAbout(){
    router.push('/about');
}

function toUpload(){
    router.push('/upload-device');
}


const logout = () => {

        axios.get('/api/user/logout')
            .then((response) => {
                console.log(response);
                if (response.data) {
                    // 成功
                    ElMessage.success('退出登录成功！');
                    store.auth.user = null;
                    router.push('/');
                } else {
                    // 失败
                    ElMessage.error('in登录失败');
                }
            })
            .catch((error) => {
                ElMessage.error('登录失败：' + error);
                store.auth.user = null;
            });
    
};

const searchNews = async () => {
    try {
        // 获取输入的搜索字符串
        const searchStr = input.value;

        // 跳转到搜索结果页面，携带搜索字符串参数
        router.push({
            name: 'SearchView', // 替换为你的搜索结果页面的路由名称
            params: {
                searchStr: searchStr,
            },
        });
    } catch (error) {
        console.error('搜索失败：', error);
    }
};



</script>

<style scoped>
/* 样式可以根据需要进行调整 */
header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color:lightblue;
    color: white;
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
