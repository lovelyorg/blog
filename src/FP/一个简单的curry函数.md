写一个简单的 curry 函数

思路:

- 接受一个函数 a 作为参数, 返回一个函数 b
- 调用 b 时:
  - 如果参数长度大于 a 的参数, 调用 a
  - 如果参数长度小于 a 的参数, 继续返回 curry 函数, 同时要记录当前参数

```js
// 版本1:

// 第一步, 参数长度大于 a 的参数长度时, 直接调用 a
function curry(a) {
  return function () {
    if (arguments.length >= a.length) return a(...arguments)
    // ---
  }
}

// 第二步, 参数长度小于 a 的参数, 继续返回 curry 函数, 同时要记录当前参数
function curry(a, param = []) {
  return function () {
    console.log(param, arguments)
    let _param = [...param, ...arguments]
    if (_param.length >= a.length) return a(..._param)
    return curry(a, _param)
  }
}
```

其它可行方式

```js
// 版本2: 每次调用返回一个全新的对象
function curry(f) {
  return function () {
    let _arguments = [...arguments]
    if (typeof f === 'object') {
      _arguments = [...f.params, ...arguments]
      f = f.f
    }
    if (_arguments.length >= f.length) return f(..._arguments)
    return curry({ f, params: _arguments })
  }
}

// 版本3: 使用 bind 记录参数
function curry(a) {
  return function () {
    if (arguments.length >= a.length) return a(...arguments)
    return curry(a.bind(null, ...arguments))
  }
}
```

关于 [bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

测试

```js
function add(a, b) {
  return a + b
}
var cadd = curry(add)
console.log(cadd(1))
console.log(cadd(1))
console.log(cadd(1)(2))
console.log(cadd(1, 2))
console.log(cadd()(1, 2))

function map(f, arr) {
  return arr.map(f)
}
curry(map)((m) => m * 2)()([1, 2, 3])
```

```js
// 版本1 第一次是写成这样, 这种写法不行, 版本2 通过测试后无意间修正版本1
function curry(a, param = []) {
  return function () {
    param = [...param, ...arguments]
    // console.log(param)
    if (param.length >= a.length) return a(...param)
    return curry(a, param)
  }
}
```
