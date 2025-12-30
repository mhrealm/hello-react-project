/**
 * 统一响应工具函数
 * 用于封装所有API接口的返回数据格式
 */

// 响应状态码常量
const STATUS_CODES = {
  // 成功状态码
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,

  // 客户端错误状态码
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,

  // 服务器错误状态码
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
}

// 响应消息常量
const MESSAGES = {
  // 成功消息
  SUCCESS: '请求成功',
  CREATED: '资源创建成功',
  NO_CONTENT: '请求已处理，无内容返回',

  // 客户端错误消息
  BAD_REQUEST: '请求参数错误',
  UNAUTHORIZED: '未授权访问',
  FORBIDDEN: '禁止访问',
  NOT_FOUND: '请求的资源不存在',
  METHOD_NOT_ALLOWED: '请求方法不被允许',
  REQUEST_TIMEOUT: '请求超时',
  CONFLICT: '请求与服务器当前状态冲突',

  // 服务器错误消息
  INTERNAL_SERVER_ERROR: '服务器内部错误',
  NOT_IMPLEMENTED: '功能未实现',
  BAD_GATEWAY: '网关错误',
  SERVICE_UNAVAILABLE: '服务不可用',
  GATEWAY_TIMEOUT: '网关超时'
}

/**
 * 统一响应格式生成函数
 * @param {Object} res - Express响应对象
 * @param {number} code - 状态码
 * @param {*} data - 响应数据
 * @param {string} message - 响应消息
 */
const response = (res, code = STATUS_CODES.SUCCESS, data = null, message = '') => {
  // 如果未提供消息，使用默认消息
  const responseMessage =
    message || MESSAGES[Object.keys(STATUS_CODES).find(key => STATUS_CODES[key] === code)] || '未知状态'

  // 构建统一的响应格式
  const responseData = {
    code,
    message: responseMessage,
    data,
    timestamp: new Date().getTime() // 添加时间戳
  }

  // 发送响应
  return res.status(code).json(responseData)
}

/**
 * 成功响应快捷方法
 * @param {Object} res - Express响应对象
 * @param {*} data - 响应数据
 * @param {string} message - 响应消息
 */
const success = (res, data = null, message = MESSAGES.SUCCESS) => {
  return response(res, STATUS_CODES.SUCCESS, data, message)
}

/**
 * 创建成功响应快捷方法
 * @param {Object} res - Express响应对象
 * @param {*} data - 响应数据
 * @param {string} message - 响应消息
 */
const created = (res, data = null, message = MESSAGES.CREATED) => {
  return response(res, STATUS_CODES.CREATED, data, message)
}

/**
 * 客户端错误响应快捷方法
 * @param {Object} res - Express响应对象
 * @param {number} code - 状态码
 * @param {string} message - 响应消息
 * @param {*} data - 响应数据
 */
const clientError = (res, code = STATUS_CODES.BAD_REQUEST, message = MESSAGES.BAD_REQUEST, data = null) => {
  return response(res, code, data, message)
}

/**
 * 服务器错误响应快捷方法
 * @param {Object} res - Express响应对象
 * @param {number} code - 状态码
 * @param {string} message - 响应消息
 * @param {*} data - 响应数据
 */
const serverError = (
  res,
  code = STATUS_CODES.INTERNAL_SERVER_ERROR,
  message = MESSAGES.INTERNAL_SERVER_ERROR,
  data = null
) => {
  return response(res, code, data, message)
}

// 使用CommonJS语法导出所有工具函数
module.exports = {
  response,
  success,
  created,
  clientError,
  serverError,
  STATUS_CODES,
  MESSAGES
}
