const mysqlpromise = require('./../../../../sys/node/node_modules/promise-mysql');
class MySQLConnector {
    connlst;
    constructor() {
        this.connlst = [];
    }
    getMySqlConn(connction, callback) {
        var err = [];
        if (this.connlst[connction.database]) {
            callback(this.connlst[connction.database], null);
        }
        else {
            mysqlpromise.createConnection({
                host: connction.host,
                user: connction.user,
                password: connction.passwrd,
                database: connction.database
            }).then((conn) => {
                this.connlst[connction.database] = conn;
                callback(this.connlst[connction.database], null);
            }).catch((error) => {
                callback(this.connlst[connction.database], error);
            });
        }
    }
    mysqlQuery(connction, selstr, callback) {
        this.getMySqlConn(connction, (conn, err) => {
            if (err)
                return;
            conn.query(selstr, (err, rows, fields) => {
                if (err)
                    return;
                callback(err, rows, fields);
            });
        });
    }
    mysqlDynQuery(db, selstr, valueobj, callback) {
        this.getMySqlConn(db, (conn, err) => {
            if (err)
                return console.log(err);
            conn.query(selstr, valueobj, function (err, rows, fields) {
                if (err)
                    return;
                callback(err, rows, fields);
            });
        });
    }
    selectAddlimit(selectstr, offset, orderby = "", rowsperpage = -1, pagenum = 1) {
        let query = selectstr;
        query += (orderby != "") ? orderby : "";
        if (rowsperpage > -1) {
            offset = (pagenum - 1) * rowsperpage;
            query += ` LIMIT ${offset}, ${rowsperpage}; `;
        }
        return query;
    }
    setDynSql(sql, data, dupflag, data2) {
        if (!dupflag || dupflag == '')
            dupflag = 'N';
        var outstmt = '';
        var setp = sql.toLowerCase().indexOf("set");
        var whrep = sql.toLowerCase().indexOf("where");
        var dupp = sql.toLowerCase().indexOf("on duplicate key");
        if (setp != -1) { // found
            var stmt = sql.substring(0, setp);
            var typ = 'insert';
            if (stmt.toLowerCase().indexOf("update") != -1) {
                typ = 'update';
            }
            if (typ == 'insert') {
                var keyik = Object.keys(data);
                var lenik = keyik.length, cntik = 1;
                outstmt += stmt + " ( ";
                keyik.forEach(function (keyi1) {
                    outstmt += keyi1;
                    if (cntik < lenik)
                        outstmt += ",";
                    cntik++;
                });
                var keyiv = Object.keys(data);
                var leniv = keyiv.length, cntiv = 1;
                outstmt += " ) values ( ";
                keyiv.forEach(function (keyi2) {
                    if (typeof data[keyi2] == 'string') {
                        outstmt += "'" + data[keyi2] + "'";
                    }
                    else if (typeof data[keyi2] == 'object') { //COMLIBdb.Json.checkJson(data[keyi2])) {
                        if (data[keyi2] == null) {
                            outstmt += data[keyi2];
                        }
                        else {
                            outstmt += "'" + JSON.stringify(data[keyi2]) + "'";
                        }
                    }
                    else {
                        outstmt += data[keyi2];
                    }
                    if (cntiv < leniv)
                        outstmt += ",";
                    cntiv++;
                });
                outstmt += " ) ";
                if (dupflag != 'N') {
                    if (dupflag.toLowerCase() == 's') {
                        var dups = sql.substring(dupp);
                        outstmt += ' ' + dups + ";";
                    }
                }
            }
            if (typ == 'update' || dupflag.toLowerCase() == 'v') {
                if (dupflag.toLowerCase() == 'v') {
                    var dd = sql.toLowerCase().indexOf("on duplicate");
                    var rest = sql.substring(dd);
                    var setp2 = rest.toLowerCase().indexOf("set");
                    var stmt2 = rest.substring(setp2);
                    var cpy = rest.substring(0, setp2);
                    //var setp3 = rest.toLowerCase().indexOf("set");
                    //var stmt3 = rest.substring(setp3+1);
                    var data = data2;
                    //outstmt +=cpy + " set ";
                    outstmt += " on duplicate key update ";
                }
                else {
                    outstmt += stmt + " set ";
                }
                var keyu = Object.keys(data);
                var lenu = keyu.length, cntu = 1;
                keyu.forEach(function (keyu1) {
                    if (typeof data[keyu1] == 'string') {
                        outstmt += keyu1 + "='" + data[keyu1] + "'";
                    }
                    else if (typeof data[keyu1] == 'object') { //COMLIBdb.Json.checkJson(data[keyu1])){
                        if (data[keyu1] == null) {
                            outstmt += keyu1 + "=" + data[keyu1];
                        }
                        else {
                            outstmt += keyu1 + "='" + JSON.stringify(data[keyu1]) + "'";
                        }
                    }
                    else {
                        outstmt += keyu1 + "=" + data[keyu1];
                    }
                    if (cntu < lenu)
                        outstmt += ",";
                    cntu++;
                });
                if (whrep != -1 && dupflag.toLowerCase() != 'v') {
                    var whre = sql.substring(whrep);
                    outstmt += ' ' + whre + ";";
                }
                else {
                    outstmt += ";";
                }
            }
            if (typ != 'update' && dupflag.toLowerCase() == 'n') {
                outstmt += ";";
            }
        }
        return outstmt;
    }
}
module.exports.MySQLConnector = MySQLConnector;
