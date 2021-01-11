### 中文网描述

如果前后两次的值相同，useState 和 useReducer Hook 都会[放弃更新](https://react.docschina.org/docs/hooks-reference.html#bailing-out-of-a-state-update)。原地修改 state 并调用 setState 不会引起重新渲染。

### ...

通读时已经注意到这一点, 不过没点击`放弃更新`了解更多, 也没理解`原地修改`

React 使用 [Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description) 比较 setState 前后的 state

原地修改大概是指 pre.id = 2 这种修改属性值的操作, 这种修改引用未变, 所以 React 不会更新 UI

note: `放弃更新` 只是不更新 UI, state 的值还是会变化的
