<template>
  <section class="chatContainer">
    <div class="chatBox">
      <Message text="Greetings, tell me your name" :question="true" />
    </div>
    <div class="chatBox" v-for="(dialog, index) of dialogueState" :key="index">
      <Message :text="dialog.title" :question="questionChecker(dialog)" />
    </div>
    <div class="answerButtons">
      <button
        class="answerButtons_btn"
        v-for="(answer, index) of answerButtons"
        :key="answer.title.slice(1, 5)"
        :data-index="index"
        @click="sendAnswer(answer)"
      >
        {{ answer.title }}
      </button>
    </div>
    <router-link class="result" to="/result" v-if="finished">
      <button>Go to Result</button>
    </router-link>
    <ChatInput />
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
const answerButtons = ref(store.getters.getButtons)
const finished = ref(store.getters.getFinished)

const questionChecker = (obj) =>
  !!Object.prototype.hasOwnProperty.call(obj, 'answers')

// generates indexes infinitely
function * getIndex () {
  let index = 0
  while (true) {
    yield index++
  }
}

// generator instance
const generator = getIndex()
const addQuestion = async () => {
  const dialog = store.getters.getQuestionByIndex(generator.next().value)
  if (!dialog) {
    finished.value = true
    store.commit('finish')
    return router.push('/result')
  }
  store.commit('addDialog', dialog)
  answerButtons.value = dialog.answers
  const totalHeight = await document.documentElement.scrollHeight
  window.scrollTo({ top: totalHeight, behavior: 'smooth' })
}

const sendAnswer = async (answer) => {
  answerButtons.value = []
  await store.commit('addDialog', answer)
  await store.commit('setScores', answer.scores)
  addQuestion()
}

const getQuestionData = async () => {
  const url =
    'https://gist.githubusercontent.com/Xowap/b01fbce0c23971e23ab28427c09f92b3/raw/ad6399bd659679ff1f3209c2549a359d9cb744fd/sorting_hat.json'
  const res = await fetch(url)
  const json = await res.json()
  store.commit('storeQuestions', json)
}

watch(store.state.answers, () => {
  addQuestion()
})

onMounted(async () => {
  if (finished.value) {
    const totalHeight = await document.documentElement.scrollHeight
    window.scrollTo({ top: totalHeight })
  } else {
    await getQuestionData()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})
</script>
<style lang="scss" scoped>
@import "@/styles/main.scss";

.answerButtons_btn {
  animation: but-animation;
  animation-duration: 500ms;
}
@keyframes but-animation {
  from {
    top: -100px;
    opacity: 0;
  }
  to {
    top: 0px;
    opacity: 1;
  }
}

.chatContainer {
  width: 100%;
  min-height: 100vh;
  height: 100%;
  position: relative;
  background-image: url("../assets/chat_pattern.png"),
    linear-gradient(
      135deg,
      rgba(7, 143, 42, 0.3) 0%,
      rgba(255, 255, 255, 1) 50%,
      rgba(7, 143, 42, 0.30015756302521013) 100%
    );
  background-size: auto;
  background-repeat: repeat;
  background-attachment: fixed;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-top: 76px;
  -ms-overflow-style: none; /* ie, edge */
  scrollbar-width: none; /* firefox */
  &::-webkit-scrollbar {
    display: none; /* chrome */
  }
  .chatBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 90%;
    margin: 20px auto;
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
  }
  .answerButtons {
    display: flex;
    width: 90%;
    margin: 20px auto;
    flex-wrap: wrap;
    margin-bottom: 110px;
    justify-content: center;
    gap: 20px;
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
    &_btn {
      align-items: center;
      appearance: none;
      background-color: #fcfcfd;
      border-radius: 4px;
      border-width: 0;
      box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,
        rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
      box-sizing: border-box;
      color: #36395a;
      cursor: pointer;
      display: inline-flex;
      min-height: 48px;
      justify-content: center;
      line-height: 1;
      list-style: none;
      overflow: hidden;
      padding: 16px;
      position: relative;
      text-align: left;
      text-decoration: none;
      transition: box-shadow 0.15s, transform 0.15s;
      user-select: none;
      white-space: wrap;
      font-size: 18px;
      &:focus {
        box-shadow: #d6d6e7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px,
          rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
      }
      &:hover {
        box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px,
          rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
        transform: translateY(-2px);
      }
      &:active {
        box-shadow: #d6d6e7 0 3px 7px inset;
        transform: translateY(2px);
      }
    }
  }
  .result {
    position: fixed;
    bottom: 100px;
    left: 50%;
    right: 50%;
    transform: translateX(-50px);
    z-index: 10;
    outline: none;
    text-decoration: none;
    button {
      display: block;
      width: 100px;
      padding: 10px;
      border: none;
      color: #fff;
      background-color: $blue-hex;
      border-radius: 17px;
    }
  }
}
</style>
