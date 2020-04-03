
import * as proxy from 'express-http-proxy';
import * as express from 'express';

let app : express.Application = express();

app.use('/', proxy('www.google.com', {
  proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
    if(proxyReqOpts.headers != undefined){
      if(proxyReqOpts.headers['xgrafeaskey'] == 'hola'
       && proxyReqOpts.method == 'GET'){
         console.log("filtered")
        return proxyReqOpts;
       }
    }
    // It will force a get request :p
    console.log("force get")
    proxyReqOpts.method = 'GET'
    return proxyReqOpts;
  }
}));

app.listen(3000,  () => {
  console.log('listening 3000');
});
