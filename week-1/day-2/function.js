// fun returning another func
let test=function()
{
    return function()
    {
        return 10
    }
}
let result=test()
console.log(result())


//create game
let createGAme=function(level,playeName)
{
    console.log(`hello ${playeName}, you are at level ${level}`)
}
createGAme(1,"mahesh")


// same as   to create multipe level to single user
let game=function(player){
    return function(lev){
        console.log(`hello ${player}, you are at level${lev}`)
    }
}
let levels=game("mahi")
levels(2)
levels(5)
let level1s=game("vyshu")
level1s(4)
level1s(6)