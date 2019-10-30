//new Hue({data:{})
//思路可以查看仓库中的MD文件

class Hue {
    constructor(options) {
        //如下的代码，只要是该类 被实例化了之后，里面的代码就会执行
        // 接收实例化对象之后传进来的值
        this.$options = options
        //接收穿进来的值的data属性
        this.data = options.data
        console.log(this.data)
        //遍历传进来的对象的data值,对$data进行观察监听
        this.observe(this.data)
    }

    //数据劫持，监听
    observe(data) {

        //如果实例化传进来的为空或者不是对象，返回空或者保存信息
        if (!data || typeof data !== "object") {
            return
        } else {//如果传进来是一个对象，就对对象中的每个属性，进行遍历，
            Object.keys(data).map(key => {
                console.log(key)
                //这里可以直接写defineProperty函数对每个属性进行监听定义属性也可以单独把这个函数封装起来有利于扩展
                this.defineReactive(data, key, data[key])
            })
        }
    }

    //封装的defineProperty属性劫持，监听和操作函数
    defineReactive(obj, key, value) {
        if (typeof value == "object") {//判断如果data里面还有对象，就递归在进行遍历
            console.log(value)
            this.observe(value)
        } else {
            const dep = new Dep()
            Object.defineProperty(obj, key, {
                get() {
                    //在实例一个watcher的时候。dep.target = watcher 然后watcher被推入到依赖的数组里面然后遍历并且执行update
                    //这个属性被读取一次，就要往里面推送一个watcher 所以这个要写在getter里面
                    if (dep.target) {
                        dep.addDep(dep.target)
                    }else{
                        console.log('watcher依赖实例化失败')
                    }
                    return value //拿到旧值
                },
                set(newValue) {
                    if (newValue == value) {
                        return
                    } else {
                        value = newValue
                        console.log(dep)//读取的属性在set里面设置的时候，就调用watcher的update方法
                        dep.notify()
                        console.log(`${key}属性=>${newValue}`)
                    }
                }
            })
        }

    }
}

//Dep接收劫持者的数据，管理发送通知给watcher
class Dep {
    constructor() {
        //这里是数组，存放若干个依赖（watcher）
        // 这个地方watcher是和属性相关的，假如说data中的一个属性，被使用了多少次，里面就有多少个关于这个属性的watcher
        //{{name}}{{name}}{{age}}这样的重复使用的情况下，里面有属于name属性的两个watcher,age就只有一个
        this.deps = []
    }

    //添加dep,收集依赖
    addDep(watcher) {
        this.deps.push(watcher)
    }

    //通知所有依赖去更新视图
    notify() {
        this.deps.map(watcher => {
            watcher.update()
        })
    }
}

//Watcher具体做具体更新
class watcher {
    constructor() {
        //将当前watcher的实例指定到Dep的静态属性target
        Dep.target = this
    }
    update() {
        console.log("属性更新了")
    }
}
