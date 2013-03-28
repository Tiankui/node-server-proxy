module.exports = {
    MODE: 'pro',//RD:RD开发模式，所有请求返回JSON至浏览器||FE：FE开发模式，使用静态json数据渲染模板||DEV
    LISTEN_PORT: 3000,
    SESSION_SECRET_KEY: 'secret',
    SERVER: {
        HOST: '10.46.173.120',
        PORT: 8080
    },
    REDIS: {
        HOST: '172.22.234.189',
        PORT: 6379
    }
}