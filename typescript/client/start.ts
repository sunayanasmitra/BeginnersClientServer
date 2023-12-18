
/*imported files, you can add any additional ones you may need here*/
///<reference path="./../../../../sys/types/node_modules/@types/underscore/index.d.ts" />

///<reference path="./../../../../sys/types/node_modules/@types/handlebars/index.d.ts" />

///<reference path="./../../../../sys/types/node_modules/@types/jquery/index.d.ts" /> 
///<reference path="./../../../../sys/types/node_modules/@types/jqueryui/index.d.ts" />
///<reference path="./../../../../sys/types/node_modules/@types/backbone/index.d.ts" />
///<reference path="./../../../../sys/types/node_modules/@types/bootstrap/index.d.ts" />


///<reference path="./router.ts" />

/*this is a place for you to define your webpage's main settings, paths, host, etc.
change them as you see fit*/
const the_settings = {
    "maindiv" : "div_router_main",
    "proto": "https",
    "serverpath": ":5000/serverapi/",
    "host":"localhost",
    "pages":{
        "home":{"path":"/DEV/SARA/data/pages/testpage.html","id":"home"},
        "testpage":{"path":"/DEV/SARA/data/pages/testpage.html","id":"test"},
        "bizpage":{"path":"/DEV/SARA/data/pages/testpage.html","id":"business"}
    }
};

/*you may define the routes and route formats for each of your pages here
change as you see fit*/
const the_routes = {
    "": "indexPage",
    "/": "indexPage",
    "test/abcd/:val1/?:val2":"testPage",
    "test/:val1/?:val2":"testPage",
    "test/:val1/fixed/?:val2":"testPage",
    "business/:val1/?:val2":"bizPage"
};

/*here you may edit what happens on each page. You can write what is displayed on each page (plain text and HTML), request any
needed data from the route path, allow for the movement between pages, and more. You can change this according to your needs.*/
const the_funcs = {
    indexPage:()=>{
        the_util.displayPage("home",{"name":"Sara Mitra","some":"some other information"});
        the_util.requestData(the_settings.serverpath+'comment/coll1/1323','{"id":"fdfs"}',(res)=>{ //+'PUT/person/33445'
            console.log(res);
        },"POST",false);
        $("#gotest").click((e)=>{
            the_util.jumpToPage("test","");
        });
        $("#gobiz").click((e)=>{
            the_util.jumpToPage("business","fdfd");
        });
    },
    testPage:(val1,val2,val3)=>{
        if(!val2) val2 = "empty value...";
        the_util.displayPage("testpage",{"name":"Sudeshna","some":"something","other":val1+'===='+val2});
        $("#goindex").click((e)=>{
            the_util.jumpToPage("","");
        });
        $("#gobiz").click((e)=>{
            the_util.jumpToPage("business","xxxxxff");
        });        
    },
    bizPage:(val1,val2)=>{
        if(!val2) val2 = "0";    
        the_util.displayPage("bizpage",{"name":"Sudip","financial":val1+'===='+val2 +" dollars"}); 
        $("#goindex").click((e)=>{
            the_util.jumpToPage("","");
        });
        $("#gotest").click((e)=>{
            the_util.jumpToPage("test","ggsfssfsf");
        });        
    }
}

//DO NOT EDIT, creates the routes
const rout = the_util.getRouter(the_routes,the_funcs,the_settings); //new Router(the_routes,the_funcs);
