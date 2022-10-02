### Overview

For server applications that are stateless and transactional, a serverless architecuture is an excellent hosting option as compared to a full-blown NodeJS or .NETCore server. For this walkthrough, I am presenting the ability to create a RESTFUL api that connects to a backend database and hosting for static assets like files/images with a Vercel serverless.

### Initial steps.

1. npm init and create a new project.
2. Create vercel.json file to handle CORS.
3. Setup .env file using dotenv like a normal nodejs application.
4. Create an /api folder where all endpoints will go. The key requirement is that the endpoint will be determined by the folder structure. All endpoints shall be placed under the /api folder.

The key requirement is to put any endpoint js file into the api folder. 1 file per endpoint and it can handle GET/POST verbs. each endpoint will be in /api/xxx. Environment variables must be configured on the vercel project settings webpage.

### Setup Vercel on your computer

1. npm i -g vercel => the first time you run this, there is a wizard to follow.
2. vercel => push to staging area for testing.
3. vercel --prod => push to production
4. ! development tip. during development, run your application locally using vercel dev

### CRUD endpoints used against a mongo-db database

| endpoint                      | notes                      |
| ----------------------------- | -------------------------- |
| GET api/cxkm/products         | get a list of all products |
| GET api/cxkm/products/{id}    | get a product by id        |
| PUT api/cxkm/products/{id}    | update the product by id   |
| DELETE api/cxkm/products/{id} | delete the product by id   |
| POST api/cxkm/products        | create a new product       |

To acheive this endpoint design, here is the associated folder structure. Please take special note of the 2 files under products. This is needed because

- api
  - cxkm
    - products
      - [productId].js [used for GET/DELETE/PUT
      - products.js. [used for GET(all)/POST

### Serving out static resources

There are instances where you want to have an endpoint to just get a static resource like an image. Vercel handles this by having you put all our resources under a public directory. You can then access the resource with GET /resources/images/blah.png

example folder structure

- public
  - resources
    - images
      - laser.png
      - gloves.png
      - bio.png
      - ...

### Reading local files

Yes you can use local files. In my example, I created a \_files folder and accessed it using fs package from article-service.js. You can just access the files normally using node-fs.

|                                   |                     |
| --------------------------------- | ------------------- |
| GET /api/cxkm/articles/{language} | get data from files |

Required file structure

- api
  - cxkm
    - articles
      - [language].js
      -

### CORS

This is a catch all CORS to get things going but obviously you would want to becareful to prevent unauthorized usage but good enough for a demo.

1. Create a vercel.json file with the following entry in the root of the project.
<pre>
	{
		"headers": [
			{ 
				"source": "/api/(.*)",
				"headers": [ 
					{ "key": "Access-Control-Allow-Credentials", "value": "true" },
					{ "key": "Access-Control-Allow-Origin", "value": "*" },
					{ "key": "Access-Control-Allow-Methods", "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
					{ "key": "Access-Control-Allow-Headers", "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
				] }
		]
	}
</pre>
