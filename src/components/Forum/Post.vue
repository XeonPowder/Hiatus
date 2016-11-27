<template>
  <holder :title="title" :subtitle="subtitle">
    <div v-html="postData"></div>
  </holder>
</template>
<script>
import Holder from '../Holder/Holder'
export default{
  props: ['title', 'postData', 'subtitle'],
  components: {
    Holder
  },
  name: 'post'
}
</script>
<style>
  
</style>