<template>
    <div>
        <!-- 顶部导航栏 -->
        <header>
            <!-- Logo -->
            <div class="logo">复健设备综合云平台</div>

            <!-- 搜索框 -->
            <div class="search-bar">
                <input type="text" placeholder="Search" />
                <button @click="search">搜索</button>
            </div>

            <!-- 导航选项 -->
            <nav>
                <router-link to="/">首页</router-link>
                <router-link to="/about">商城</router-link>
                <router-link to="/contact">论坛</router-link>
            </nav>

            <div class="avatar-container">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
                <a href="#">{{store.auth.user ? store.auth.user.username : ''}}</a>
             </div>

            <div>
                <el-button @click="logout()" type="danger" plain>退出登录</el-button>
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
const store = useStore()



const logout = () => {

        axios.get('/api/findAllDevice')
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
</style>
