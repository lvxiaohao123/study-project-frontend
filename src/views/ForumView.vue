<!-- ForumView.vue -->
<template>
  <div>
    <Header></Header>
    <PostList></PostList>
    <router-view></router-view>
  </div>
</template>

<script>
import PostList from '@/components/PostList.vue';

export default {
  components: {
    PostList,
  },
};
</script>
