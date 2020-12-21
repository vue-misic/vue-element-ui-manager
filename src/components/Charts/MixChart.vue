<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
const colorList = ['#714bff', '#407aff', '#28a6ff', '#1ed1cf', '#52c688', '#ff6600', '#ffd800', '#ff9000', '#ff2a00']
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    chartName: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    nameChartDto: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    'nameChartDto': {
      handler(val) {
        if (val) {
          const { list } = val
          const tempArr = list && list.map((imp, index) => {
            return {
              data: imp.dataList,
              name: imp.name,
              type: 'line',
              // stack: 'total',
              // barMaxWidth: 35,
              // barGap: '10%',
              // // lineStyle:{
              // //   color: function(params) {
              // //     return colorList[index]
              // //   }
              // // },
              itemStyle: {
                normal: {
                  // color: function(params) {
                  //   return colorList[index]
                  // },
                  label: {
                    show: true,
                    textStyle: {
                      color: '#fff'
                    },
                    // position: 'insideTop',
                    position: [0, 5 * index],
                    formatter(p) {
                      return p.value > 0 ? p.value : ''
                    }
                  }
                }
              }
            }
          })
          this.seriesDate = tempArr || []
          this.$nextTick(() => {
            this.initChart()
          })
        }
      },
      deep: true,
      immediate: true
    }
  },
  // mounted() {
  //   this.initChart()
  // },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        backgroundColor: '#344b58',
        title: {
          text: this.chartName,
          x: '20',
          top: '20',
          textStyle: {
            color: '#fff',
            fontSize: '22'
          },
          subtextStyle: {
            color: '#90979c',
            fontSize: '16'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          borderWidth: 0,
          top: 150,
          bottom: 95,
          textStyle: {
            color: '#fff'
          }
        },
        color: colorList,
        legend: {
          x: '5%',
          top: '10%',
          textStyle: {
            color: '#90979c'
          },
          data: this.nameChartDto.axisData
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          boundaryGap: false,
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          data: this.nameChartDto.dateList
        }],
        yAxis: [{
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          splitArea: {
            show: false
          }
          // minInterval: 10,
          // interval: this.chartName === '名单数据图' ? 50 : 30
        }],
        // dataZoom: [{
        //   show: true,
        //   height: 30,
        //   xAxisIndex: [
        //     0
        //   ],
        //   bottom: 30,
        //   start: 10,
        //   end: 80,
        //   handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
        //   handleSize: '110%',
        //   handleStyle: {
        //     color: '#d3dee5'

        //   },
        //   textStyle: {
        //     color: '#fff' },
        //   borderColor: '#90979c'

        // }, {
        //   type: 'inside',
        //   show: true,
        //   height: 15,
        //   start: 1,
        //   end: 35
        // }],
        series: this.seriesDate
      }, true)
    }
  }
}
</script>
