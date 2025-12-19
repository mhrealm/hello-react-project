import api from '@/utils/request'

// 添加账单
export const addAnBill = billData => {
  return api.post('/addBill', billData)
}

// 获取所有账单
export const getBilllist = () => {
  return api.get('/getBills')
}

// 3. （可选）根据 ID 删除账单
// export const deleteBill = (id) => {
//   return api.delete(`/api/bills/${id}`)
// }

// 4. （可选）更新账单
// export const updateBill = (id, updatedData) => {
//   return api.put(`/api/bills/${id}`, updatedData)
// }
