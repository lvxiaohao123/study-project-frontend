<template>
    <div style="width: 100vw;height: 100vh;overflow: hidden;display: flex">
        <div style="flex: 1">
            <el-image style="width: 100%;height: 100%" fit="cover"
                      src="src\img\wheelchair-749985_1920.jpg"/>
        </div>
        <div class="welcome-title">
            <div style="font-size: 60px;font-weight: bold">欢迎来到共享复健医疗设备综合云平台</div>
            <div style="margin-top: 20px">在这里购买、分享复健医疗设备，并且与其他正在康复的朋友交流。</div>
           
        </div> 
        <div style="width: 400px;background-color: rgb(255, 255, 255);z-index: 1">
            <router-view v-slot="{ Component }">
                <transition name="el-fade-in-linear" mode="out-in">
                    <component :is="Component" style="height: 100%"/>
                </transition>
            </router-view>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.welcome-title {
    position: absolute;
    bottom: 30px;
    left: 30px;
    color: white;
    text-shadow: 0 0 10px black;
}
</style>