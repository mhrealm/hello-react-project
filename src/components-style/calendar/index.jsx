import dayjs from 'dayjs'
import React, { useState } from 'react'
import { Calendar } from 'antd-mobile'
import './index.less'

export default () => {
  const today = dayjs()
  const [val, setVal] = useState(() => [today.subtract(2, 'day').toDate(), today.add(2, 'day').toDate()])
  return (
    <div className="container">
      <Calendar
        prevYearButton={null}
        nextYearButton={null}
        className="calendar-custom"
        selectionMode="range"
        weekStartsOn="Monday"
        value={val}
        onChange={val => {
          setVal(val)
        }}
      />
    </div>
  )
}
