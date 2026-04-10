import React from 'react'
import axios from 'axios'
import './index.less'

const Index = () => {
  const fetchChange = async () => {
    const params = await axios.post('http://localhost:3000/api/goodsList')
    console.log(params)
  }
  return (
    <div className="dev-server">
      <div className="box">
        <button className="button" onClick={fetchChange}>
          发送请求
        </button>
      </div>
    </div>
  )
}

export default Index
