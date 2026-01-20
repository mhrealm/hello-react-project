import React from 'react'
import './index.less'
import useForm from './useForm.jsx'
const UseHooks = () => {
  return (
    <div className="container">
      <Person />
      <Pet />
    </div>
  )
}

const Person = () => {
  const [values, handleChange, resetForm] = useForm({
    name: '',
    email: '',
    school: ''
  })
  const handleSubmit = event => {
    event.preventDefault()
    // 处理表单提交逻辑
    console.log('提交数据', values)
  }

  return (
    <form onSubmit={handleSubmit} className="box">
      <p>1. useForm人员信息统计</p>
      <div>
        <span>姓名：</span>
        <input name="name" value={values.name} onChange={handleChange} />
      </div>
      <div>
        <span>学校：</span>
        <input name="school" value={values.school} onChange={handleChange} />
      </div>
      <div>
        <span>邮箱：</span>
        <input name="email" value={values.email} onChange={handleChange} />
      </div>
      <button type="submit">提交</button>
      <button type="button" onClick={resetForm}>
        重置
      </button>
    </form>
  )
}

const Pet = () => {
  const [values, handleChange, resetForm] = useForm({ name: '', englishName: '', number: '' })
  const handleSubmit = event => {
    event.preventDefault()
    // 处理表单提交逻辑
    console.log('提交数据', values)
  }

  return (
    <form onSubmit={handleSubmit} className="box">
      <p>2. useForm宠物信息统计</p>
      <div>
        <span>宠物名：</span>
        <input name="name" value={values.name} onChange={handleChange} />
      </div>
      <div>
        <span>英文名：</span>
        <input name="englishName" value={values.englishName} onChange={handleChange} />
      </div>
      <div>
        <span>编号：</span>
        <input name="number" value={values.number} onChange={handleChange} />
      </div>
      <button type="submit">提交</button>
      <button type="button" onClick={resetForm}>
        重置
      </button>
    </form>
  )
}

export default UseHooks
