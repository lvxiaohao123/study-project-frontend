<template>
  <div>
    欢迎{{store.auth.user ? store.auth.user.username : ''}}进入到学习平台
  </div>
  <div>
      <el-button @click="logout()" type="danger" plain>退出登录</el-button>
      <a href="/about">about</a>
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