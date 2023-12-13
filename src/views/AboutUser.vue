<template>
  <Header></Header>
  <HomeSide></HomeSide>
  <RouterView></RouterView>
</template>

<script setup>
import { onMounted } from 'vue';
import router from "@/router";
onMounted(() => {
    router.push('/UserDevice');
});
</script>

<style>

</style>