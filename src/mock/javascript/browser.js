// eslint-disable-next-line import/no-anonymous-default-export
export default {
  biggerTitle: '浏览器',
  type: 'javascript',
  items: [
    {
      title: '浏览器的默认行为有哪些？如何阻止浏览器的默认行为？',
      type: 'javascript',
      result: `
      浏览器的默认行为有很多，比如常见的如下几种：

      第一种：浏览器中链接默认会点击后会跳转到指定的url，如果需要阻止浏览器的跳转，可以在onclick事件中return false，如下：
      <a herf='https://wwww.baidu.com' onclick="return false">跳转百度</a> 或者 
      <a href="https://www.baidu.com" onclick="event.preventDefault()">跳转百度</a>

      第二种：默认情况下鼠标可以选择文本进行复制的，如果让鼠标不选中文本，可以使用onselctStart事件中设置return false。例如：
      <div onselectstart="return false">
        这段内容不可选，禁止文字被选中
        <p>禁止页面中某一块或某一篇文章被选中复制</p>
      </div>

      第三种：默认情况下form表单中的input在使用回车键的时候会自动提交表单给服务器并刷新页面的，解决方案是在form中的onkeydown事件中判断回车键的code等于13的时候直接return false。
      <form
      action="www.baidu.com"
      method="get"
      onkeydown="if(event.keyCode==13){return false;}"
      >
        <input type="text" value="" />
      </form>
              `,
      difficulty: '★★',
    },
    {
      title: 'http1.0和http2.0有什么区别？',
      type: 'javascript',
      result: `
      1、连接方式：HTTP1.0是无状态的，每次请求都需要建立新的连接，这意味着每次请求都需要进行TCP握手，这会导致大量延迟。然而，HTTP2.0支持多路复用，允许在一个TCP连接上并发多个请求或响应，从而显著提高了网络效率和性能。
      2、数据格式：HTTP1.0的数据是文本格式，虽然方便阅读，但不利于传输和解析。相比之下，HTTP2.0的数据是二进制格式，这种格式更有效地减少了数据传输量，并且不易出错，从而提高了数据传输的可靠性。
              `,
      difficulty: '★★',
    },
    {
      title: '请说明webSocket和Ajax有哪些不同？分别有什么限制？',
      type: 'javascript',
      result: `
      区别：
        1、通信方式：WebSocket是一种双向通信协议，它使用HTTP协议进行握手后，在建立的TCP连接上进行数据传输。这意味着WebSocket连接建立后，服务器和客户端可以互相推送消息。相对之下，Ajax是一种单向通信方式，它通过在后台向服务器发送HTTP请求来获取数据，通常是通过周期性地向服务器发送请求来更新数据。
        2、实时性：由于WebSocket建立的是长连接，并且会话中保持连接，因此它非常适合实时通信。而Ajax则是异步的，实时性相对较差。
        3、浏览器兼容性：WebSocket在一些旧版本的浏览器中可能不被支持，而Ajax则具有更广泛的浏览器兼容性。
              `,

      difficulty: '★★',
    },
    {
      title: '谈谈对于ajax的理解？优点及缺点？',
      type: 'javascript',
      result: `
         JAX = Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）。
         AJAX 不是新的编程语言，而是一种使用现有标准的新方法。
         AJAX 不需要任何浏览器插件，但需要用户允许JavaScript在浏览器上执行。
         优点：
         可以实现页面进行局部更新，不需要刷新整个页面。
         增加了对JSONP的支持，可以简单处理部分跨域等等
         缺点：
         ajax不支持浏览器back按钮。
              `,

      difficulty: '★★',
    },
    {
      title: 'ajax的请求的步骤有那些？',
      type: 'javascript',
      result: `
         创建 XMLHttpRequest 对象
         var ajax = new XMLHttpRequest();

         规定请求的类型、URL 以及是否异步处理请求。
         ajax.open('GET',url,true);

         发送信息至服务器时内容编码类型
         ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
         
         发送请求（此处可以添加请求的参数）
         ajax.send(data);  

         接受服务器响应数据
         ajax.onreadystatechange = function () {
             if (obj.readyState == 4 && (obj.status == 200 || obj.status == 304)) { 
             }
         };
         
              `,

      difficulty: '★★',
    },
    {
      title: 'ajax请求方式post和get的区别？',
      type: 'javascript',
      result: `
         get是想服务器获取数据，post是向服务器传递数据，或者说添加新的数据。
         get传递数据较小，一般小于2kb，post传递数据较大，一般默认不受限制。
         get安全性较低，post相对安全性更高。
         GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息
         GET参数通过URL传递，POST放在Request body中
         GET请求在URL中传送的参数是有长度限制的，而POST没有
         从缓存的角度，GET 请求会被浏览器主动缓存下来，留下历史记录，而 POST 默认不会。
         从编码的角度，GET 只能进行 URL 编码，只能接收 ASCII 字符，而 POST 没有限制。
         从幂等性的角度，GET 是幂等的，而 POST 不是。(幂等表示执行相同的操作，结果也是相同的)
         从 TCP 的角度，GET 请求会把请求报文一次性发出去，而 POST 会分为两个 TCP 数据包，首先发 header 部分，如果服务器响应 100(continue)， 然后发 body 部分。(火狐浏览器除外，它的 POST 请求只发一个 TCP 包)
              `,

      difficulty: '★★',
    },
    {
      title: 'axios中请求拦截器和响应拦截器可以做什么?',
      type: 'javascript',
      result: `
         请求拦截器使用场景:
         发送请求时添加‘正在加载中...’图标
         某些请求必须用户登陆，判断是否有用户token，没有跳转到登陆页
         对请求的参数进行序列化
         
         响应拦截器使用场景：
         status是200，响应拦截成功操作，返回res.data响应数据
         
         如果status是401，响应拦截失败，那么通常是token失效，没有授权，要跳转至登陆页；
         // 请求拦截器 axios.interceptors.request.use(req=>{}, err=>{});
         // 响应拦截器 axios.interceptors.reponse.use(req=>{}, err=>{});
              `,

      difficulty: '★★',
    },
    {
      title: 'Token一般是存放在哪里？',
      type: 'javascript',
      result: `
         解释：token就是访问资源的凭证，一般是用户通过用户名和密码登录成功之后，服务器将登陆凭证做数字签名，加密之后得到的字符串作为token。登录成功后会将token返回给客户端，方便下次登陆验证。
         存储在localStorage 中，每次调用接口的时候都把它当成一个字段传给后台。
         存储在cookie 中，让它自动发送，不过缺点就是不能跨域。
              `,

      difficulty: '★★',
    },
    {
      title: 'Token请求的流程？',
      type: 'javascript',
      result: `
         客户端携带账号和密码请求服务端
         服务端验证请求，请求通过则签发token给客户端
         客户端接收token后存储在localstrage中
         下次客户端请求需要携带token，如果服务端验证通过，则返回请求内容。
              `,

      difficulty: '★★',
    },
    {
      title: '并发请求，怎么处理，如何控制并发量？',
      type: 'javascript',
      result: `
         作者：Mh
         链接：https://juejin.cn/post/7236634852828217399
              `,

      difficulty: '★★★★★',
    },
    {
      title: '请写出至少 5 种常见的 http  状态码以及代表的意义？',
      type: 'javascript',
      result: `
          200（OK）：请求已成功，请求所希望的响应头或数据体将随此响应返回。
          400（Bad  Request）：请求错误，服务端不理解当前请求。
          401   用户未登录或者token过期，用户未授权
          403  资源不可用，一般是用户权限不够，拒绝请求
          404（Not Found）：请求失败，请求所希望得到的资源未被在服务器上发现，请求网页不存在
          500（Internal Server Error）：服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。
              `,

      difficulty: '★★',
    },
    {
      title: '你了解多少cookie？',
      type: 'javascript',
      result: `
         是什么？
         它是服务器发送到 Web 浏览器的一小块数据。服务器发送到浏览器的 Cookie，浏览器会进行存储，并与下一个请求一起发送到服务器。通常，它用于判断两个请求是否来自于同一个浏览器，例如用户保持登录状态。或者用户偏好、主题或者其他设置。


         特点：
         cookie是每个用户身份的通行证。
         cookie 是明文传送的安全性差，类似于get请求。
         存储cookie比较小 （一般在4kb，数量限制在50条）
         cookie机制：如果不在浏览器中设置过期时间，cookie被保存在内存中，生命周期随浏览器的关闭而结束，这种cookie简称会话cookie。如果在浏览器中设置了cookie的过期时间，cookie被保存在硬盘中，关闭浏览器后，cookie数据仍然存在，直到过期时间结束才消失。


         常见的属性：
         path：指定路径，如果没有设置默认当前页面。
         key：value ：当前设置的cooke属性和属性值
         expires：指定过期时间，没有设置默认关闭浏览器删除cookie。
         size：cookie的大小。在所有浏览器中，任何cookie大小超过限制都被忽略，且永远不会被设置
         HttpOnly：如果这个属性设置为true，就不能通过js脚本 document.cookie读取到cookie信息，这样能有效的防止XSS攻击，窃取cookie内容，这样就增加了cookie的安全性，即便是这样，也不要将重要信息存入cookie
         Secure：当这个属性设置为true时，此cookie只会在https和ssl等安全协议下传输

         用法：
         创建cookie
         document.cookie = "username=John Doe";

         删除cookie：默认是浏览器关闭删除cookie，如果设置了过期时间会在当前时间过期时候删除。
         document.cookie = "name=jick; expires=Mon May 12 2023 10:21:47 GMT+0800 (中国标准时间)"

         读取cookie：可以读取当前页面设置的多个cookie
           document.cookie = "username=John Doe";
           document.cookie = "name=jick;"
           console.log(document.cookie);  // username=John Doe; name=jick

         修改cookie：修改类似于创建，会覆盖之前的cookie
           document.cookie = "username=John Doe";
           document.cookie = "username=John Smith;";
           console.log(document.cookie);  // username=John Smith
         注意事项：在浏览器打开的时候必须选择 open with Live Server ，选择file路径打开看不见存储的内容（可以实现7天免登陆，但是项目中一般后端解决）
              `,

      difficulty: '★★★',
    },
    {
      title: '本地存储有哪些？他们有那些区别？',
      type: 'javascript',
      result: `
         Cookie（饼干存储）
         存储的大小一般限制在4kb左右，数量限制在60条，根据不同的浏览器略微有区别。
         Cookie的删除可以通过设置过期时间expires来实现，默认是关闭浏览器后删除Cookie
         Cookie的设置和获取，删除都是通过document.cookie去设置，例如document.cookie = "name=jick; expires=Mon May 12 2023 10:21:47 GMT+0800 (中国标准时间)"
         cookie的常见属性有：
          1、expires：设置过期时间。
          2、key：value 设置当前的key和value值。
          3、size：设置cookie的大小，当超过设置的cookie的大小时，设置无效。
          4、path：指定路径，默认当前浏览器路径。
          5、HttpOnly：如果这个属性设置为true，就不能通过js脚本 document.cookie读取到cookie信息，这样能有效的防止XSS攻击，窃取cookie内容，这样就增加了cookie的安全性，即便是这样，也不要将重要信息存入cookie。
          6、Secure：当这个属性设置为true时，此cookie只会在https和ssl等安全协议下传输

         LocalStorage（本地存储）
         html5的新方法
         存储没有数量限制，大概在5MB
         没有过期时间限制，关闭浏览器不会消失，默认生命周期是永久的，但是数据实际是存在浏览器的文件夹下，可能卸载浏览器就会删除。
         操作方法：
         获取键值：localStorage.getItem(“key”)
         设置键值：localStorage.setItem(“key”,”value”)
         清除键值：localStorage.removeItem(“key”)
         清除所有键值：localStorage.clear()
         
         sessionStorage（绘画存储）
         seesionStorage的数据不会跟随HTTP请求一起发送到服务器，只会在本地生效，并在关闭标签页后清除数据。
         不同的浏览器存储的上限也不一样，但大多数浏览器把上限限制在5MB以下
         seesionStorage的存储方式采用key、value的方式。value的值必须为字符串类型
         操作方法：
         获取键值：sessionStorage.getItem(“key”)
         设置键值：sessionStorage.setItem(“key”,”value”)
         清除键值：sessionStorage.removeItem(“key”)
         清除所有键值：sessionStorage.clear()
         
              `,

      difficulty: '★★',
    },
    {
      title: '说下浏览器的缓存策略？',
      type: 'javascript',
      result: `
         浏览器的缓存分为两种：协商缓存和强制缓存
         强制缓存：浏览器会将第一次请求的资源（js，css，image）等存放在内存中，当第二次请求资源不需要向服务端发送请求，直接从内存中获取。
         协商缓存：第一次请求返回资源和资源标志，第二次拿资源标志进行请求，如果资源更新则返回新的资源和资源标志，如果资源没有更新则返回304.
              `,

      difficulty: '★★★★',
    },
    {
      title: '说下缓存相关具体详细信息？',
      type: 'javascript',
      result: `
         什么是缓存：把不需要重新获取的内容再重新获取一次
         缓存的分类：
         服务器缓存(代理服务器缓存、CDN 缓存)，第三方缓存，浏览器缓存等。
         缓存的相关术语：

         缓存命中率：从缓存中得到数据的请求数与所有请求数的比率。理想状态是越高越好。
         过期内容：超过设置的有效时间，被标记为 '陈旧' 的内容。通常过期内容不能用于回复客户端的请求，必须重新向源服务器请求新的内容或者验证缓存的内容是否仍然可用。
         验证：验证缓存中的过期内容是否仍然有效，验证通过的话刷新过期时间或策略。
         失效：失效就是把内容从缓存中移除。当内容发生改变时就必须移除失效的内容。
         另： 浏览器缓存是代价最小的，因为浏览器缓存依赖的是客户端，而几乎不耗费服务器端的资源(极端情况下相当于纯静态页面)。
         
         缓存的作用：
         减少网络带宽消耗
         降低服务器压力
         减少网络延迟，加快页面打开速度

         详细：https://juejin.cn/post/7061588533214969892#heading-42
              `,

      difficulty: '★★★',
    },
    {
      title: 'hash路由和history路由的实现原理是？在部署方面有什么区别呢？',
      type: 'javascript',
      result: `
      url的表现形式：
        1、hash路由的url后面会有#号，比如：http://www.example.com/#/home。#号后面的值表示hash值，hash值不会传递给服务端，只会在浏览器中解析和处理。
        2、history路由的url没有#，同时http://www.example.com/home，同时这种路由的变化需要服务端和客户端同时支持。所有history路由在客户端需要配置404页面，防止服务端解析不到对应的url。

      实现原理：
        1、hash路由是利用window.location.hash属性实现路由的跳转，当hash值发生变化的时候就会触发hashchange事件，通过监听这个事件实现页面的无刷新跳转。同时兼容性较好。
        2、history路由的实现是通过html5中提供的history api实现路由的跳转。比如常见的方法有history.pushState()、history.replaceState()、用于增加和修改浏览器的历史记录栈。不会触发页面的跳转。同时通过监听popState可以用于监听用户点击浏览器的前进和后退的行为。

      部署方面：由于hash路由不会造成404 Not Found，所以客户端不需要部署404页面，而history会造成404所以需要对于不存在的地址，服务端返回404 Not Found，前端根据返回的404匹配到404页面。

      适用场景：一般对于SEO要求不高的后台系统建议使用hash路由，对于SEO相对要求较高，同时体验要求较高的电商系统或者新闻网站可以使用history。
              `,

      difficulty: '★★★',
    },
    {
      title: '什么是回流与重绘？',
      type: 'javascript',
      result: `
         总结：
         回流：当渲染树上的全部或者部分元素的几何信息需要发生改变的时候，这个过程叫做回流。
         重绘：重绘发生在分层完成之后进行，重绘不会改变元素的几何信息，比如改变颜色只会引起重新绘制。
         回流必将引起重绘，而重绘不一定会引起回流。
         回流何时发生：
         添加或者删除可见的DOM元素；
         元素位置改变；
         元素尺寸改变——边距、填充、边框、宽度和高度
         内容改变——比如文本改变或者图片大小改变而引起的计算值宽度和高度改变；
         页面渲染初始化；
         浏览器窗口尺寸改变——resize事件发生时；
              `,

      difficulty: '★★★★★',
    },
  ],
};
