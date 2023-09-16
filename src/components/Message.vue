<template>
  <div class="messageBox" :class="[props.question ? '' : 'answer']">
    <div class="messageBox_content" :class="[props.question ? 'question' : '']">
      <span class="messageBox_content--message">{{ props.text }}</span>
      <span class="messageBox_content--time">{{ time }}</span>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps, onMounted } from 'vue'

const props = defineProps({
  text: String,
  question: Boolean
})

const time = ref('')

const getTime = () => {
  const date = new Date()
  time.value = `${date.getHours()}:${date.getMinutes()}`
}

onMounted(() => getTime())
</script>
<style lang="scss" scoped>
@import "@/styles/main.scss";

.messageBox {
  align-self: flex-start;
  &.answer {
    align-self: flex-end;
  }
  &_content {
    display: block;
    position: relative;
    width: fit-content;
    padding: 15px 12px;
    border-radius: 17px;
    box-shadow: 1px 1px 1px gray;
    background-color: $ligth-blue-hex;
    text-align: left;
    &.question {
      background-color: $ligth-green-hex;
    }
    &--message {
      width: fit-content;
      max-width: 50%;
      padding: 15px;
    }
    &--time {
      position: absolute;
      font-size: 0.75em;
      bottom: 3px;
      right: 7px;
      color: $gray-hex;
    }
  }
}
</style>
