// components/carbon/carbon.js
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
    carbonArray: {
      type: Array,
      value: [],
      observer() {
        this.draw()
      }
    },
  },
  data: {
    Carbon: {
      lazyLoad: true
    },
  },
  attached() {
    this.draw()
  },
  methods: {
    draw() {
      this.carbonComponnet = this.selectComponent('#mychart-dom-line')
      this.carbonInit()
    },
    carbonInit() {
      this.carbonComponnet.init((canvas, width, height, dpr) => {
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(chart);
        chart.setOption(this.getCarbonOption());
        return chart;
      })
    },
    getCarbonOption() {
      const that = this
      return {
        title: {
          text: '二氧化碳浓度',
          left: 'left',
          textStyle: {
            color: '#409EFF'
          }
        },
        backgroundColor: '#fbf9fe',
        color: '#409EFF',
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
          data: this.data.range
        },
        yAxis: {
          x: 'center',
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          min(value) {
            return value.min - 50;
          },
          max(value) {
            return value.max + 50;
          },
        },
        series: [
          {
            showSymbol: false,
            type: 'line',
            smooth: true,
            data: this.data.carbonArray
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
