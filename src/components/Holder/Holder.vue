<template>
  <div class="holder">
    <h1 v-if="title !== undefined">{{ title }}</h1>
    <h2 v-if="subtitle !== undefined">{{ subtitle }}</h2>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'holder',
  props: ['title', 'subtitle']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #000000;
  font-weight: normal;
}
h2 {
  color: #3C3C3C;
  font-weight: normal;
}
.holder{
  margin-top: 10px;
  margin-bottom: 10px;
  width: 50%;
  margin: auto;
  background-color: #BDBDBD;
  -webkit-box-shadow: -2px 1px 7px 16px rgba(0,0,0,.1);
  -moz-box-shadow: -2px 1px 7px 16px rgba(0,0,0,.1);
  box-shadow: -2px 1px 7px 16px rgba(0,0,0,.1);
}
</style>
