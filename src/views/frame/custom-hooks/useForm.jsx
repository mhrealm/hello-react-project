import { useState } from 'react'
function useForm(initialState) {
  const [values, setValues] = useState(initialState)
  const handleChange = ({ target }) => {
    setValues({ ...values, [target.name]: target.value })
  }
  const resetForm = () => {
    setValues(initialState)
  }
  return [values, handleChange, resetForm]
}
export default useForm
