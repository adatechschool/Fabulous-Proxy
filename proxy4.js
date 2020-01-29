function handleResponse(response)
{
   var body = ''

   // Cet événement arrive lorsqu'on reçoit de la donnée de la part du serveur
   // Cette donnée est potentiellement un morceau du corps de la page, donc pour
   // avoir tout le corps on a ajoute son contenu à 'body'
   response.on ("data", function (morceau) { body += (String(morceau)); });

   // Cet événement est appelé lorsque le traitement est terminé. Normalement on
   // a réussi à récupérer tout le corps de la page donc on l'affiche.
   response.on ("end", function () { console.log(body); })
}

function handleRequest(browser_request, browser_response)
{
    var browser_url = url.parse(browser_request.url, true);
    console.log(browser_url);

    // documentation des options : 
    // https://nodejs.org/api/http.html#http_http_request_options_callback
    var options =
    {
      hostname: browser_request.headers["host"],
      port: browser_url.port || 80,
      path: browser_url.path,
      method: browser_request.method,
      headers: browser_request.headers
    };
    
    console.log (options)

    // http.request nous permet de nous connecter au side demandé. La fonction
    // "handleResponse" est appelée lors de la réception de la réponse
    // Voir : https://nodejs.org/api/http.html#http_http_request_options_callback
    var proxy_request = http.request(options, handleResponse);

    // La requête est effectivement envoyée lorsqu'on appelle end()
    proxy_request.end()
}

// On crée un nouveau serveur, la fonction "handleRequest" est appelée lorsqu'un
// client se connecte.
// Voir : https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener
http.createServer(handleRequest).listen(2000);
