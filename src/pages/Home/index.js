import React, { useEffect } from 'react'
import * as echarts from 'echarts';
import BarChart from './components/BarChart';



export default function Home() {

  return (
    <div>
      <BarChart title={'三大框架满意度'} chartId={'main1'} xAxisData={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}/>
      <BarChart title={'三大框架使用度'} chartId={'main2'} xAxisData={['1','2','3','4','5','6','7']}/>
    </div>
  )
}
