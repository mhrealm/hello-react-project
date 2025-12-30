import React, { useState, useEffect } from 'react'

import { getImageAddress } from '@/api/resource'

const Case1 = () => {
  const [urls, setUrls] = useState([])

  const initPage = async () => {
    try {
      const res = await getImageAddress(10)
      console.log(9999, res)
      setUrls(res.data)
    } catch (error) {
      console.error('Error fetching image addresses:', error)
    }
  }

  useEffect(initPage, [])

  return (
    <div>
      {urls?.map((url, index) => (
        <img key={index} src={url} alt={`robot ${index}`} />
      ))}
      <h1>imagesLazyLoading 案例1</h1>
    </div>
  )
}

export default Case1
