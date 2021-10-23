// components/TH/TH.js
import * as echarts from '../../utils/ec-canvas/echarts'
Component({
  properties: {
    cur: {
      type: Boolean,
      value: false
    },
    range: {
      type: Array,
      value: [],
      observer() {
      }
    },
    humidityArray: {
      type: Array,
      value: [],
      observer() {
        this.draw()
      }
    },
    temperatureArray: {
      type: Array,
      value: [],
      observer() {
        this.draw()
      }
    }
  },
  data: {
    TH: {
      lazyLoad: true
    },

  },
  attached() {
    this.draw()
  },
  methods: {
    draw() {
      this.THComponnet = this.selectComponent('#mychart-dom-line')
      this.THInit()
    },
    THInit() {
      this.THComponnet.init((canvas, width, height, dpr) => {
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(chart);
        chart.setOption(this.getTHOption());
        return chart;
      })
    },
    getTHOption() {
      const that = this
      return {
        title: {
          text: '温湿度',
          left: 'left',
          textStyle: {
            color: '#d14a61'
          }
        },
        backgroundColor: '#fbf9fe',
        color: ['#5793f3', '#d14a61'],
        grid: {
          left: 0,
          right: 20,
          bottom: 15,
          top: 40,
          containLabel: true
        },
        legend: {
          data: ['温度', '湿度']
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            formatter(value) {
              // console.log(that.data.cur);
              if (that.data.cur) {
                var date = new Date(value)
                return [date.getMonth() + 1, date.getDate()].join('-') + '\r\n' + date.getFullYear()
              } else {
                var date = new Date(value)
                return date.getHours() + ':' + date.getMinutes() + '\r\n' + (date.getMonth() + 1) + '-' + date.getDate()
              }
            }
          },
          data: this.data.range,
          // show: false
        },
        yAxis: {
          x: 'center',
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [
          {
            name: '温度',
            showSymbol: false,
            type: 'line',
            smooth: true,
            data: this.data.temperatureArray
          },
          {
            name: '湿度',
            showSymbol: false,
            type: 'line',
            smooth: true,
            data: this.data.humidityArray
          }
        ]
      };
    }
  },
  created: function () {

  },
  ready: function () {

  },
  moved: function () {

  },
  detached: function () {

  },
});
