import axios from 'axios'

export default {
  data () {
    return {
      usersList: [],
      total: 0,
      pageSize: 3,
      pagenum: 1,
      searchText: ''
    }
  },
  created () {
    this.getUsersList()
  },
  methods: {
    getUsersList (pagenum = 1, query = '') {
      axios.get('http://localhost:8888/api/private/v1/users', {
        params: {
          query,
          pagenum,
          pagesize: 3
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.usersList = res.data.data.users
          this.total = res.data.data.total
          this.pagenum = res.data.data.pagenum
        } else {
          localStorage.removeItem('token')
          this.$router.push('/login')
        }
      })
    },
    changePage (curPage) {
      // console.log(curPage)
      console.log(this.searchText)
      this.getUsersList(curPage, this.searchText)
    },
    search () {
      console.log(this.searchText)
      this.getUsersList(1, this.searchText)
    }
  }
}
