import axios from 'axios';

// 1. 环境配置
const isDevelopment = process.env.NODE_ENV === 'development';

// 2. Base URL 配置 - 根据环境切换
const baseURLs = {
  development: '/api', // 使用 /api 前缀，通过代理转发
  production: 'http://api.example.com', // 生产环境API地址
  test: 'http://test-api.example.com', // 测试环境API地址
};

const baseURL = baseURLs[process.env.NODE_ENV] || baseURLs.development;

// 3. 创建 axios 实例
const request = axios.create({
  baseURL,
  timeout: 15000, // 增加超时时间到15秒
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// 4. 请求取消控制器管理 - 用于防止重复请求
const pendingRequests = new Map();

// 生成请求唯一标识
const generateRequestKey = config => {
  const { method, url, params, data } = config;
  return `${method}${url}${JSON.stringify(params)}${JSON.stringify(data)}`;
};

// 取消重复请求
const cancelPendingRequest = config => {
  const requestKey = generateRequestKey(config);
  if (pendingRequests.has(requestKey)) {
    const cancelToken = pendingRequests.get(requestKey);
    cancelToken.cancel(`重复请求被取消: ${requestKey}`);
    pendingRequests.delete(requestKey);
  }
};

// 5. 请求拦截器
request.interceptors.request.use(
  config => {
    // 处理params参数，如果是基本类型，则转换为{num: params}的格式
    if (
      config.method === 'get' &&
      config.params &&
      typeof config.params !== 'object'
    ) {
      config.url = `${config.url}/${config.params}`;
      config.params = undefined;
    }

    // 取消重复请求
    cancelPendingRequest(config);
    // 设置请求取消令牌
    const source = axios.CancelToken.source();
    config.cancelToken = source.token;

    // 存储请求取消令牌
    const requestKey = generateRequestKey(config);
    pendingRequests.set(requestKey, source);

    // Token 管理
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 开发环境日志
    if (isDevelopment) {
      console.log(
        `🚀 [API Request] ${config.method.toUpperCase()} ${config.url}`,
        {
          params: config.params,
          data: config.data,
        }
      );
    }

    return config;
  },
  error => {
    if (axios.isCancel(error)) {
      console.log('🔄 请求已取消:', error.message);
      return Promise.resolve(); // 取消请求时返回空对象，避免组件报错
    }
    console.error('🔥 请求拦截器出错：', error);
    return Promise.reject(error);
  }
);

// 6. 响应拦截器
request.interceptors.response.use(
  response => {
    // 移除已完成的请求
    const requestKey = generateRequestKey(response.config);
    pendingRequests.delete(requestKey);

    // 开发环境日志
    if (isDevelopment) {
      console.log(
        `✅ [API Response] ${response.config.method.toUpperCase()} ${response.config.url}`,
        {
          status: response.status,
          data: response.data,
        }
      );
    }

    // 统一处理响应数据格式
    const { data } = response;

    // 假设后端返回格式：{ success: boolean, data: any, message: string }
    if (data.success !== undefined) {
      if (data.success) {
        return data.data; // 直接返回业务数据
      } else {
        // 业务逻辑错误
        const error = new Error(data.message || '请求失败');
        error.code = 'BUSINESS_ERROR';
        error.data = data;
        return Promise.reject(error);
      }
    }

    // 如果后端没有统一格式，直接返回数据
    return data;
  },
  error => {
    // 移除已完成的请求
    if (error.config) {
      const requestKey = generateRequestKey(error.config);
      pendingRequests.delete(requestKey);
    }

    // 请求取消处理
    if (axios.isCancel(error)) {
      console.log('🔄 请求已取消:', error.message);
      return Promise.resolve(); // 取消请求时返回空对象
    }

    // 错误日志
    console.error('🔥 [API Error]', {
      message: error.message,
      config: error.config,
      response: error.response,
      request: error.request,
    });

    // 构建错误信息
    let errorMessage = '网络错误，请稍后重试';
    let errorCode = 'NETWORK_ERROR';

    if (error.response) {
      // 服务器返回错误
      const { status, data } = error.response;
      errorCode = status;

      // 根据状态码定制错误信息
      switch (status) {
        case 400:
          errorMessage = data?.message || '请求参数错误';
          break;
        case 401:
          errorMessage = '登录已过期，请重新登录';
          // 可以在这里跳转到登录页
          // window.location.href = '/login'
          break;
        case 403:
          errorMessage = '没有权限访问该资源';
          break;
        case 404:
          errorMessage = '请求的资源不存在';
          break;
        case 500:
          errorMessage = isDevelopment
            ? data?.message || '服务器内部错误'
            : '服务器繁忙，请稍后重试';
          break;
        case 502:
          errorMessage = '网关错误';
          break;
        case 503:
          errorMessage = '服务器正在维护';
          break;
        case 504:
          errorMessage = '服务器响应超时';
          break;
        default:
          errorMessage = data?.message || `请求失败 (${status})`;
      }
    } else if (error.request) {
      // 请求发送但未收到响应
      errorMessage = '网络连接超时，请检查网络';
    } else {
      // 请求配置错误
      errorMessage = error.message;
    }

    // 封装错误对象
    const apiError = new Error(errorMessage);
    apiError.code = errorCode;
    apiError.originalError = error;
    apiError.config = error.config;

    return Promise.reject(apiError);
  }
);

// 7. 请求重试机制 - 可配置重试次数和重试间隔
const retryRequest = async (config, retryCount = 3, retryDelay = 1000) => {
  try {
    return await request(config);
  } catch (error) {
    if (retryCount <= 0 || error.code === 'BUSINESS_ERROR') {
      throw error; // 达到最大重试次数或业务错误，不再重试
    }

    console.log(
      `🔄 请求重试 (${retryCount}): ${config.method.toUpperCase()} ${config.url}`
    );
    await new Promise(resolve => setTimeout(resolve, retryDelay));
    return retryRequest(config, retryCount - 1, retryDelay * 2); // 指数退避
  }
};

// 8. 扩展 axios 实例，添加重试方法
request.retry = retryRequest;

// 9. 导出封装好的 axios 实例
export default request;
