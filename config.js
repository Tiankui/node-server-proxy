module.exports = {
    MODE: 'dev',//RD:RD开发模式，所有请求返回JSON至浏览器||FE：FE开发模式，使用静态json数据渲染模板||DEV
    LISTEN_PORT: 3000,
    SESSION_SECRET_KEY: 'secret',
    SERVER: {
        HOST: '10.46.173.120',
        PORT: 8080
    },
    REDIS: {
        HOST: 'bb-art-ite07.bb01.baidu.com',
        PORT: 8300
    }
};
