/*CREATED BY SUNAYANA MITRA*/

///<reference path="./../../../../sys/types/node_modules/@types/node/index.d.ts" /> */
var nodeserv =function(){
    this.https = require('https');
    this.http = require('http');
    this.formidableMiddleware= require('./../../../../sys/node/node_modules/express-formidable');
    this.express= require('./../../../../sys/node/node_modules/express'); //function pointer
    this.bodyParser= require('./../../../../sys/node/node_modules/body-parser');
    this.file= require('fs');
    this.mongoconnector = require('./mongoConnector');
    this.mysqlconnector = require('./mysqlConnector');
    this.app= null;
    this.router= null;
    this.setting=null;
    this.host="";
    this.mongoconn=null;
    this.mysqlconn=null;
    this.initSetting= function(sett){
        this.setting = sett;
        this.host = sett.host;
        this.app = this.express();
        this.router = this.express.Router();
        this.app.use(this.express.json());//turn on json inside express
        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", this.host); // but be careful, you're opening yourself up to all sorts of things!
            //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type,If-Modified-Since');
            var _send = res.send;
            var sent = false;
            res.send = function(data){
              if(sent) return;
              _send.bind(res)(data);
              sent = true;
            };
            next();
        });
        this.app.use(this.bodyParser.json());
        this.app.use(this.bodyParser.urlencoded({ extended: true }));
    },
    this.startServer= function(callback,httpskey?){
        if(this.setting.protocol=="https"){
            //===============begin https==================
            this.https.createServer(httpskey,this.app)
              .listen(this.setting.port,(req,res)=>{
                  console.log(`listening to port ${this.setting.port}...`);
                  callback(this.setting.port);
              });
            //==================end https================================
        } else {
            /* --------------------begin http --------------------------  */
            this.http.createServer(this.app)
              .listen(this.setting.port,this.host, () =>{ 
                console.log(`listening to port ${this.setting.port}...`);
                callback(this.setting.port);
            });
                /*httpServer.setTimeout( 0);*/
            /*------------------end http---------------------------------------*/
        }
    },
    this.getMongoConnector= function(){
        if (typeof(this.mongoconn)  !== "object" || this.mongoconn==null) {
          this.mongoconn = new this.mongoconnector.MongoDBConnector(this.setting.mongo.connector);
        }
        return this.mongoconn;
    }
    this.getMySQLConnector= function(req,callback){
        if (typeof(this.mysqlconn)  !== "object" || this.mysqlconn==null) {
          this.mysqlconn = new this.mysqlconnector.MySQLConnector();
          req.spec = {conntr: this.mysqlconn,db:this.setting.mysql};
        }
        callback(req);
    }
    this.setMongoDBRoutes= function(req,callback,code?){
          let connspc =  this.setting.mongo.routes[code];
          let conntr = this.getMongoConnector(connspc);
          if(code) {
            conntr.tryMongoconnect(connspc,(db)=>{
                  req.spec = {conntr: conntr,db:db};
                  callback(req);
              });
          } else {
                  req.spec = {conntr: conntr};
                  callback(req);
          }
    }
};

module.exports.nodeserv = nodeserv;
