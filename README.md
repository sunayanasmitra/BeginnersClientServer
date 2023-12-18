# BeginnersClientServer
The JavaScript web development framework in this repository is designed specifically for beginners, with limited knowledge or experience, who are eager to create their own RESTful website, as a single page application (SPA), quickly and add functionality and complexity incrementally as their need and experience grows. It provides a foundation for both client-side and server-side development and navigation options, allowing users to build interactive and dynamic websites with ease.

## Information on the Client
In our client framework, users have the capability to define a collection of functions dedicated to establishing a client-side routing system, without the burden of mastering intricate model-view architectures or specific class structures. Users start with an index HTML page, with single DIV object and a JavaScript page with RESTful route configuration, that maps to user defined functions. The client router will call user function logic as the REST path changes. That is all that is needed to get started. A set of helper functions will allow user to extend the functionality to display a page based on handlebar template, or jump to a page based on simple page configurations. As the complexity of code increases, the user will be able to migrate to a more robust model view architecture, based on their own comfort levels and development needs. A set of data helper functions can further extend functionality to allow user to connect to server and access data to create dynamic data driven application. With simple configuration options and client helper functions, users can submit server request and receive server response. There are helper functions that allow access to server files in text or JSON format too. 

Sample configuration options are provided below.

## Information on the Server
Server side connectivity will allow users to connect to server in various ways based on their specific need and comfort levels. We currently support Node.js connectivity with a MongoDB, and MySQL databases.  The server framework incorporates automatic connectors for database access, as well as, server side routing of processes. The automatic connectors encapsulate all configuration choices for Express and Node.js, and simplify the process of interacting with the database, making it more accessible for beginners. Users can easily perform common database operations, such as insert, update, fetch and delete (CRUD), without delving too deep into complex middleware and database connectivity, so that they can focus on building their functionality. The goal is to provide a user-friendly and efficient development environment that encourages experimentation and learning. A server side routing will allow user to redirect functionality based on processes.

Sample configuration options and code samples are provided below.

## How to Start
To use the tools provided in this framework, follow these steps after downloading the files from this repository:

1. Download and install Node.js and MongoDB (or MySQL). Visit https://nodejs.org/en for Node.js installation instructions. (Based on your database need you can select MySQL or MongoDB installations). The client side framework uses require.js, jquery and handlebar.js so it is important to download those as well.
2. Verify Node.js and npm installation:
```
node --version
npm --version
```
3. Navigate to the project directory and install dependencies (mongodb or mysql depending on which you choose to use):
```
npm install express mongodb mysql
```
Once these steps are completed, you can download and start using the framework according to your requirements. Examples provided below showcase ways to customize the framework based on your needs. **It is also important to note that users should only edit files in the build and config folders of the project.
**

In future versions, users may also have the option to use PHP connectivity. Instructions for downloading corresponding tools will be provided with this release. 

### Package Information
A typescript folder is provided with typescript files and the config folder to offers typescript configuration files. The typesscript file could be built using the following commands (the paths may need to be adjusted depending on your file location):
```
C:\...\config\client>tsc --module "amd" --outDir ./../../build/client
C:\...\config\server>tsc --module "commonjs" --outDir ./../../build/server
```

### Server Manipulation (using REST APIs)
User clones and modifies server.ts file. Once configured, user can user server.js file to start node server
example: nodemon server.js

In the server.ts file, users define server and database information in the serv_settings variable. For example:
```
const serv_settings = {
  "port":5000,
  "protocol":"https",
  "dbtype":"MONGO",
  "host":"https://localhost",
  "baseuri":"/serverapi/",
  "mongo":{
    "connector":"mongodb://localhost:27017"
  },
}; 
```
initSetting is a MUST for server framework to accept you settings and startServer is needed to start node server.

Please remember, set your own server key and certificate for HTTPS: (if you set https instead of http in protocal above).
```
const httpskey = {
    key: nsrv.file.readFileSync("c:/apache24/conf/example.key"),
    cert: nsrv.file.readFileSync("c:/apache24/conf/example.cert")
};
```
Add processes routing pages and router actions that might optionally add database connectivity based on the REST API passed to the server. For example:
```
const usr = require("./user").usrrouter;
nsrv.app.use(serv_settings.baseuri+"user", function (req, res, next) {
    nsrv.setMongoDBRoutes("user",req,(req)=>{
        next();
    })
},usr);
```
In an example user.js file the user creates, one can then assign the specific action to occur in the database. I have provided an example below of a situation within the user database where the result is finding all of the data in the user_role collection that have the name FRIEND. By following a similar format, users can complete various queries or database manipulation commands.
```
usrrouter.post("/*",(req,res)=>{
	console.log("came to user....");
	const conn = req.spec.conn, db = req.spec.db;
	conn.findMongoRec(db,"user_role",(ret)=>{
		console.log("user result  >> ",req.url,req.body,ret.resp);
	},{"name":"FRIEND"});//,filter?,options?
});
```

### Client Routing
User clones and modifies start.js file. In the start.ts file, all paths for packages and technologies used are defined at the top. The user can add to this list as they please.

Following this, the user will write their settings and the paths to their used files in the the_settings variable. An example of this is:
```
const the_settings = {
  "maindiv" : "div_router_main",
  "proto": "https",
  "serverpath": ":5000/serverapi/",
  "host":"localhost",
  "pages":{
    "home":{"path":"/homepage.html","id":"home"},
    "testpage":{"path":"/testpage.html","id":"test"},
    "bizpage":{"path":"/bizpage.html","id":"business"}
  }
};
```
Define associated paths of the URL you would like to see in the webpage in the the_routes variable. For example:
```
const the_routes = {
  "": "indexPage",
  "/": "indexPage",
  "test/abcd/:val1/?:val2":"testPage",
  "test/:val1/?:val2":"testPage",
  "business/:val1/?:val2":"bizPage"
};
```
In the the_funcs variable, define what happens within specific pages. For example:

```
indexPage:()=>{
  //what will be displayed on the page
  the_util.displayPage("home",{"page":"index","some":"some other information"});
  //this collects the information from the given URL
  the_util.requestData(the_settings.serverpath+'comment/coll1/1323','{"id":"fdfs"}',(res)=>{ //+'PUT/person/33445'
    console.log(res);
  },"POST",false);
  //the following code allows for the movement between various pages
  $("#gotest").click((e)=>{
    the_util.jumpToPage("test","");
  });
  $("#gobiz").click((e)=>{
    the_util.jumpToPage("business","fdfd");
  });
},
```
It is important to note that these variable names can be changed. As long as all of the variables above are passed into the router in the following line:
```
const rout = the_util.getRouter(the_routes,the_funcs,the_settings);
```
By strategically modifying the code in these sections, the user can tailor and craft their personalized client-side routing system for theur webpages. The primary focus shifts towards the creative aspect of the work, through designing the frontend graphics of the page.

## Future Updates
Overall, in future updates the overall framework will be cleaned up to be more visually friendly and easier to navigate for users. Outside of that, there are some additional updates expected to be added to both the client and the server.

### Client side
Client side model and view classes, with their helper functions, will be introduced and user will be able to extend their code to support a more robust model/view architecture.  Embeddable component options will be available in future releases, where user will be able to attach or detach full functional page components.

### Server side
The update will introduce support for PHP connectivity with the server, providing an alternative to Node.js. With these enhancements, users will gain the flexibility to choose the technology that best suits their preferences and project requirements. This strategic update empowers users with a diverse range of options, allowing them to tailor their development experience according to their specific needs.
