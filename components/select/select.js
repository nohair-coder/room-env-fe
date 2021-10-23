// components/select/select.js
Component({
  properties: {
    nodeArray: {
      type: Array,
      value: []
    }
  },
  data: {
    nodeIndex: 0,
    startDate: '',
    startTime: '00:00',
    endDate: '',
    endTime: '',
    today: ''
  },
  methods: {
    bindNodeChange(e) {
      this.setData({
        nodeIndex: e.detail.value
      })
      this.triggerData()
    },
    bindStartDate(e) {
      console.log(e)
      this.setData({
        startDate: e.detail.value
      })
      this.triggerData()
    },
    bindStartTime(e) {
      console.log(e)
      this.setData({
        startTime: e.detail.value
      })
      this.triggerData()
    },
    bindEndDate(e) {
      console.log(e)
      this.setData({
        endDate: e.detail.value
      })
    },
    bindEndTime(e) {
      console.log(e)
      this.setData({
        endTime: e.detail.value
      })
      this.triggerData()
    },
    triggerData() {
      const params = {
        node: this.data.nodeArray[this.data.nodeIndex],
        startDate: this.data.startDate,
        startTime: this.data.startTime,
        endDate: this.data.endDate,
        endTime: this.data.endTime
      }
      this.triggerEvent("getDateRange", params)
    }
  },
  attached() {
    let now = new Date();
    var year = now.getFullYear(); //得到年份
    var month = now.getMonth() + 1;//得到月份
    var date = now.getDate();//得到日期
    var hour = now.getHours();//得到小时
    var minu = now.getMinutes();//得到分钟
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if (hour < 10) hour = "0" + hour;
    if (minu < 10) minu = "0" + minu;
    this.setData({
      endTime: hour + ':' + minu,
      startDate: year + '-' + month + '-' + date,
      endDate: year + '-' + month + '-' + date,
      today: year + '-' + month + '-' + date,
    })  
  },
  ready() {
    this.triggerData()
  },
  moved() {

  },
  detached() {

  },
});