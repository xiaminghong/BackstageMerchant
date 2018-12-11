<template>
   <div>
     <h1>人在旅途，难免迷路，好在有你！！</h1>
      <p>您将在{{times}}秒后，回到首页</p>
   </div>
</template>

<script>
export default {
  data () {
    return {
      times: 5,
      timerId: null
    }
  },
  created () {
    this.timerId = setInterval(() => {
      if (this.times <= 1) {
        clearInterval(this.timerId)
        this.$router.push('/home')
        return
      }
      this.times--
    }, 1000)
  }

}
</script>

<style>

</style>
