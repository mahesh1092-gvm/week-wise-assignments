// make api request
fetch('https://jsonplaceholder.typicode.com/posts')
// .then(res=>console.log("res is",res))
// .catch(err=>console.log("err is",err))
.then(res=>res.json())
.then(postdata=>console.log(postdata))
.catch(err=>console.log("err is",err))