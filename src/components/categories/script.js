export default {
  data () {
    return {
      cateList: [],
      total:0,
      pagenum:1
    }
  },
  created () {
    // 渲染商品列表
    this.getCategoriesList()
  },
  methods: {
    async getCategoriesList (pagenum=1) {
      const res = await this.$http.get('categories', {
        params:{
          type: 3,
          pagenum,
          pagesize: 5
        }
      })
      console.log(res)
      const{ result, total, pagenum: curPage } = res.data.data
      this.cateList = result
      this.total = total
      this.pagenum = curPage + 1
    },
    changePage (curPage) {
      this.getCategoriesList(curPage)
    }
  }
}
