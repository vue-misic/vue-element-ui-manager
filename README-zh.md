
## Build Setup

```bash
# 管理后台的项目思路 
1.登录 (全局的, 单个路由独享的, 或者组件级的)
    如何让登录失效的用户重定向到Login,  以及登陆后跳转拦截
    使用的是 全局的路由的导航(router.beforeEach, router.afterEach)
    与之带来的问题是:
      记住参数或查询的改变并不会触发进入/离开的导航守卫。你可以通过观察 $route 对象来应对这些变化，或使用 beforeRouteUpdate 的组件内守卫。
2.路由权限
    通过登录(token)拿到权限,调用addRouter() 动态添加路由
3.数据的存储
    1. 使用vuex(用户和路由权限), 用户刷新会实时的更新路由权限(通过token请求接口获取)
    2.分模块存储store
        {
            getters,
            modlues: {
                app: {
                    namespaced: true,
                    state,
                    mutations,
                    action,
                    getters
                },
                user: {

                },
                promession: {

                }
            }
        }

# 克隆项目
git clone https://github.com/vue-misic/vue-element-ui-manager.git

# 安装依赖
npm install

# 启动服务
npm run dev
```


## 发布

```bash
# 构建测试环境
npm run build:fat

# 构建生产环境
npm run build:pro
```

## 其它

```bash

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```


