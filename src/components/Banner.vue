<template>
    <div class="block text-center">
      <el-carousel height="350px">
        <!-- Use v-for to loop through an array of image URLs -->
        <el-carousel-item v-for="(item, index) in imageList" :key="index">
          <!-- Use the img tag to display the image -->
          <img :src="item" alt="Carousel Image" style="width: 100%; height:auto;">
        </el-carousel-item>
      </el-carousel>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // Array of image URLs
        imageList: [
          'src/img/wheelchair-749985_1920.jpg',
          'src/img/wheelchair-749985_1920.jpg',
          'src/img/wheelchair-749985_1920.jpg',
          // Add more image URLs as needed
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* Your styles here */
  </style>
  

<style scoped>
.demonstration {
    color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>
