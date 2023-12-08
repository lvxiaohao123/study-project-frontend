<!-- Footer.vue -->

<template>
    <footer>
        <p>这是页脚内容</p>
        <!-- 可以添加其他页脚元素，比如版权信息等 -->
    </footer>
</template>

<script>
export default {
    name: "Footer",
    // 在这里可以添加页脚组件的逻辑和数据
};
</script>

<style scoped>
footer {
    /* 页脚样式 */
    background-color: #333;
    color: white;
    text-align: center;
    padding: 1rem;
    bottom: 0;
    width: 100%;
}
</style>
