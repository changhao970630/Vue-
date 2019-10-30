//new Hue({data:{})


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

    defineReactive(obj, key, value) {
        if (typeof value == "object") {//判断如果data里面还有对象，就递归在进行遍历
            console.log(value)
            this.observe(value)
        } else {
            Object.defineProperty(obj, key, {
                get() {
                    return value //拿到旧值
                },
                set(newValue) {
                    if (newValue == value) {
                        return
                    } else {
                        value = newValue
                        console.log(`${key}属性=>${newValue}`)
                    }
                }
            })
        }

    }
}
