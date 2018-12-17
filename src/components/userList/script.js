export default {
  name: "userList",
  data () {
    return {
      companyVal: '',
      apartmentVal: '',
      uploadpicVal: '',
      searchText: '',
      company: [],
      apartment: [],
      pictures: [
        {
          picId: 1,
          label: '全部'
        },
        {
          picId: 2,
          label: '已上传'
        },
        {
          picId: 3,
          label: '未上传'
        }
      ],
      editInfo: false,
      listData: [],
      formInline: {
        user: ''
      }
    }
  },
  created () {
    this.getCompanyList()
    this.getAparmentList()
  },
  methods: {
    // async getUserList (curPage=1,companyVal='',apartmentVal='',uploadpicVal='',searchTxet='' ) {
    //   const params = {
    //     params: {
    //       companyVal: '',
    //       apartment: '',
    //       uploadpicVal: '',
    //       searchTxet: '',
    //     }
    //   }
    // },
    async getCompanyList () {
      const res = await this.$http.get('/itochuweb/getAllCompany')
      const {data} = res.data
      this.company = data
    },

    changeVal() {
      this.getAparmentList(this.companyVal);
    },

    async getAparmentList (id) {
      const res = await this.$http.get('/itochuweb/getAllDepartMent',{
        params: {
          companyId: id
        }
      })
      console.log(res);
      const {data} = res.data
      this.apartment = data
    },

    test(){
      console.log(this.companyVal)
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
}
