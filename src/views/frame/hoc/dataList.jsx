import React, { useState, useEffect } from 'react'
import withLoading from './loading'
import axios from 'axios'

const List = ({ data }) => {
  return (
    <div className="dataList">
      <p>使用高阶组件使用加载loading的功能</p>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
    </div>
  )
}

const DataListWithLoading = withLoading(List)

const DataList = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const { data, status } = await axios('https://jsonplaceholder.typicode.com/albums')
        if (status === 200) {
          setData(data)
        }
      } catch (error) {
        setData([])
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return <DataListWithLoading data={data} isLoading={isLoading} />
}

export default DataList
