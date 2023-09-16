<template>
  <!--<img alt="Vue logo" src="../assets/Slytherin.webp">-->
  <section class="chatContainer">
    <div class="chatBox">
      <Message text="Greetings, tell me your name" :question="true" />
    </div>
    <div class="chatBox" v-for="(dialog, index) of dialogueState" :key="index">
      <Message :text="dialog.title" :question="questionChecker(dialog)" />
    </div>
    <div class="answerButtons" v-if="answerButtons.length > 0">
      <button v-for="(answer, index) of answerButtons" :key="index" @click="sendAnswer(answer)">{{answer.title}}</button>
    </div>
    <ChatInput/>
  </section>
</template>

<script setup>
// @ is an alias to /src
import Message from '@/components/Message.vue'
import ChatInput from '@/components/ChatInput.vue'
import { ref, onMounted, watch } from 'vue'
import store from '@/store'
import router from '@/router'

const dialogueState = ref(store.getters.getDialogs)
const dialogsArray = ref([])
const answerButtons = ref([])

const questionChecker = (obj) => !!Object.prototype.hasOwnProperty.call(obj, 'answers')

function * getIndex () {
  let index = 0
  while (true) {
    yield index++
  }
}

const generator = getIndex()

const addQuestion = () => {
  const dialog = store.getters.getQuestionByIndex(generator.next().value)
  if (!dialog) return router.push('/result')
  store.commit('addDialog', dialog)
  dialogsArray.value.push(dialog)
  answerButtons.value = dialog.answers
}

const sendAnswer = (answer) => {
  answerButtons.value = []
  store.commit('addDialog', answer)
  store.commit('setScores', answer.scores)
  addQuestion()
}

const getQuestionData = async () => {
  const url =
    'https://gist.githubusercontent.com/Xowap/b01fbce0c23971e23ab28427c09f92b3/raw/ad6399bd659679ff1f3209c2549a359d9cb744fd/sorting_hat.json'
  const res = await fetch(url)
  const json = await res.json()
  store.commit('storeQuestions', json)
  console.log({ getQuestions: store.getters.getQuestions })
}

watch(store.state.answers, () => {
  addQuestion()
})

onMounted(async () => {
  await getQuestionData()
})

</script>
<style lang="scss" scoped>
@import "@/styles/main.scss";

.chatContainer {
  width: 100vw;
  min-height: 100vh;
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
  .answerButtons{
    margin-bottom: 110px;
  }
}
</style>
