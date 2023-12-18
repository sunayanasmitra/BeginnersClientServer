const ndserv = require('./nodeserv').nodeserv;
/*these are the configuration settings you can set for your server of choice*/
const serv_settings = {
    "port": 5000,
    "protocol": "https",
    "dbtype": "MONGO",
    "host": "https://localhost",
    "baseuri": "/serverapi/",
    "mongo": {
        "connector": "mongodb://localhost:27017",
        "routes": {
            "user": { "host": "localhost", "port": 27017, "database": "enc_user1" },
            "comment": { "host": "localhost", "port": 27017, "database": "enc_sys" }
        }
    },
    "mysql": {
        "sys": { "host": "localhost", "database": "enc_sys", "user": "sreejon", "passwrd": "kolkata1" },
        "user1": { "host": "localhost", "database": "enc_user1", "user": "sreejon", "passwrd": "FAPZWwh7vls7Jpw+CyNu1A^^" },
    }
};
let nsrv = new ndserv;
nsrv.initSetting(serv_settings);
/* set the server key and certificate for HTTPS here*/
const httpskey = {
    key: nsrv.file.readFileSync("c:/apache24/conf/emilieu.key"),
    cert: nsrv.file.readFileSync("c:/apache24/conf/emilieu.cert")
};
nsrv.startServer((port) => {
    console.log("starting Node.js server >>>> ", port);
}, httpskey);
/*set the actions that happen to each of the databases that were labeled above change
the names and add according to what you would like to change (visit the example JS
files associated with the databases above to see an example of what they do)*/
/* route to different processes (begin) ----- */
const usr = require("./user");
const comm = require("./comment");
// route to user and comment process using MongoDB connectivity
nsrv.app.use(serv_settings.baseuri + "user", function (req, res, next) {
    nsrv.setMongoDBRoutes(req, (req) => {
        next();
    }, "user");
}, usr.usrrouter);
nsrv.app.use(serv_settings.baseuri + "comment", function (req, res, next) {
    nsrv.setMongoDBRoutes(req, (req) => {
        next();
    }, "comment");
}, comm.commrouter);
// route to user and comment process using MYSQL connectivity
nsrv.app.use(serv_settings.baseuri + "user", function (req, res, next) {
    nsrv.getMySQLConnector(req, (req) => {
        next();
    });
}, usr.usrrouter);
nsrv.app.use(serv_settings.baseuri + "comment", function (req, res, next) {
    nsrv.getMySQLConnector(req, (req) => {
        next();
    });
}, comm.commrouter);
/* route to different processes (end) ----- */
//let tst = new comm.testcls();
//tst.testfunc();
/* direct call without routing  --------- DO NOT DELETE -------
    nsrv.app.post(serv_settings.baseuri+"*',(req,res) =>{
        console.log(req.url,req.body)

    });
*/
