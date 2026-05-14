1.generate package.json// npm init -y ->1."type":"module",2."main":"server.js"
2.create express server.
3.install mongoose and connect to mongodb.
-mongodb native driver.
-mongoose ODM tool. 4.  
 -create user.
-read all users.
-read a user by id.
-update user by id.
-delete user by id.

5.create schema and model of the resourse (user).
6.create userAPI and Define routes.

### User authentication(login)

-> submit credentials and get token

req---->public routes (can be accessed by anyone).
req---->middileware--->protected routes(can be accessed by authenticated users only).
=> by default every route is public we have to make them protected based on our requirement.

->
we can store token in a variable for cleaniness but have to follow HTTP rules
/
@cookieToken = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

### read all users
GET http://localhost:2005/user-api/users
Cookie: token={{cookieToken}} /

### token

never store a token in local storage or session storage or cookie.
else get attacks from xss or csrf

Make the following routes protected
-Read Users & Products
-Read User & product by id
-update user & product
-Delete User $ product


### userApi.js/get.userApp-->.findOne({email:emailOfUser}).populate("cart.product)
//populate methood is an extention for findOne gives product details to instead of only productId.