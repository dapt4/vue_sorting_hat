<template>
  <div v-if="isAssigned" class="congratulations">
    <h1>
      Congratulations! You have been assigned the house
      <span :class="[assigned]">
        {{ assigned }}
      </span>
    </h1>
    <img :src="shield" alt="no image" />
  </div>
</template>
<script setup>
import store from '@/store'
import { ref } from 'vue'
const isAssigned = ref(false)
const assigned = ref('')
const shield = ref('')

const getWinner = () => {
  const winner = store.getters.getHighestScore
  isAssigned.value = true
  if (winner === 'g') {
    assigned.value = 'Gryffindor'
    shield.value = '../assets/logo.png'
  } else if (winner === 'h') {
    assigned.value = 'Hufflepuff'
    shield.value = '../assets/hufflepuff.webp'
  } else if (winner === 'r') {
    assigned.value = 'Ravenclaw'
    shield.value = '../assets/ravenclaw.webp'
  } else if (winner === 's') {
    assigned.value = 'Slytherin'
    shield.value = '../assets/slytherin.webp'
  }
}
getWinner()
</script>
<style lang="scss" scoped>
@import "@/styles/colors.scss";

.congratulations {
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}
span {
  font-size: 2em;
  font-weight: bold;
}
.Gryffindor {
  color: $brown-hex;
}
.Hufflepuff {
  color: $yellow-hex;
}
.Ravenclaw {
  color: $blue-hex;
}
.Slytherin {
  color: $green-hex;
}
</style>
