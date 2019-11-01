//用法  new Compile(el,vm) 接收元素el,vue实例vm
//单词 fragment 碎片
//appendChild() 方法可向节点的子节点列表的末尾添加新的子节点。
//如果文档树中已经存在了 newchild，它将从文档树中删除，然后重新插入它的新位置
//如果 newchild 是 DocumentFragment 节点，则不会直接插入它，而是把它的子节点按序插入当前节点的 childNodes[] 数组的末尾。
//使用 appendChild() 方法移除元素到另外一个元素。
class Compile {
    constructor(el, vm) {
        //接收要遍历的宿主节点
        this.el = document.querySelector(el)
        this.vm = vm
        //编译,遍历所有宿主节点中的子节点片段
        if (this.el) {
            // console.log(this.el)
            //转换节点中的内容为碎片
            this.fragment = this.fragmentInNode(this.el)
            //执行编译
            console.log(this.fragment)
            this.compile(this.fragment)
            //将编译完成的html追加到el
            this.el.appendChild(this.fragment)
        }
    }

    fragmentInNode(el) {//将宿主中的元素代码片段拿出来遍历
        //createDocumentFragment创建一个代码块
        const frag = document.createDocumentFragment()

        //将el中所有的子元素移动到frag中，剪切操作,旧的删去新的加上
        let child;
        while (child = el.firstChild) {
            frag.appendChild(child)
        }
        return frag
    }

    compile(el) {
        const childNodes = el.childNodes
        Array.from(childNodes).map(node => {
            if (this.isElement(node)) {//判断是不是元素节点
                console.log(`编译元素+${node.nodeName}`)

            } else if (this.isInterpolation(node)) {//判断是不是插值文本
                console.log(`编译文本${node.textContent}`)
                this.compileText(node)
            }
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })
    }

    compileText(node) {
        console.log(node)
        console.log(RegExp.$1)
        node.textContent = this.vm.data[RegExp.$1]
    }

    isElement(node) {//判断是不是元素节点
        return node.nodeType === 1
    }

    isInterpolation(node) {//判断是不是插值文本
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }
}
