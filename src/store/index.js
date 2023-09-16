import { createStore } from 'vuex'

export default createStore({
  state: {
    userName: '',
    questions: [],
    scores: {
      g: 0,
      h: 0,
      r: 0,
      s: 0
    },
    dialogs: [],
    answers: []
  },
  getters: {
    getDialogs (state) {
      return state.dialogs
    },
    getUserName (state) {
      return state.userName
    },
    getQuestions (state) {
      return state.questions
    },
    getQuestionByIndex (state) {
      return (index) => {
        if (state.questions.length - 1 !== index) {
          return state.questions[index]
        } else {
          return null
        }
      }
    },
    getScores (state) {
      return state.scores
    },
    getHighestScore (state) {
      const max = Math.max(...Object.values(state.scores))
      for (const key in state.scores) {
        if (state.scores[key] === max) {
          return key
        }
      }
    }
  },
  mutations: {
    addAnswer (state, answer) {
      state.answers.push(answer)
    },
    addDialog (state, dialog) {
      state.dialogs.push(dialog)
    },
    setUserName (state, name) {
      state.userName = name
    },
    storeQuestions (state, questions) {
      state.questions = questions
    },
    setScores (state, scores) {
      for (const key in scores) {
        state.scores[key] += scores[key]
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
