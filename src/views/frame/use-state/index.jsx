import React from 'react'
import AddState from './add-state.jsx'
import UpdateObject from './update-object.jsx'
import NotRepeatCreate from './not-repeat-create.jsx'
import KeyResetComponent from './key-reset-component.jsx'
import Malfunction1 from './malfunction-1.jsx'
import Malfunction2 from './malfunction-2.jsx'

const Index = () => {
  return (
    <div className="knowledge-module">
      <AddState />
      <UpdateObject />
      <NotRepeatCreate />
      <KeyResetComponent />
      <Malfunction1 />
      <Malfunction2 />
    </div>
  )
}
export default Index
