const marks=[78, 92, 35, 88, 40, 67]
 
//1. filter() marks ≥ 40 (pass marks)
const filterGreater_40=marks.filter((element)=>element>=40)
console.log(filterGreater_40)

//2. map() to add 5 grace marks to each student
const mapAdd_5=marks.map((element)=>element+5)
console.log(mapAdd_5)

//3. reduce() to find highest mark
const reduceFindHighestMark=marks.reduce((accumulator, element)=>accumulator>element?accumulator:element)
console.log(reduceFindHighestMark)

//4. find() first mark below 40
const firstMarkBelow_40=marks.find((element)=>element<40)
console.log(firstMarkBelow_40)

//5. findIndex() of mark 92
const findIndexOf_92=marks.findIndex((element)=>element==92)
console.log(findIndexOf_92)