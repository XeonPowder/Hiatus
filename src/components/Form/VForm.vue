<template>
<div class="v_form">
  <transition name="fade" mode="out-in">
    <div key="notsubmitted" v-if="!submitted">
      <div v-for="item in inputs">
        <p>{{item.title}}</p>
        <input :type="item.input.type" :name="item.input.name">
      </div>
      <p>Comments:</p>
      <textarea></textarea><br>
      <button @click="submitForm" class="v_form_submit">Submit</button>
    </div>
    <div key="submitted" v-else-if="submitted">
      <h2 id="submitted">Form Submitted</h2>
      <button @click="submitted = false" class="v_form_submit" >Submit Another?</button>
    </div>
  </transition>
</div>
</template>
<script>
export default{
  data () {
    return {
      submitted: false,
      inputs: [
        {title: 'Name', input: {type: 'text', name: 'Name'}},
        {title: 'Class', input: {type: 'text', name: 'Class'}},
        {title: 'iLvL', input: {type: 'number', name: 'ItemLevel'}},
        {title: 'Spec', input: {type: 'text', name: 'Spec'}},
        {title: 'Off-Spec', input: {type: 'text', name: 'OffSpec'}}
      ]
    }
  },
  name: 'v-form',
  methods: {
    submitForm () {
      this.submitted = true
    }
  }
}
</script>
<style>
.v_form {
  padding-bottom: 5px;
}
input {
  font-size: large;
  font-family: 'Farsan';
  background-color: #E6E6E6;
}
input[type=number] {
  width: 10% !important;
}
input[type=text], input[type=number] {
  border: none;
  width: 50%;
  padding: 5px 5px;
  margin: 8px 0;
  box-sizing: border-box;
  border-bottom: 1px solid #ff8000;
}
input[type=text]:focus, input[type=number]:focus {
  outline: none;
  border-bottom: 2px solid #ff8000;
}
textarea {
  width: 50%;
  height: 99px;
  margin: 12px 20px;
  border: none;
  border-bottom: 2px solid #ff8000;
  resize: none;
  font-family: 'Farsan';
  font-size: large;
  background-color: #E6E6E6;
}
textarea:focus {
  outline: none;
}
.v_form_submit {
  background-color: #ff9000;
  border: none;
  color: black;
  padding: 16px 32px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
  font-family: 'Farsan';
  font-size: large;
}
.v_form_submit:focus {
  outline: 1px solid #000000;
}
.v_form_submit:active {
  outline: 1px solid #0f0f0f;
}
#submitted {
  color: #3CB600;
}
</style>