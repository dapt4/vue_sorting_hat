<template>
  <div class="congratulations" :class="[assigned]">
    <div class="congratulations_message" v-if="isAssigned">
      <div class="congratulations_message--title">Congratulations!</div>
      You have been assigned the house
      <span class="congratulations_message--house" :class="[assigned]">
        {{ assigned }}
      </span>
    </div>
    <img v-if="isAssigned" :src="requireImage(assigned)" alt="no image" />
    <div v-if="isAssigned" class="userName">
      <span>{{ userName }}</span>
      <button class="userName_again" @click="doAgain">Do again &#8634;</button>
    </div>
    <router-link class="backBtn" to="/">
      <button class="xs" style="text-decoration: none;">&#8676;</button>
      <button>Back to Chat</button>
    </router-link>
  </div>
</template>
<script setup>
import store from '@/store'
import router from '@/router'
import { ref, onMounted } from 'vue'
const isAssigned = ref(false)
const assigned = ref('')

const requireImage = (name) =>
  require(`@/assets/${name}.webp`) || require('@/assets/default.png')
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

const doAgain = async () => {
  await router.push('/')
  location.reload()
}

onMounted(() => {
  getWinner()
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>
<style lang="scss" scoped>
@import "@/styles/main.scss";

.congratulations {
  display: block;
  margin-top: 76px;
  width: 100%;
  height: calc(100vh - 76px);
  background-image: url("../assets/default.png");
  padding-top: 40px;
  font-family: "Libre Baskerville", serif;
  &.Gryffindor {
    background-image: url("../assets/bg.jpg");
  }
  &.Hufflepuff {
    background-image: url("../assets/bh.jpg");
  }
  &.Ravenclaw {
    background-image: url("../assets/br.jpg");
  }
  &.Slytherin {
    background-image: url("../assets/bs.jpg");
  }
  background-size: cover;
  background-position: center center;
  @include media-md{
    height: 100vh;
  }
  &_message {
    display: block;
    width: 90%;
    color: $brown-hex;
    font-size: 2em;
    background-color: gold;
    background-image: linear-gradient(
      to right,
      #462523 0,
      #cb9b51 22%,
      #f6e27a 45%,
      #f6f2c0 50%,
      #f6e27a 55%,
      #cb9b51 78%,
      #462523 100%
    );
    border-radius: 17px;
    margin: 0px auto;
    margin-bottom: 50px;
    border: 7px solid $brown-hex;
    padding: 10px;
    @include media-sm {
      font-size: 2em;
    }
    @include media-md {
      font-size: 2.5em;
      width: 60%;
    }
    @include media-lg{
      width: 50%;
    }
    @include media-xxl{
      width: 40%;
    }
    @include media-xxxl{
      width: 30%;
    }
    &--title{
      @include media-md {
        font-size: 1.1em;
      }
    }
    &--house {
      display: block;
      width: fit-content;
      font-size: 1.5em;
      font-weight: bold;
      margin: 0px auto;
      &.Gryffindor {
        color: $brown-hex;
      }
      &.Hufflepuff {
        color: $yellow-hex;
      }
      &.Ravenclaw {
        color: $blue-hex;
      }
      &.Slytherin {
        color: $green-hex;
      }
    }
  }

  div.userName {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    span {
      display: block;
      width: fit-content;
      margin: 20px auto;
      color: #fff;
      font-size: 2em;
      @include media-sm {
        font-size: 2.5em;
      }
      @include media-md {
        font-size: 3em;
      }
    }
    button.userName_again {
      color: #fff;
      border: none;
      background-color: $blue-hex;
      border-radius: 17px;
      padding: 10px;
      font-size: 1.3em;
    }
  }
  .backBtn {
    position: fixed;
    top: 20px;
    left: 15px;
    z-index: 10;
    text-decoration: none;
    outline: none;
    button {
      display: none;
      color: #fff;
      border: none;
      background-color: $blue-hex;
      border-radius: 17px;
      padding: 10px;
      &.xs {
        display: block;
        @include media-sm {
          display: none;
        }
      }
      @include media-sm {
        display: block;
      }
    }
  }
}
input {
  width: 20px;
  position: fixed;
  top: 30px;
  left: 130px;
  z-index: 12;
}
</style>
