
const { MongoClient } = require('./../../../../sys/node/node_modules/mongodb');


class MongoDBConnector {
  mongoDBlist:any[];
  mongoHost:any[];
  connectorstr:string;
  constructor(connectorstr){ 
      this.mongoDBlist=[];
      this.mongoHost=[];
      this.connectorstr = connectorstr;
  }
  tryMongoconnect(connction,callback){
      const url = this.connectorstr;
      if(!this.mongoHost[connction.host]){ // host not connected.
          let client = new MongoClient(url);
          try{
              client.connect()
              .then((conn)=>{
                  this.mongoHost[connction.host] = client;
                  this.mongoDBlist[connction.database] = this.mongoHost[connction.host].db(connction.database);
                  callback(this.mongoDBlist[connction.database]);
              }).catch((err)=>{
                  callback(null);
              });
          } catch (err){
              console.log(err);
              callback(null);
          }
      } else{ // host connected already, get database
            this.mongoDBlist[connction.database] = this.mongoHost[connction.host].db(connction.database);
            callback(this.mongoDBlist[connction.database]);
      }
  }
  mongoClose(host){
      if(this.mongoHost[host]) this.mongoHost[host].close();
      this.mongoHost[host] = null;
  }
  getMongoCollection(db,coll){
    return db.collection(coll);
  }
  async findMongoRec(db:any,monColl:string,callback,filter?,options?){ 
      if(!filter) filter ={};//if(!options) options ={};
        let coll = db.collection(monColl);
        try {
          await coll.find(filter,options).toArray()
          .then((result)=>{
            callback({"resp":result,"err":null});
          }).catch((err)=>{
              callback({"resp":[],"err":err});
          });
        } catch(err){
            callback({"resp":[],"err":err});
        }
  }
  mongoColl(db:any,monColl:string,callback){
      callback(db.collection(monColl));
  }
  async addMongoRec(db:any,monColl:string,docArr,callback,options?){ 
        let ret:any = {acknowledged: false};if(!options) options={};
        if(!Array.isArray(docArr)){
            let errdesc = "ERROR : Data sent is not an array.";
            callback({"resp":[],"err":errdesc});
        } else {
              let coll = await db.collection(monColl);
              try{
                await coll.insertMany(docArr,options)
                .then((result)=>{
                    let rett = Object.assign(ret,result);
                    callback({"resp":rett,"err":null});
                }).catch((err)=>{
                    callback({"resp":[],"err":err});
                });
              } catch(err){
                callback({"resp":[],"err":err});
              }
        }
  }
  async addIndex(db:any,monColl:string,indx,callback,options?){
      if(!options) options={};let ret:any = {acknowledged: false};
          let coll = await db.collection(monColl);
          try{
              await coll.createIndex(indx,options)
              .then((result)=>{
                let rett = Object.assign(ret,result);
                callback({"resp":rett,"err":null});
              }).catch((err)=>{
                  callback({"resp":[],"err":err});
              });
          } catch(err){
            callback({"resp":[],"err":err});
          }
  }
  async updateMongoRec(db:any,monColl:string,key,upDoc,callback,options?){
          let coll = await db.collection(monColl);
          try{
            await coll.updateMany(key,upDoc,options)
            .then((result)=>{
                callback({"resp":result,"err":null});
            }).catch((err)=>{
                callback({"resp":[],"err":err});
            });
          } catch(err){
            callback({"resp":[],"err":err});
          }
  }
  async deleteMongoRec(db:any,monColl:string,callback,filter?,options?){
      if(!filter) filter ={};
        let coll = await db.collection(monColl);
        try{
          let res = await coll.deleteMany(filter,options)
          .then((result)=>{
            callback(result);
            callback({"resp":result,"err":null});
          }).catch((err)=>{
              callback({"resp":[],"err":err});
          });
        } catch(err){
            callback({"resp":[],"err":err});
        }
  }    
}
module.exports.MongoDBConnector = MongoDBConnector;

