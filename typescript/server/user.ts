const usrexpress = require('./../../../../sys/node/node_modules/express');
const usrrouter = usrexpress.Router();

/*this is an example of a POST call coming in to the server that results in finding things in the collection_name collection with filter */
usrrouter.post("/*",(req,res)=>{
	const conntr = req.spec.conntr, db = req.spec.db;
	conntr.findMongoRec(db,"usr1_t_zrole",(ret)=>{
		console.log("user result  >> ",req.url,req.body,ret.resp);
	},{/*filter*/},{/*options*/});
});
/*this is an example of a MySQL POST call coming in to the server that results in finding results from database defined in mysql_db_connection based on select statements */
usrrouter.post("/*",(req,res)=>{ 
	const conntr = req.spec.conntr, db = req.spec.db;
	conntr.mysqlQuery(db["mysql_db_connection"],`select * from table_name where fieldname= 'value' ;`,(err,ret,flds)=>{
		console.log(req.url,req.body,ret)
	})
});
module.exports.usrrouter = usrrouter;