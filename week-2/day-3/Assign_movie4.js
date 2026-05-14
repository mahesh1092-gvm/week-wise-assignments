const movies = [
  { id: 1, title: "Inception", genre: "Sci-Fi", rating: 8.8 },
  { id: 2, title: "Joker", genre: "Drama", rating: 8.4 },
  { id: 3, title: "Avengers", genre: "Action", rating: 8.0 },
  { id: 4, title: "Interstellar", genre: "Sci-Fi", rating: 8.6 }
];
// 1. filter() only "Sci-Fi" movies
const filterSciFi=movies.filter((sciFi)=>sciFi.genre=="Sci-Fi")
console.log(filterSciFi)

//2. map() to return:"Inception (8.8)"
const returnMoviesAndRating=movies.map((moviesRating)=>moviesRating.title+" "+moviesRating.rating)
console.log(returnMoviesAndRating)

// const returnInception=movies.map((inceptionMovie)=>{
//   if(inceptionMovie.title=="Inception"){
//     return inceptionMovie.title+" "+inceptionMovie.rating
//   }
// })
// console.log(returnInception)

//3. reduce() to find average movie rating
const sumRating=movies.reduce((ratingPre,ratingPost)=>ratingPre+ratingPost.rating,0)
console.log(sumRating/movies.length)


//4. find() movie "Joker"
const findJoker=movies.find((joker)=>joker.title=="Joker")
console.log(findJoker)

//5. findIndex() of "Avengers"
const findAvengersIndex=movies.findIndex((avengersIndex)=>avengersIndex.title=="Avengers")
console.log(findAvengersIndex)