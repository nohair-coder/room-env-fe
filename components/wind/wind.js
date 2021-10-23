// components/wind/wind.js
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
    windArray: {
      type: Array,
      value: [],
      observer() {
        this.draw()
      }
    }
  },
  data: {
    Wind: {
      lazyLoad: true
    },
  },
  attached() {
    this.draw()
  },
  methods: {
    draw() {
      this.windComponnet = this.selectComponent('#mychart-dom-line')
      this.windInit()
    },
    windInit() {
      this.windComponnet.init((canvas, width, height, dpr) => {
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(chart);
        chart.setOption(this.getWindOption());
        return chart;
      })
    },
    getWindOption() {
      const that = this
      return {
        title: {
          text: '风速',
          left: 'left',
          textStyle: {
            color: '#67C23A'
          }
        },
        backgroundColor: '#fbf9fe',
        color: '#67C23A',
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
          data: that.data.range
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
            data: that.data.windArray
            // data: [81, 166, 651, 301, 781, 401, 331]
          }]
      };
    }

  },
  observes: {
    "windArray"(newValue) {
      console.log('observes', newValue);
    }
  }
})
