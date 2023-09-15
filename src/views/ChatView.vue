<template>
  <!--<img alt="Vue logo" src="../assets/Slytherin.webp">-->
  <section class="chatContainer">
    <div class="chatBox">
      <Message text="Greetings, tell me your name" :question="true" />
    </div>
    <div class="chatBox">
      <Message text="Diego Perozo" :question="false" />
    </div>
    <ChatInput/>
  </section>
  <ul>
    <li v-for="(value, key) in scoresObject" :key="key">
      {{ key }}: {{ value }}
    </li>
  </ul>
  <button @click="addPoints">add points</button>
  <div v-if="winner">Winner: {{ winner }}</div>
  <button @click="getWinner">get winner</button>
  <ul>
    <li v-for="(value, index) of questionsObject" :key="index">
      {{ value.title }}
    </li>
  </ul>

  <button @click="addQuestion">add question</button>
  <button @click="getName">name</button>
  <span>{{ userName }}</span>
</template>

<script setup>
// @ is an alias to /src
import Message from '@/components/Message.vue'
import ChatInput from '@/components/ChatInput.vue'
import { ref, onMounted } from 'vue'
import store from '@/store'

const scoresObject = ref(store.getters.getScores)
const questionsObject = ref([])
const winner = ref('')

const addPoints = () => {
  const scores = {
    g: Math.floor(Math.random() * 10),
    h: Math.floor(Math.random() * 10),
    r: Math.floor(Math.random() * 10),
    s: Math.floor(Math.random() * 10)
  }
  store.commit('setScores', scores)
}

const getWinner = () => {
  winner.value = store.getters.getHighestScore
}

function * getIndex () {
  let index = 0

  while (true) {
    yield index++
  }
}

const generator = getIndex()

const addQuestion = () => {
  questionsObject.value.push(
    store.getters.getQuestionByIndex(generator.next().value)
  )
}

const getQuestionData = async () => {
  const url =
    'https://gist.githubusercontent.com/Xowap/b01fbce0c23971e23ab28427c09f92b3/raw/ad6399bd659679ff1f3209c2549a359d9cb744fd/sorting_hat.json'
  const res = await fetch(url)
  const json = await res.json()
  store.commit('storeQuestions', json)
}

const userName = ref('')
const getName = () => {
  userName.value = store.getters.getUserName
}

onMounted(async () => {
  await getQuestionData()
})

</script>
<style lang="scss" scoped>
@import "@/styles/main.scss";

.chatContainer {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-image: url("../assets/chat_pattern.png");
  background-size: auto;
  background-repeat: repeat;
  padding-top: 20px;
  .chatBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 90%;
    margin: 20px auto;
    @include media-sm {
      width: 70px;
    }
    @include media-md {
      width: 60%;
    }
    @include media-lg {
      width: 50%;
    }
    @include media-xl {
      width: 40%;
    }
  }
}
</style>
