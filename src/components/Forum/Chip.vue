<template>
  <holder :title="title" :subtitle="subtitle">
      <post v-for="post in posts" :title="post.title" :subtitle="post.subtitle" :postData="post.data"></post>
  </holder>
</template>
<script>
import Holder from '../Holder/Holder'
import Post from './Post'
export default{
  props: ['title', 'posts', 'subtitle'],
  components: {
    Post,
    Holder
  },
  name: 'chip'
}
</script>
<style>
  
</style>