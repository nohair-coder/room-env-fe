import baseURL from '../../utils/request';

Page({
  data: {
    voltage_array: []
  },
    /**po
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const that = this
    wx.request({
      url: baseURL + 'getVoltage/',
      success(res) {
        console.log(res);
        that.setData({
          voltage_array: res.data.nowVoltage
        })
      }
    })
  },
  onRefresh() {
    //在当前页面显示导航条加载动画
    wx.showNavigationBarLoading();
    //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
    wx.showLoading({
      title: '数据刷新...',
    })
    this.getData();
  },
  //网络请求，获取数据
  getData() {
    const that = this
    wx.request({
      url: baseURL + 'getVoltage/',
      success(res) {
        console.log(res.data.nowVoltage);
        that.setData({
          voltage_array: res.data.nowVoltage
        })
        wx.hideLoading();
        //隐藏导航条加载动画
        wx.hideNavigationBarLoading();
        //停止下拉刷新
        wx.stopPullDownRefresh();
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.onRefresh();
  },
})
