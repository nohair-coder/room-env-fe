// pages/charts/charts.js
import baseURL from '../../utils/request'

Page({
    data: {
        nodeArray: [],
        dateTimeArray: [],
        carbonArray: [],
        humidityArray: [],
        lightArray: [],
        temperatureArray: [],
        windArray: [],
        cur: false
    },
    onLoad() {
        const that = this
        wx.request({
            url: baseURL + 'getNodes/',
            success: res => {
                that.setData({
                    nodeArray: res.data.allNodes
                })
            }
        })
    },
    onShow() {
    },
    handleDateRange(e) {
        const that = this
        wx.request({
            url: baseURL + 'getRangeData/',
            data: e.detail,
            header: { 'content-type': 'application/json' },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: res => {
                const data = res.data
                console.log(data);
                that.setData({
                    // ...data,
                    windArray: data.windArray,
                    carbonArray: data.carbonArray,
                    lightArray: data.lightArray,
                    humidityArray: data.humidityArray,
                    temperatureArray: data.temperatureArray,
                    dateTimeArray: data.dateTimeArray,
                    cur: data.cur
                })
            },
            fail: () => { },
            complete: () => { }
        })
    }
});
