// components/light/light.js
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
    lightArray: {
      type: Array,
      value: [],
      observer() {
        this.draw()
      }
    }
  },
  data: {
    Light: {
      lazyLoad: true
    },
  },
  attached() {
    this.draw()
  },
  methods: {
    draw() {
      this.lightComponnet = this.selectComponent('#mychart-dom-line')
      this.lightInit()
    },
    lightInit() {
      this.lightComponnet.init((canvas, width, height, dpr) => {
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(chart);
        chart.setOption(this.getLightOption());
        return chart;
      })
    },
    getLightOption() {
      const that = this
      return {
        title: {
          text: '光照强度',
          left: 'left',
          textStyle: {
            color: '#E6A23C'
          }
        },
        backgroundColor: '#fbf9fe',
        color: '#E6A23C',
        grid: {
          left: 0,
          right: 20,
          bottom: 15,
          top: 40,
          containLabel: true
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
            showSymbol: false,
            type: 'line',
            smooth: true,
            data: this.data.lightArray
          }]
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
