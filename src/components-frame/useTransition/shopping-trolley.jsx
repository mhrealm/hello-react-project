import './index.less'
import React, { useState, useTransition, useEffect } from 'react'
import { getUseTansitionCartItems, updateQuantity } from '@/api/hooks.js'

const ShoppingTrolley = () => {
  return (
    <div className="comparison-container">
      <ShoppingTrolleyOne />
      <ShoppingTrolleyTwo />
    </div>
  )
}

// 购物车功能（不使用action）
const ShoppingTrolleyOne = () => {
  const [price, setPrice] = useState(1)
  const [isPending, setIsPending] = useState(false)
  const [loading, setLoading] = useState(true)

  // 初始化获取购物车数据
  const loadCartItems = async () => {
    try {
      const cartItems = await getUseTansitionCartItems()
      if (cartItems.length > 0) {
        setPrice(cartItems[0].quantity)
      }
    } catch (error) {
      console.error('Failed to fetch cart items:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCartItems()
  }, [])

  const changePrice = async ({ target }) => {
    setIsPending(true)
    const res = await updateQuantity(target.value)
    setIsPending(false)
    setPrice(res)
  }
  return (
    <div className="shoppingTrolley">
      <div className="title">购物车（不使用action）</div>
      <div className="price">
        <span>宝马X5（公路之王）</span>
        <div>
          <span>数量：</span>
          <input type="number" min={1} defaultValue={1} onChange={changePrice} />
        </div>
      </div>
      <hr />
      <div className="totalPrice">
        <span>总价：</span>
        <span>
          $<span>{isPending ? '🌀 Updating...' : `${price * 20}`}</span>万
        </span>
      </div>
    </div>
  )
}

// 购物车功能（使用action）
const ShoppingTrolleyTwo = () => {
  const [price, setPrice] = useState(1)
  const [isPending, startTransition] = useTransition()
  const [loading, setLoading] = useState(true)

  // 初始化获取购物车数据
  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const cartItems = await getUseTansitionCartItems()
        if (cartItems.length > 0) {
          setPrice(cartItems[0].quantity)
        }
      } catch (error) {
        console.error('Failed to fetch cart items:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCartItems()
  }, [])

  const handleChange = async ({ target }) => {
    startTransition(async () => {
      const res = await updateQuantity(target.value)
      setPrice(res)
    })
  }
  return (
    <div className="shoppingTrolley">
      <div className="title">购物车（使用action）</div>
      <div className="price">
        <span>宝马X5（公路之王）</span>
        <div>
          <span>数量：</span>
          <input type="number" min={1} defaultValue={1} onChange={handleChange} />
        </div>
      </div>
      <hr />
      <div className="totalPrice">
        <span>总价：</span>
        <span>
          $<span>{isPending ? '🌀 Updating...' : `${price * 20}`}</span>万
        </span>
      </div>
    </div>
  )
}

export default ShoppingTrolley
