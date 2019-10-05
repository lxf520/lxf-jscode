const http = require('http');
console.log(http);


let httpServer = http.createServer((request,response) => {
    response.end('hello world')
})

httpServer.listen('3000','127.0.0.1',() => {
    console.log('服务器开启，开始监听3000端口');
})