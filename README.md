### Step by Step

1.  Create vercel.json file to handle CORS.
2.  Create an api folder where all endpoints will go.
    Important to put any endpoint js file into the api folder. 1 file per endpoint and it can handle GET/POST verbs.
    each endpoint will be in /api/xxx
    Environment variables must be configured on the vercel project settings webpage.

## Setup Vercel on your computer

npm i -g vercel
vercel => the first time you run this, there is a wizard to follow.
vercel => push to staging area for testing.
vercel --prod => push to production

## End Points

To handle path segments like http://myserver:5555/cxkm/articles/:articleId
You create a folder structure like this,
api/cxkm/articles/[articleId].js => the [articleId] tells vercel that there is a parameter called articleId

## MongoDB-Mongoose access / Services

Not talking about this in detail but here is the general architecture.
The endpoints will be call into a service or controller which is saved under the services folder.
The models folder contains the MongoDB schema.

## Reading local json file in vercel serverless.

Yes you can use local files. In my example, I created a \_files folder and accessed it using fs package from article-service.js.

## publishing static assets.

https://vercel.com/knowledge/how-can-i-use-files-in-serverless-functions
You must create a root public folder and then everything is relative to this folder.
example: public/resources/images/blah.png
GET http://vercel-serverless/resources/images/blah.png => everything under public folder will be published.

## Push changes to Vercel.

vercel => push to staging area for testing. Use the staging area for your testing before committing to production.
vercel --prod => push to production
