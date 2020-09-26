### dist打包完的页面，直接点击index.html可以运行

### 原生操作DOM
# DOM操作时间并不长，只是游览器渲染节点的时间长（又称不可交互时间长）
# 元素数量较小的时候虚拟DOM比较快（规模大的时候编译函数是很大的负担），但是当规模比较大的时候，原生DOM比较快


### 虚拟DOM
## 它是什么？
## 它有什么优点？
## 它有什么缺点？

## 它是什么？
一个能代表DOM树的对象，通常含有标签名、标签上的属性、事件监听和子元素们，以及其他的属性
# vue的虚拟DOM(对象表示)
const vNode ={
    type:'div',
    props:{
        class:'className',
        on:{
            click:() => {}
        }
    },
    children:[
        {type:'span',props:{},children:[]},
        {type:'span',props:{},children:[]}
    ]
}
# 如何得到虚拟DOM（结构）
Vue(只能通过render函数里得到createElement,经过createElement函数编译之后生成虚拟DOM的对象结构)
createElement(
    'div',
    {
        class:'className',
        on:{
            click:() => {}
        }
    },
    [
        createElement('span',{},'span1=>text'),
        createElement('span',{},'span2=>text2')
    ]
)
但是在vue一般写成（Vue Template）
<div class='className' @click='() => {}'>
    <span>span1-text</span>
    <span>span2-text</span>
</div>
通过vue-loader转为 h 的形式

## 它有什么优点？
# 减少DOM操作
虚拟DOM可以将多次操作合并为一次操作，比如你添加1000个节点，却是一个接着一个操作的（不是优化DOM操作，只是减少DOM操作的次数）
虚拟DOM借助DOM diff可以把多余的操作省掉，比如你添加1000个节点，其实只有10个是新增加的（减少DOM操作的范围）
# 跨平台
虚拟DOM（实际就是一个对象来表示节点元素）不仅可以变成DOM，还可以变成小程序、ios应用、安卓应用，因为虚拟DOM本质只是一个JS对象（Object表示节点元素）

## 它有什么缺点？
需要用额外的创建函数来创建虚拟DOM对象，如vue中使用 createElement，但可以通过vue-loader来简化写法
# 使用vue-loader的缺点
严重依赖打包工具,因为vue-loader是打包工具里面内置的，添加额外的构建过程

### DOM diff
## 它是什么？
是虚拟DOM的对比算法，就是一个函数，我们称之为patch

## DOM diff大概的逻辑
Tree diff
将新旧两棵树逐层对比，找出那些节点需要更新
如果节点是组件就看Component diff
如果节点是标签就看Element diff
# Component diff
如果节点是组件，就先看组件类型
类型不同直接删除（删除旧的）
类型相同只更新属性
然后深入组件做Tree diff(递归)

# Element diff
如果节点是原生标签，则看标签名
标签名不同直接替换，相同则只更新属性
然后进入标签后代做Tree diff（递归）


## 它有什么优点？
# 对应节点加上key之后（v-for中:key到底有什么用）
当生成虚拟DOM的时候，会重新排列节点顺序，新旧虚拟DOM会根据key进行对比，当删除一个树的左孩子的时候右孩子自动变成左孩子，如果没有key,diff算法新旧DOM对比就会拿之前
的左孩子和新的虚拟DOM的右孩子进行对比，看看发生什么变法，在进行相应的变化，但是你加上key之后，diff算法就会直接删除新的虚拟DOM的右孩子，只进行一步操作。
## 它有什么缺点？


### 手写DOM diff
# npm init -y => 创建package.json
# yarn add webpack webpack-cli webpack-dev-server html-webpack-plugin => 安装插件


# VUE-VDOM
