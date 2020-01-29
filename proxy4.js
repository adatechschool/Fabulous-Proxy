var sys = require("sys"),
    http = require("http"),
    url = require("url");

function nope(response)
{
    response.writeHead(404, "text/plain");
    response.end("erreur de numéro quatre-cent quatre");
}

function writeChunk(chunk, request)
{
    request.write(chunk); 
}

function handleRequest(browser_request, browser_response)
{
    var browser_url = url.parse(browser_request.url, true);
    // if(!browser_url.query || !browser_url.query.url) return nope(browser_response);
    var proxy_url = url.parse(browser_url.href);
    
    var proxy_client = http.createClient(proxy_url.port || 80, proxy_url.hostname);
    var proxy_request = proxy_client.request('GET', proxy_url.pathname || "/", {host : proxy_url.hostname});
    proxy_request.end();

    proxy_request.addListener('response', function(proxy_response)
    {
        browser_response.writeHead(proxy_response.statusCode,proxy_response.headers);
    });

    proxy_response.addListener('data', writeChunk(chunk, browser_response));

    proxy_response.addListener('end', function(){browser_response.end()});
}

http.createServer(handleRequest).listen(2000);
