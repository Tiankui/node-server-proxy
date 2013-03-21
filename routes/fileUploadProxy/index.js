module.exports = function (server) {
    server.addListener('request', function (request, response) {
        if (request.url == '/upload') {
            var serverReqOpts = {
                host: '10.46.173.120',
                port: 8080,
                path: '/portal/index/uploadPhoto.do',
                method: 'POST',
                headers: request.headers
            };

            var serverReq = http.request(serverReqOpts, function (serverRes) {
                console.log('STATUS: ' + serverRes.statusCode);
                console.log('HEADERS: ' + JSON.stringify(serverRes.headers));
                serverRes.setEncoding('utf8');
                var serverResData = "";
                serverRes.on('data', function (chunk) {
                    serverResData += chunk;

                });
                serverRes.on('end', function (chunk) {
                    console.log(serverResData);
                });


            });


            request.addListener('data', function (data) {
                serverReq.write(data);
                console.log(request.path)
            });
            request.addListener('end', function () {
                serverReq.end();
                console.log(request.path)
            });
        }
    });
}
