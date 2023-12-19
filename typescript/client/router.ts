/*CREATED BY SUNAYANA MITRA*/

///<reference path="./../../../../sys/types/node_modules/@types/handlebars/index.d.ts" />
///<reference path="./../../../../sys/types/node_modules/@types/jquery/index.d.ts" />

//DO NOT EDIT THIS FILE


function _t$(doc,id) {if(id=='') return null;return doc.getElementById(id);}
function _s$(id) {if(id=='')return null;return document.getElementById(id);}
/*
class Model {
	mod:string;
	constructor(){
		this.mod = "parent model";
	}
	getModelVal(){
		return this.mod;
	}
};
class View {
	vw:string;
	constructor(){
		this.vw = "parent view";
	}	
	getViewVal(){
		return this.vw;
	}
};*/

class Router {
	pthCopy:string[]; /* DO NOT DELETE.....*/
	prmCopy:any[]; /* DO NOT DELETE.....*/
	routes:any;
	functs:any;
		constructor(routes:any,functs:any){
			this.pthCopy=[]; /* DO NOT DELETE.....*/
			this.prmCopy=[]; /* DO NOT DELETE.....*/
			this.routes = routes;
			this.functs = functs;
		}
		/* (BEGIN) router function -----------------------------------------------*/
		parseRoutes(){ //routes
			for(var pattern in this.routes){
				let rutfunc = this.routes[pattern];
				if(pattern=="" || pattern=="/"){
					this.pthCopy["_blank_"]=rutfunc;
				} else {
					let pathsplit = pattern.split("/");
					var tmpcpy = pathsplit.map((x) => x);
					tmpcpy.shift();
					this.prmCopy[pathsplit[0]]=tmpcpy;
					this.pthCopy[pathsplit[0]]=rutfunc;
				}
			}
		}
		launchFunc(func,param,urlsplit){
			var ret:any[] =[],cnt=0,cnt1=0, ignoreprocess = 0,strtparam=0;
			if(!param || param.length==0) return;
			let diff =urlsplit.length - param.length;
			for(var i=0; i <param.length; i++){
				var prm = param[i];
				if(prm.slice(0,2) =="?:"){ //optional val
					strtparam=1;
					if(urlsplit[cnt+diff] && urlsplit[cnt+diff] !='undefined'){
						ret[cnt]= urlsplit[cnt+diff];
					} else {
						ret[cnt]= null;
					}
					ignoreprocess = 0;
				} else if(prm.slice(0,1) ==":"){ // : use as regular var
					strtparam = 1;
					if(urlsplit[cnt+diff] && urlsplit[cnt+diff] !='undefined'){
						ret[cnt]= urlsplit[cnt+diff]; if(ret[cnt]) ignoreprocess = 0;
					} else {
						ret[cnt]= prm.slice(1);//prm;
						console.log("mandatory parameter missing....",ret[cnt]);
						if(ret[cnt]) ignoreprocess = 1;
					}
				} else {// literal, but only matters if shows after parameters have started (else skipped)
					if(strtparam ==1){
						if(urlsplit[cnt+diff] && urlsplit[cnt+diff] !='undefined'){
							ret[cnt]= urlsplit[cnt+diff];
						} else {
							ret[cnt]= null;
						}
						ignoreprocess = 0;						
					}
				}
				cnt++;
			}
			if(ignoreprocess ==0) this.functs[func](...ret);
		}
		parseUrl(hsh){
			let url = hsh.slice(1) || '/';
			if(url=="" || url=="/"){
				var func = this.pthCopy["_blank_"];
				this.functs[func]();
			} else {
				let urlsplit = url.split("/");
				var func = this.pthCopy[urlsplit[0]];
				var param = this.prmCopy[urlsplit[0]]; 
				this.launchFunc(func,param,urlsplit);
			}
		}
		historyStart(){
			this.parseRoutes();
			window.onhashchange = evt => this.parseUrl(window.location.hash);
			window.onload = evt => this.parseUrl(window.location.hash);
			this.parseUrl(window.location.hash);
		}
		navigate(path,prm){
			path = "#"+path;
			if(prm.trigger){
				history.pushState({}, "", path);
				this.parseUrl(path);
			}
			if(prm.replace){
				history.replaceState({}, "", path);
			}
		}
		/* (END) router function -----------------------------------------------*/
};

var the_util = {
	rout:null,
	routes:null,
	functs:null,
	sett:null,
	util: {
		loadTemplateHandleFile: (url,data,func,tmplid?:string)=>{
			the_util.getFile(url,(thtml)=>{
				let htm='';
				if(tmplid){ //sub object in template file, defined by id
					let parser=new DOMParser();	var doc = parser.parseFromString(thtml, "text/html");
					htm = _t$(doc,tmplid).innerHTML;
				} else {
					htm =thtml;
				}
				the_util.util.loadTemplateHandleStream(htm,data,(fhtml)=>{
					func(fhtml);
				});
			},true);
		},  			
		loadTemplateHandleStream: (thtml,data,func)=>{
			let tmpl = Handlebars.compile(thtml);
			var someHtml = tmpl(data);
			func(someHtml);
		}
	},
	getRouter: function(routes,func,settings){
		if (typeof(this.rout)  !== "object" || this.rout==null) {
			this.rout = new Router(routes,func);
			this.sett = settings;
			this.rout.historyStart();
		  }
		  return this.rout;
	},
	getFile: function(url,succfunc,rel?:boolean,datatype?:string){
			let fullpath="";if(!datatype) datatype = 'text';
			if(rel){ //relative path
				fullpath = url;
			} else {
				const http = (this.sett.proto) ? 'https' : 'http';	
				fullpath = http+'://'+this.sett.host+'/'+url;
			}
			$.ajax({
				type:    "GET",
				url:     fullpath,
				dataType: datatype,
				async: false,
				success: function(text) {
					succfunc(text);
				},
				error:   function() {
					console.log("file not found");
					succfunc(null);
				}
			});
	},	
	displayPage: function(pagecode:string,param?:any){
		const pg = this.sett.pages[pagecode];if(!param) param={};
		the_util.util.loadTemplateHandleFile(pg.path,param,(htm)=>{
			$("#"+this.sett.maindiv).html(htm);
		},pg.id);
	},
	jumpToPage: function(restcode:string,param?:any){
		if(!param) param="";
		const pth = restcode+"/"+param;
		this.rout.navigate(pth,{trigger:true});
	},
	urlReplace: function(restcode:string,param?:any){
		if(!param) param="";
		const pth = restcode+"/"+param;
		this.rout.navigate(pth,{replace:true});
	},
	requestData: function(url,paramstr:string,succfunc,method?:string,rel?:boolean){
		let fullpath=""; if(!method) method = "POST";
		if(rel){ //relative path
			fullpath = url;
		} else {
			const http = (this.sett.proto) ? 'https' : 'http';	
			fullpath = http+'://'+this.sett.host+url;
		}
		let valid =the_util.verifyJson(paramstr);
		if(valid){
				let param = JSON.parse(paramstr);
				$.ajax({
					type: method,
					url: fullpath,
					data: param,
					/*dataType: "JSON",*/
					success: function(resultData) {
						succfunc(resultData);
					}
				});
		} else {
			console.log("error in Json format..")
		}
	},
	verifyJson: function(str){
           if (/^[\],:{}\s]*$/.test(str.replace(/\\["\\\/bfnrtu]/g, '@').
            replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
            replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {//the json is ok
                return true;
            } else{   
               console.log("the json format is not ok "); 
                return false;
            }
	}
};

window.onpopstate = function (event){
}