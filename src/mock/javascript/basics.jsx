const MyInstanceof = () => {
  function Animal() {}
  let dog = new Animal();
  function myInstanceof(obj, constructor) {
    // 确保传入的对象和构造函数都是有效的
    if (typeof obj !== 'object' || obj === null) {
      return false;
    }
    if (typeof constructor !== 'function') {
      throw new TypeError('Second argument must be a constructor');
    }
    // 获取对象的原型链
    let proto = obj.__proto__;
    // 遍历原型链，直到找到constructor.prototype或达到原型链的末尾
    while (true) {
      if (proto === null) {
        // 原型链结束，没有找到constructor.prototype
        return false;
      }
      if (proto === constructor.prototype) {
        // 找到constructor.prototype
        return true;
      }
      // 继续向上遍历原型链
      proto = proto.__proto__;
    }
  }
  // console.group('myInstanceof')
  // console.log(myInstanceof(dog, Animal))
  // console.log(myInstanceof(dog, Object))
  // console.log(myInstanceof(dog, Array))
  // console.log(myInstanceof(null, Animal))
  // console.log(myInstanceof({}, Animal))
  // console.groupEnd()

  // console.group('instanceof')
  // console.log(dog instanceof Animal)
  // console.log(dog instanceof Object)
  // console.log(dog instanceof Array)
  // console.log(null instanceof Animal)
  // console.log({} instanceof Animal)
  // console.groupEnd()

  return <div>实现instanceof</div>;
};

export default {
  biggerTitle: '基础',
  type: 'javascript',
  items: [
    {
      title: '谈谈你对 this 理解？',
      result: `
      1.全局作用域下的普通函数中：this->window  
      2.全局对象中：this->window  
      3.定时器中：this->window  
      4.箭头函数中： this 指向外层函数，如果外层没有函数就指向 window
      5.构造函数中：this->当前实例化的对象  
      6.事件处理函数中：this->事件触发对象
      7.在 js 中一般理解就是谁调用这个 this 就指向谁
    `,

      difficulty: '★★',
    },
    {
      title: '字符串转数字的方法？',
      result: `
      第一种：Number()：将字符串转换成数字，如果含有英文返回 NAN。
      第二种：parseInt():将字符串转换成整数，如果含有字母只转换字母之前的数字。
      第三种：parseFloat():将字符串转换成小数。
      第四种：一元加号运算符+：类似于 Number()。
    `,

      difficulty: '★★',
    },
    {
      title: '== 和 === 的区别？',
      result: `
      两个等号会进行类型转换，然后再进行比较。例如：
      console.log(0 == false); // 输出 true  
      console.log('' == 0); // 输出 true
      三个等号是严格相等运算符，不会进行类型转换，直接比较类型和值，只要有一个不相等就返回 false。例如：
      console.log(0 === false); // 输出 false  
      console.log('' === 0); // 输出 false
    `,

      difficulty: '★★',
    },
    {
      title: 'document.write 和 innerHTMl 的区别？',
      result: `
      1、document.write 方法是向文档中添加 html 表达式，只能针对文档操作。而 innerHTML 是 DOM 元素的一个属性，用于元素中添加，修改，删除。
      2、document.write 的执行时机是在文档加载之后调用，会重写整个页面，而 inner.HTML 只是对于页面中的元素修改，不会影响其他元素。
      3、大多数情况下建议使用 inner.HTML。用法如下：

      var myStr = "<b>Hello, World!</b>"
      document.write(myStr)

      const div = document.getElementById("div")
      div.innerHTML = "<b>哈哈</b>"
    `,

      difficulty: '★★',
    },
    {
      title: '如何获取元素的位置？',
      result: `
      let box = document.getElementsByClassName("container")
      // 获取元素距离其 offsetParent 的上边框的距离
      console.log(box.item(0).offsetTop)
      // 获取元素距离其 offsetParent 的左边框的距离
      console.log(box.item(0).offsetLeft)
    `,

      difficulty: '★★',
    },
    {
      title: '如何绑定事件，如何解除事件？',
      result: `
      原生js中
      // 绑定点击事件  
      button.addEventListener('click', handleClick);  
      // 解绑点击事件  
      button.removeEventListener('click', handleClick);
    `,

      difficulty: '★★',
    },
    {
      title: 'null 和 undefined 的区别？',
      result: `
      1、null 表示的是没有对象，即该处不应该有值。undefined 表示没有被定义的，表示缺少的值。
      2、null 使用 typeof 转换的数据类型是的 Object，undefined 使用 typeOf 转换的数据类型是 undefiend。
      3、使用两个等号比较 null 和 undefined 的时候是相等的，如果使用严格相等去比较是不相等的。 
    `,

      difficulty: '★★',
    },
    {
      title: '什么情况下会返回 undefined？',
      result: `
      第一种：使用 let 或者 var 声明了一个变量但是没有赋值，会返回 undefined。
      第二种：调用函数时应提供参数，但是没有提供。
      第三种：对象中的属性没有赋值的时候。
      第四种：函数没有返回值，或者返回值是空的。
    `,

      difficulty: '★★',
    },
    {
      title: 'js 的数据类型有哪些？如何判断 js 的数据类型？',
      result: `
      JS 中有七种简单数据类型：undefined、null、boolean、string、number、symbol、bigInt。
      引用类型：object
      ES6 中新增了一种 Symbol 。这种类型的对象永不相等，即始创建的时候传入相同的值，可以解决属性名冲突的问题，做为标记。
      谷歌 67 版本中还出现了一种 bigInt。是指安全存储、操作大整数。（但是很多人不把这个做为一个类型）。
      存储区别：基本数据类型存储在栈中，复杂数据类型存放在堆中，栈中只保存引用地址。

      判断js的数据类型；
        1、判断基础数据类型的方法主要使用typeof，但是值得注意的是typeof无法判断null，null会直接返回object，还有就是如果当前的复杂数据类型是object或者array，function等都会返回object。
        2、判断复杂数据类型一般使用的是instanceof，instanceof的原理是通过查找该对象的原型链上的原型进行判断。
        3、通用型的数据类型判断方式:object.proptype.toSting.call()。
    `,

      difficulty: '★★',
    },
    {
      title: '如何手动实现 instanceof 方法？',
      result: `
      介绍instanceof方法： instanceof方法用于检测当前对象是否存在另一个构造函数的原型链的原型上，存在返回ture，不存在返回false。
      案例：console.log([] instanceof Array) // true
      实现思路：
        1.定一个函数，并接受两个参数，第一个参数是需要验证的对象，第二个参数是构造函数。
        2.在函数中对传入的参数进行检验，确保传入的是对象和构造函数。
        3.拿到对象的原型链(__proto__),使用while遍历该对象的原型链，直到该对象的原型链和构造函数的显示原型（prototype）相等返回ture，不等则返回false。
    `,
      com: <MyInstanceof />,
      difficulty: '★★',
    },
    {
      title: '简单介绍下 symbol？',
      result: `
      Symbol 是 es6 中新增的一种基础数据类型，特点是通过 Symbol 函数生成唯一的 Symbol 值。
      Symbol 中可以接收一个参数，这个参数是对于 Symbol 的一种描述，两个相同的 Symbol 也是不相等的。
      Symbol 可以作为属性名使用，同时用 for..in 不会遍历 Symbol 属性名。
              
        // 两个相同的Symbol并不相等
        let name1 = Symbol("小明");
        let name2 = Symbol("小明");

        // Symbol可以作为属性名
        let age = Symbol("age");
        let person = {
          [age]: 12,
        };
    `,

      difficulty: '★★',
    },
    {
      title: '例举 3 种强制类型转换和 2 种隐式类型转换?',
      result: `
      强制：parseInt()、parseFloat()、Number()
      隐式：== 、console.log()、alert()
    `,

      difficulty: '★★',
    },
    {
      title: 'js 中处理异步的几种方式？',
      result: `
      事件监听，
      回调函数，
      Promise.then()，
      Promsie.catch()，
      Promise.finally()，
      Promise.all()，
      Promise.race()，
      async/await，
      ajax 请求，
      import 函数，
      setTimeout，
      setInterval，
      script 标签，
      setImmediate(Node.js 环境)，
      Object.observe，
      MutationObserver。
    `,

      difficulty: '★★',
    },
  ],
};
