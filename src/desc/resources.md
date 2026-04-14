# 随机图片资源 CDN

## 随机生成图片资源

### 1. 保罗随机动漫壁纸 API

访问 [https://api.paugram.com/wallpaper/](https://api.paugram.com/wallpaper/)，可随机获取动漫壁纸图片地址。

### 2. 岁月小筑随机图片 API

- **随机环境背景图片**：[https://img.xjh.me/random_img.php?type=bg&ctype=nature&return=302](https://img.xjh.me/random_img.php?type=bg&ctype=nature&return=302)
- **随机人物背景图片**：[https://img.xjh.me/random_img.php?type=bg&ctype=acg&return=302](https://img.xjh.me/random_img.php?type=bg&ctype=acg&return=302)

### 3. 必应壁纸随机 API

访问 [https://api.bimg.cc/random](https://api.bimg.cc/random)，可随机获取必应壁纸的图片地址。

- 默认获取中国地区的壁纸
- 可通过参数指定其他地区

### 4. Placehold.co（纯色 + 文字背景）

**核心逻辑**：生成纯色背景（可带文字），通过标识锁定颜色（不同标识对应不同随机纯色），适合极简背景。

**基础格式**：`https://placehold.co/[宽]x[高]/[自动颜色]/[文字颜色]?text=[文字]&seed=[标识]`

**示例**：

- 标识 555 的纯色背景：[https://placehold.co/800x600/auto/000?text=Background&seed=555](https://placehold.co/800x600/auto/000?text=Background&seed=555)
- 标识 abc 的宽屏背景：[https://placehold.co/1920x1080/auto/fff?seed=abc](https://placehold.co/1920x1080/auto/fff?seed=abc)
