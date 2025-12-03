# React 项目模板

这是一个基于 React 18 的现代化前端项目模板，集成了常用的开发工具和最佳实践，适合快速构建高质量的单页应用。

## 技术栈

- **框架**: React 18
- **构建工具**: Create React App + Craco
- **路由**: React Router v7
- **状态管理**: Redux Toolkit / MobX
- **UI 组件库**: Ant Design Mobile
- **样式方案**: Less + CSS Modules
- **HTTP 请求**: Axios
- **代码规范**: ESLint + Prettier + Stylelint

## 快速开始

### 环境要求

- Node.js >= 14.x
- npm >= 6.x

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动。

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `build` 目录中。

### 运行测试

```bash
npm test
```

## 项目结构

```
├── public/                 # 静态资源目录
│   ├── index.html         # HTML模板
│   └── images/            # 图片资源
├── src/                    # 源代码目录
│   ├── api/               # API接口定义
│   ├── assets/            # 项目资源
│   │   ├── imgs/          # 图片
│   │   └── styles/        # 全局样式
│   ├── components/        # 通用组件
│   ├── icons/             # 图标资源
│   ├── layouts/           # 布局组件
│   ├── mock/              # 模拟数据
│   ├── router/            # 路由配置
│   ├── store/             # 状态管理
│   │   ├── mobxStore/     # MobX状态
│   │   └── reduxStore/    # Redux状态
│   ├── utils/             # 工具函数
│   └── views/             # 页面组件
│       ├── home/          # 首页
│       ├── me/            # 个人中心
│       ├── message/       # 消息中心
│       └── todo/          # 待办事项
├── .eslintrc.js           # ESLint配置
├── .prettierrc.js         # Prettier配置
├── .stylelintrc.js        # Stylelint配置
├── craco.config.js        # Craco配置
└── package.json           # 项目配置
```

## 功能模块

### 首页 (Home)

- 展示项目的主要功能入口
- 数据可视化展示

### 个人中心 (Me)

- 用户信息管理
- 账户设置

### 消息中心 (Message)

- 消息列表
- 消息详情

### 待办事项 (Todo)

- 任务列表
- 任务创建与编辑
- 任务状态管理

## 开发指南

### 路由配置

路由配置文件位于 `src/router/router.js`，使用 React Router v7 进行路由管理。

### 状态管理

项目提供了两种状态管理方案：

1. **Redux Toolkit** (推荐)

   - 配置文件位于 `src/store/reduxStore/`
   - 使用切片 (Slice) 模式组织状态

2. **MobX**
   - 配置文件位于 `src/store/mobxStore/`
   - 基于 observable 和 action 的响应式状态管理

### API 请求

API 接口定义位于 `src/api/` 目录，使用 Axios 进行 HTTP 请求。

### 组件开发

- 通用组件放在 `src/components/` 目录
- 页面组件放在 `src/views/` 目录
- 组件命名使用 PascalCase 命名规范

### 样式开发

- 全局样式放在 `src/assets/styles/` 目录
- 组件样式使用 Less 预处理器
- 推荐使用 CSS Modules 进行样式模块化

## 代码规范

### JavaScript/React

- 使用 ESLint 进行代码质量检查
- 遵循 React 最佳实践
- 组件命名使用 PascalCase
- 函数和变量命名使用 camelCase

### CSS/Less

- 使用 Stylelint 进行样式检查
- 采用 BEM 命名规范
- 避免使用全局样式污染

### 代码格式化

- 使用 Prettier 进行代码格式化
- 配置在 `.prettierrc.js` 文件中

## 注意事项

1. 项目使用了 Craco 来扩展 Create React App 的配置，所有配置都在 `craco.config.js` 文件中。

2. 模拟数据位于 `src/mock/` 目录，用于开发阶段的数据模拟。

3. 项目支持响应式设计，适配不同屏幕尺寸的设备。

4. 开发前请确保已安装所有依赖，并阅读相关文档。

## 许可证

MIT License
