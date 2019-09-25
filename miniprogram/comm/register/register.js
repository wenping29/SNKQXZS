Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    countries: ["中国", "美国", "英国"],
    countryIndex: 0,
    name:'',
    contry:'',
    userCode:'',
    password:'',
    likething:''
  },
  /**
   * 组件的方法列表
   */
  methods: {
    register(){
      this.triggerEvent('registerPageHandler', this.data, {})
    },
    back(){
      this.triggerEvent('back', this.data, {})
    },
    likethingbindinputchange(e){
      this.setData({ likething:e.detail.value})
    },
    passwordbindinputchange(e) {
      this.setData({ password: e.detail.value })
    },
    userCodebindinputchange(e) {
      this.setData({ userCode: e.detail.value })
    },
    bindCountryChange(e) {
      this.setData({ countryIndex: e.detail.value })
    },
    namebindinputchange(e) {
      this.setData({ name: e.detail.value })
    }
  }
})
