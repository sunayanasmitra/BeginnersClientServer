const commexpress = require('./../../../../sys/node/node_modules/express');
const commrouter = commexpress.Router();

/*this is an example of a MONGODB POST call coming in to the server that results in finding all results from the collection_name collection*/
commrouter.post("/*",(req,res)=>{
	const conntr = req.spec.conntr,db = req.spec.db;
	conntr.findMongoRec(db,"collection_name",(ret)=>{
		console.log(req.url,req.body,ret.resp);
	},{/*filter*/},{/*options*/})
});
/*this is an example of a MySQL POST call coming in to the server that results in finding results from database defined in mysql_db_connection based on select statements */
commrouter.post("/*",(req,res)=>{ 
	const conntr = req.spec.conntr, db = req.spec.db;
	conntr.mysqlQuery(db["mysql_db_connection"],`select * from table_name where fieldname= 'value' ;`,(err,ret,flds)=>{
		console.log(req.url,req.body,ret)
	})
});

module.exports.commrouter = commrouter;