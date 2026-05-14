Blog App backend
---APIs--
i. user API
in user API add read artiicles and add comment to the article
use verify token to make sure it is user or not
ii. common APi
some common APIs like register, login,logout, so that every user and author perform same operations
iii. Author API
create Apis like to write a article, read their own articles, make changes [edit] the articles, soft delete the article(not permanent delete)
iv. Admin API
here the admin can block the articles , activate the articles, block users and activate...

---Config---
here we use cloudinary to store the images 
we use multer to get the files, images in forms

--middlewares--
we use verify token.To know
Authentication: Confirms that the user is logged in by checking  a valid JWT token exists.
provides..Security: Prevents unauthorized users from reading, editing, or deleting sensitive data.
so that we no need to No way to check if a token is valid or expired 

--models--
i. Article model
createthe commentSchema that defines each comment with a required user reference and text.
The articleSchema consists of articles with author, title, category, content etc... and an array of  comments,
Finally, ArticleModel is created from the schema by taking giving  a Mongoose model
ii. user model
The userSchema defines user details like name, email (unique), password, role (USER, AUTHOR, ADMIN), profile image
It enforces validation rules (required fields, unique email, role restrictions)

.env
here it store port number,database url and also the secret key.....
.env helps for the security

server
first create an Express server,  also enables CORS for specific frontend backend communiation, uses cookie-parser for handling cookies, and express.json() for parsing JSON request 
next Connect to MongoDB using Mongoose with process.env.DB_URL, and starts the server on the configured port.
Now use some Error Handling: Includes middleware for invalid paths (404) and detailed error handling for validation errors, cast errors, and duplicate key errors.....
