function handleResponse(response)
{
   var body = ''

   response.on ("data", function (morceau) { body += (String(morceau)); });
   response.on ("end", function () { console.log(body); })
}

function handleRequest(browser_request, browser_response)
{
    var browser_url = url.parse(browser_request.url, true);
    console.log(browser_url);
    
    var options =
    {
      hostname: browser_request.headers["host"],
      port: browser_url.port || 80,
      path: browser_url.path,
      method: browser_request.method,
      headers: browser_request.headers
    };
    
    console.log (options)

    var proxy_request = http.request(options, handleResponse);
    proxy_request.end()
}

http.createServer(handleRequest).listen(2000);
