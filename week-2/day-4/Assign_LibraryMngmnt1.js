class Book{
  title;
  author;
  pages;
  isAvailable=true;
  constructor(title,author,pages,isAvailable){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.isAvailable=isAvailable;
  }
  borrow(){
    return this.isAvailable=false;
  }
  returnBook(){
    return this.isAvailable=true;
  }
  getInfo(){
    console.log(`The ${this.title} by ${this.author} (${this.pages} pages)`)
    return `The ${this.title} by ${this.author} (${this.pages} pages)`
  }
  isLongBook(){
    if(this.pages>300){
      return true;
    }
    else{
      return false;
    }
  }
}
let book1=new Book("Harry Potter","J.K Rowling",1024,true)
let book2=new Book("A song of Ice and Fire","GOT's author",900,true)
let book3=new Book("Farheniet","farhenhiet's Author",324,true)
let book4=new Book("book4","author4",450,true)
let book5=new Book("book5","author5",700,true)
//1.displaying info of all books
book1.getInfo()
book2.getInfo()
book3.getInfo()
book4.getInfo()
book5.getInfo()

//2.borrow 2 books and show their availability status
book1.borrow()
console.log("Is book",book1.title," available: ",book1.isAvailable)
book2.borrow()
console.log("Is book",book2.title," available: ",book2.isAvailable)

// //3.return 1 book and show availability
book1.returnBook()//return book1
console.log("Is book",book1.title," available: ",book1.isAvailable)
console.log("Is book",book2.title," available: ",book2.isAvailable)

//4.Count how many books are "long books" (more than 300 pages)
//lets create array of objects for better manipulations
const booksArray=[book1, book2, book3, book4, book5]
let count=0
booksArray.filter((ele)=>ele.pages>300?count++:count=count+0)
console.log(count)


//5. List all available books
for(let avail in booksArray){
  if(booksArray[avail].isAvailable==true){
    console.log(booksArray[avail].title)//since book1 and 2 borrowed but only 1 returned that means we only have 4
  }
}
