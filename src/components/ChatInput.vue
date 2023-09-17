<template>
  <div class="chatInput">
    <div class="chatInput_container">
      <form @submit.prevent="sendInputText">
        <input type="text" placeholder="Message" v-model="input" v-focus/>
      </form>
    </div>
    <button @click="sendInputText">&#10148;</button>
  </div>
</template>
<script setup>
import store from '@/store'
import { ref } from 'vue'

const input = ref('')

const sendInputText = () => {
  if (store.getters.getUserName === '') {
    store.commit('setUserName', input.value)
    store.commit('addDialog', { title: input.value })
    store.commit('addAnswer', input.value)
  }
  input.value = ''
}

// enables v-focus in templates
const vFocus = {
  mounted: (el) => el.focus()
}

</script>
<style lang="scss" scoped>
@import "@/styles/main.scss";

.chatInput {
  display: flex;
  width: 100vw;
  height: 60px;
  position: fixed;
  bottom: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  &_container {
    display: flex;
    width: 90%;
    height: 100%;
    background-color: #fff;
    border-radius: 17px;
    border: 1px solid #ccc;
    justify-content: center;
    align-items: center;
    @include media-sm {
      width: 80%;
    }
    @include media-md {
      width: 70%;
    }
    @include media-lg {
      width: 60%;
    }
    @include media-xl {
      width: 50%;
    }
    @include media-xxl{
      width: 40%;
    }
    @include media-xxxl{
      width: 30%;
    }
    form {
      width: 100%;
      input {
        width: 90%;
        height: 60px;
        border: none;
        &:focus {
          outline: none;
        }
      }
    }
  }
  button {
    display: block;
    width: 60px;
    height: 60px;
    background-color: #fff;
    color: $gray-hex;
    border: 1px solid #ccc;
    font-size: 2em;
    border-radius: 45px;
    &:hover {
      background-color: $blue-hex;
      color: #fff;
    }
  }
}
</style>
