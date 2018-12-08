export default {
  data () {
    return {
      rolesList: []
    }
  },
  created () {
    this.getRolesList()
  },
  methods: {
    async getRolesList () {
      const res = await this.$http.get('/roles')
      console.log(res)
      this.rolesList = res.data.data
    }
  }
}
