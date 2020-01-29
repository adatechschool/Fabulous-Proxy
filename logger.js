var url = "http://mylogger.io/log";

function log(message)
{
    //envoie une requete http
    console.log(message);
}

module.exports.log = log;
console.log(module.exports); 