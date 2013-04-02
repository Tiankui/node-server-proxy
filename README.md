# Family-Node-Server


### 概述
- 本项目前端使用`bai`作为编译合并工具.[BAI](https://github.com/Tiankui/bai)
- server使用express框架
 
### 工程开始步骤
- `git clone`下项目
- 进入项目目录运行`npm install`安装所需依赖
- 再运行`npm link bai`(要求全局安装bai,`npm install -g bai`)
- `node app`运行项目,`bai
run`运行前端监控编译.(建议终端打开两个窗口,此任务不适合`bg`方式使用)
- 项目依赖nodejs,bai

##### 工程目录
- app view和所有静态资源
- dist 为编译,合并后的less文件和js文件
- lib 将要引入的js库,运行`bai build`将生成对应的`.min.js`文件(此文件夹建议存放未压缩的完整文件)
- engine `bai`的配置文件目录,一般不需要修改
- route `express`的routes,按照功能分级,和app/views文件夹一一对应关系,便于维护.

### 前端开发规范
- 打开两个终端(或dos,分别运行`bai run`(开始自动编译压缩合并)和`node app fe`(开启FE工作模式))
- `id`统一为JS钩子所用,代码格式为`J_xxx`
- `class`使用中斜杠作为模块划分`.main-nav`
- 尽量使用less的`mixin`,一旦发现模式复用性比较高,请做成组件放入`css/global`
- 全站级css配置写入`app/css/global`
- css的压缩规则是文件夹下的文件作为键名,2级目录下方的是相关的模块,文件夹和键文件为了便于表示,请一一对应,键文件内使用`@import`引入文件
- js文件的压缩规则和css不同,文件夹下面的每个目录压缩合并为一个文件.
- views里引用的assets文件格式
  - `static/js/**`为JS文件
  - `static/css/**`为CSS文件
  - `lib/js/**.min`为压缩有的库文件
  - `static/img/**`为图片文件(由于图片压缩的人为性原因,此次编译工具去除了图片自动压缩功能)
- views 使用ejs模版,
  - 文档([ejs](https://github.com/Tiankui/ejs-doc))
  - 添加的filters列表查看工程目录下的`ejsFilterAddon.js`文件,以后添加自定义文件也在这里
- 上线前运行`bai build`(把开发模式下的dist文件替换为压缩文件)

##### 贡献者
- [Tiankui](https://github.com/Tiankui)
- [PumpingNylon](https://github.com/magicsuny) 

