<template>
  <div>
      欢迎{{store.auth.user.username}}进入到学习平台
  </div>
  <div>
      <el-button @click="logout()" type="danger" plain>退出登录</el-button>
  </div>
</template>

<script setup>
import axios from 'axios';
import {get} from "@/net";
import {ElMessage} from "element-plus";
import router from "@/router";
import {useStore} from "@/stores";

const store = useStore()

// const logout = () => {
//     get('http://localhost:8080/api/auth/logout')
//         .then((response) => {
//             console.log(response.data);  // 确认能够正确获取到后端返回的信息
//             ElMessage.success(response.data);
//             store.auth.user = null;
//             router.push('/');
//         })
//         .catch((error) => {
//             ElMessage.error(`退出登录失败: ${error}`);
//         });
// };
// 假设你有一个封装了异步请求的 get 函数
// async function logout() {
//   try {
//     const response = await axios.get('http://localhost:8080/api/auth/logout');
//     console.log(response.data);  // 处理异步操作的结果
//     ElMessage.success(response.data);
//     store.auth.user = null;
//     router.push('/');
//   } catch (error) {
//     console.error(`退出登录失败: ${error}`);
//     ElMessage.error(`退出登录失败: ${error}`);
//   }
// }
const logout = () => {

        axios.get('http://localhost:8080/api/auth/logout')
            .then((response) => {
                console.log(response);
                if (response.data) {
                    // 登录成功
                    // store.auth.user = null;
                    ElMessage.success('退出登录成功！');
                    store.auth.user = null;
                    router.push('/');
                    // ElMessage.success('in登录成功');
                    
                    // 存储用户信息
                    // store.auth.user = response.data;
                } else {
                    // 登录失败
                    ElMessage.error('in登录失败');
                    // store.auth.user = null;
                }
            })
            .catch((error) => {
                ElMessage.error('登录失败：' + error);
                store.auth.user = null;
            });
    
};

// 在你的 Vue 组件或其他地方调用该函数

</script>
<!--  <template>
  <div class="common-layout">
    <el-container>
      <el-header>
        
        
        Header
        <div>
      欢迎{{store.auth.user.username}}进入到学习平台
  </div>
  <div>
      <el-button @click="logout()" type="danger" plain>退出登录</el-button>
  </div>
      
      </el-header>
      <el-container>
        <el-aside width="200px">
          
          Aside
          <template>
  <el-row class="tac">

    <el-col :span="12">
      <h5 class="mb-2">Custom colors</h5>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

        
        </el-aside>
        <el-main>
          
          Main
        
        
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import {get} from "@/net";
import {ElMessage} from "element-plus";
import router from "@/router";
import {useStore} from "@/stores";

const store = useStore()

const logout = () => {
    get('/api/auth/logout', (message) => {
        ElMessage.success(message)
        store.auth.user = null
        router.push('/')
    })
}
</script> -->