<template>
  <div v-if="isAssigned" class="congratulations">
    <h1>
      Congratulations! You have been assigned the house
      <span :class="[assigned]">
        {{ assigned }}
      </span>
    </h1>
    <img :src="requireImage(assigned)" alt="no image">
    <div class="userName">
      <span>{{userName}}</span>
    </div>
  </div>
</template>
<script setup>
import store from '@/store'
import { ref, onMounted } from 'vue'
const isAssigned = ref(false)
const assigned = ref('')

const requireImage = name => require(`@/assets/${name}.webp`)
const userName = ref(store.getters.getUserName)

const relations = {
  g: 'Gryffindor',
  h: 'Hufflepuff',
  r: 'Ravenclaw',
  s: 'Slytherin'
}

const getWinner = () => {
  const winner = store.getters.getHighestScore
  isAssigned.value = true
  assigned.value = relations[winner]
}

onMounted(() => {
  getWinner()
})

</script>
<style lang="scss" scoped>
@import "@/styles/main.scss";

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
div.userName{
  display: flex;
  justify-content: center;
  align-items: center;
  span{
    font-size: 1em;
  }
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
