import { createSlice } from '@reduxjs/toolkit'

import axios from 'axios'

const foods = createSlice({
  name: 'foodlists',
  initialState: {
    foodList: []
  },
  reducers: {
    setFoodList: (state, action) => {
      state.foodList = action.payload
      console.log(99999, action.payload)
    }
  }
})

// 设置异步请求
const { setFoodList } = foods.actions
const fetchFoodList = () => {
  return async dispatch => {
    const res = await axios.get('/food-api/takeaway')
    dispatch(setFoodList(res.data))
  }
}

export { fetchFoodList, setFoodList }

export default foods.reducer
