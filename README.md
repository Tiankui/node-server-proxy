# Family-Node-Server


### 概述
- 本项目前端使用`bai`作为编译合并工具
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
  - lib 将要引入的js库,运行`bai
lib`将生成对应的`.min.js`文件(此文件夹建议存放未压缩的完整文件)
- engine `bai`的配置文件目录,一般不需要修改
- route
`express`的routes,按照功能分级,和app/views文件夹一一对应关系,便于维护.

##### 贡献者
- [PumpingNylon](https://github.com/magicsuny) 
- [Tiankui] (https://github.com/Tiankui)


