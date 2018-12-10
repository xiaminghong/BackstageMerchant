export default {
  data () {
    return {
      // html的：data数据
      goodsList: [],
      pagenum: 1,
      pagesize: 5,
      total: 0
    }
  },
  created () {
    // 进页面异步钩子调用渲染
    this.getGoodsList()
  },
  methods: {
    // axios请求渲染商品列表
    async getGoodsList (pagenum = 1) {
      const res = await this.$http.get('/goods', {
        params: {
          query: '',
          pagenum,
          pagesize: this.pagesize
        }
      })
      // console.log(res.data.data)
      // this.goodsList = res.data.data
      // 提取数据
      const {pagenum: pagenums, goods, total} = res.data.data
      // 赋值
      this.total = total
      this.goodsList = goods
      this.pagenum = pagenums
    },
    // 分页
    changePage (curPage) {
      console.log(curPage)
      console.log(11)

      this.getGoodsList(curPage)
    }
  }
}
