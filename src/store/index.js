import { createStore } from 'vuex'

export default createStore({
  state: {
    userName: '',
    questions: [
      {
        title: 'Dawn or dusk?',
        answers: [
          {
            title: 'Dawn',
            scores: {
              g: 100,
              r: 100,
              h: 0,
              s: 0
            }
          },
          {
            title: 'Dusk',
            scores: {
              g: 0,
              r: 0,
              h: 100,
              s: 100
            }
          }
        ]
      },
      {
        title: 'Forest or river?',
        answers: [
          {
            title: 'Forest',
            scores: {
              g: 100,
              r: 100,
              h: 0,
              s: 0
            }
          },
          {
            title: 'River',
            scores: {
              g: 0,
              r: 0,
              h: 100,
              s: 100
            }
          }
        ]
      }
    ],
    scores: {
      g: 0,
      h: 0,
      r: 0,
      s: 0
    }
  },
  getters: {
    getUserName (state) {
      return state.userName
    },
    getQuestionByIndex (state) {
      return (index) => state.questions[index]
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
