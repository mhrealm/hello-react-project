import React, { useState, useTransition } from 'react'

const DataVisualization = () => {
  return (
    <div className="useTransition">
      <div className="scene-title">场景2: 数据可视化的动态更新</div>
      <div className="comparison-container">
        <ChartWithoutTransition />
        <ChartWithTransition />
      </div>
    </div>
  )
}

// 生成随机图表数据
const generateChartData = points => {
  return Array.from({ length: points }, (_, i) => ({
    x: i,
    y: Math.random() * 100
  }))
}

// 模拟复杂图表渲染（通过延迟模拟）
const ComplexChart = ({ data, title }) => {
  // 模拟复杂计算和渲染延迟
  const computeChartMetrics = data => {
    // 模拟CPU密集型计算
    let sum = 0
    for (let i = 0; i < 1000000; i++) {
      sum += Math.sqrt(i)
    }

    // 计算一些图表指标
    const maxY = Math.max(...data.map(d => d.y))
    const minY = Math.min(...data.map(d => d.y))
    const avgY = data.reduce((sum, d) => sum + d.y, 0) / data.length

    return { maxY, minY, avgY }
  }

  const metrics = computeChartMetrics(data)

  return (
    <div className="chart-container">
      <h4>{title}</h4>
      <div className="chart">
        {data.map((point, index) => (
          <div
            key={index}
            className="chart-bar"
            style={{
              left: `${(point.x / (data.length - 1)) * 100}%`,
              height: `${(point.y / 100) * 100}%`,
              bottom: '0'
            }}
          />
        ))}
      </div>
      <div className="chart-metrics">
        <span>最大值: {metrics.maxY.toFixed(2)}</span>
        <span>最小值: {metrics.minY.toFixed(2)}</span>
        <span>平均值: {metrics.avgY.toFixed(2)}</span>
      </div>
    </div>
  )
}

// 不使用useTransition的数据可视化更新
const ChartWithoutTransition = () => {
  const [dataPoints, setDataPoints] = useState(50)
  const [chartData, setChartData] = useState(generateChartData(50))
  const [isPending, setIsPending] = useState(false)

  const handleDataPointsChange = ({ target }) => {
    const points = parseInt(target.value)
    setDataPoints(points)
    setIsPending(true)

    // 模拟数据获取延迟
    setTimeout(() => {
      setChartData(generateChartData(points))
      setIsPending(false)
    }, 300) // 模拟300ms的数据处理延迟
  }

  return (
    <div className="shoppingTrolley">
      <div className="title">不使用useTransition</div>
      <div className="data-controls">
        <span>数据点数量: </span>
        <input type="range" min="10" max="200" value={dataPoints} onChange={handleDataPointsChange} />
        <span>{dataPoints}</span>
        {isPending && <span className="pending-indicator">🌀 Rendering...</span>}
      </div>
      <ComplexChart data={chartData} title="复杂图表" />
    </div>
  )
}

// 使用useTransition的数据可视化更新
const ChartWithTransition = () => {
  const [dataPoints, setDataPoints] = useState(50)
  const [chartData, setChartData] = useState(generateChartData(50))
  const [isPending, startTransition] = useTransition()

  const handleDataPointsChange = ({ target }) => {
    const points = parseInt(target.value)
    setDataPoints(points) // 紧急更新：立即更新滑块位置

    // 非紧急更新：使用useTransition包装图表数据更新
    startTransition(() => {
      // 模拟数据获取延迟
      setTimeout(() => {
        setChartData(generateChartData(points))
      }, 300) // 模拟300ms的数据处理延迟
    })
  }

  return (
    <div className="shoppingTrolley">
      <div className="title">使用useTransition</div>
      <div className="data-controls">
        <span>数据点数量: </span>
        <input type="range" min="10" max="200" value={dataPoints} onChange={handleDataPointsChange} />
        <span>{dataPoints}</span>
        {isPending && <span className="pending-indicator">🌀 Rendering...</span>}
      </div>
      <ComplexChart data={chartData} title="复杂图表" />
    </div>
  )
}

export default DataVisualization
