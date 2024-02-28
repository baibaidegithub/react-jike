//柱状图组件
import React, { useEffect } from 'react'
import * as echarts from 'echarts';

//1.把功能代码都放在这个组件中
//2.把可变部分抽象成props参数


export default function BarChart({ title, chartId ,xAxisData}) {
    useEffect(() => {
        //1.获取渲染图表的dom节点
        const chartDom = document.getElementById(chartId);

        //2.图表初始化生成图表实例对
        const myChart = echarts.init(chartDom);

        //3.准备图表参数
        const option = {
            title: {
                text: title
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: xAxisData,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Direct',
                    type: 'bar',
                    barWidth: '60%',
                    data: [10, 52, 200, 334, 390, 330, 220]
                }
            ]
        };

        //4.使用图表参数完成图表的渲染
        option && myChart.setOption(option);

    }, [])
    return (
        <div>
            <div id={chartId} style={{ width: '500px', height: '400px' }}></div>
        </div>
    )

}
