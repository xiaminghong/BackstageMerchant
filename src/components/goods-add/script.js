export default {
  data () {
    return {
      stepActive: 0,
      tabActive: 'basic'
    }
  },
  methods: {
    changeTab (tab) {
      // console.log(tab.index)
      this.stepActive = tab.index - 0
    },
    nextStep (step, tabName) {
      this.stepActive = step
      this.tabActive = tabName
    }
  }

}
