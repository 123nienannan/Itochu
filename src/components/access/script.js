export default {
  name: "userVipList",
  data () {
    return {
      dateData: '',
      editInfo: false,
      adduser: false,
      listData: Array(10).fill({
          id:1,
          name:'nancy',
          age:6,
          mobile: 178584398,
          email: "78t457y8.cn",
      }),
      formInline: {
        user: ''
      }
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
}