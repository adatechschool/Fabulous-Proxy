app.get('/*', function(clientRequest, clientResponse) {
    var options = { 
      hostname: clientRequest.headers["host"],
      port: 80, 
      path: clientRequest.url,
      method: 'GET'
    };  
  
    var googleRequest = http.request(options, function(response) { 
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
  
    googleRequest.end();
  });    