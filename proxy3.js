var http = require('http');

http.createServer(onRequest).listen(3000);

function onRequest(client_req, client_res) 
{
  var options = 
  {
    hostname: client_req.headers['host'],
    port: 80,
    path: client_req.url,
    method: client_req.method,
    headers: client_req.headers
  };

var request = http.request(options, function(response) { 
      var body = ''; 
  
      if (String(response.headers['content-type']).indexOf('text/html') !== -1) {
        response.on('data', function(chunk) {
          body += chunk;
        }); 
  
        response.on('end', function() {
          // Make changes to HTML files when they're done being read.
          body = body.replace(
            /<\/body>/, 
            '<p>DU COOOOOOOOOOOOOOODE</p>'
          );
  
          clientResponse.writeHead(response.statusCode, response.headers);
          clientResponse.end(body);
        }); 
      }   
      else {
        response.pipe(clientResponse, {
          end: true
        }); 
      }   
    }); 
  
    request.end();
  };    