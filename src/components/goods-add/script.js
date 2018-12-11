import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {
  quillEditor
} from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      stepActive: 0,
      tabActive: 'basic',
      // 标签页
      goodsAddForm: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: [],
        pics: [],
        is_promote: false,
        goods_introduce: ''
      },
      // 3级联动数据
      cateList: [],
      // 请求头添加token
      uploadHeaders: {
        Authorization: localStorage.getItem('token')
      }
    }
  },
  created () {
    this.getCatList()
  },
  methods: {
    // 切换tab页
    changeTab (tab) {
      // console.log(tab.index)
      this.stepActive = tab.index - 0
    },
    // 分页
    nextStep (step, tabName) {
      this.stepActive = step
      this.tabActive = tabName
    },
    // 获取分类列表数据
    async getCatList () {
      const res = await this.$http.get('/categories', {
        params: {
          type: 3
        }
      })
      this.cateList = res.data.data
      // console.log(res.data.data)
    },
    // 上传文件 临时地址添加
    uploadSuccess (response, file, fileList) {
      console.log(response.data.tmp_path)
      this.goodsAddForm.pics.push({
        pic: response.data.tmp_path
      })
    },
    // 点击添加商品列表
    async addGoods () {
      /* eslint-disable camelcase */
      const {
        goods_name,
        goods_cat,
        goods_price,
        goods_number,
        goods_weight,
        is_promote,
        goods_introduce,
        pics
      } = this.goodsAddForm
      const res = await this.$http.post('goods', {
        goods_name,
        goods_cat: goods_cat.join(','),
        goods_price,
        goods_number,
        goods_weight,
        is_promote,
        goods_introduce,
        pics
      })
      // console.log(res)
      // 跳转到商品列表页面
      this.$router.push('/goods')
      // 提示添加成功
      this.$message({
        type: 'success',
        message: res.data.meta.msg
      })
    }
  }
}
