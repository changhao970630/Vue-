### 知识要点
- Vue工作机制 是怎样的？
    + new Vue()之后，Vue会调用进行初始化，初始化生命周期,事件，props,methods,data,computed,&watch,其中最重要的是通过「Object.defineProperty」设置"setter","getter",用来实现响应式以及依赖
    1. 初始化方法 $mount 
    2. compile()
        - parse 使用正则解析template中的vue指令v-xxx 等等行程语法树
        - optimize 标记一些静态节点，用作后面的性能优化，在diff的时候直接略过
        - generate 把第一部分生成的AST转换为渲染函数  render function
- Vue的响应原理 是怎样的？
- 依赖收集，追踪 是怎样做到的的？
- 编译compile 实现编译器

##### Vue源码是一个基于flow的一个JavaScript的代码检查工具
