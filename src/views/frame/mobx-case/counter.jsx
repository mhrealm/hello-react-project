import React from 'react'
import { observer, inject } from 'mobx-react'

const Counter = inject('counterStore')(
  observer(({ counterStore }) => {
    return (
      <div>
        <h3>Count: {counterStore.count}</h3>
        <h3>multiple: {counterStore.multiple}</h3>
        <button onClick={() => counterStore.increment()}>Increment</button>
        <button onClick={() => counterStore.decrement()}>Decrement</button>
        <button onClick={() => counterStore.reset()}>Reset</button>
      </div>
    )
  })
)

export default Counter
