let testarray=[10,20,30]
// dynamic insertion
    //end
    /*
    testarray.push(10) // add to array at end...... we can also push multiple itema(45,556,56)
    console.log(testarray)
    //start
    testarray.unshift(90)// add to array at start...... we can also push multiple itema(45,556,56)
     console.log(testarray)
     // in b/w( it is index based insertion)
     */
     testarray.splice(2,0,120) // here 2 is index we are inserting and 0 is no of elemnts deleting and 120 is elemt inserting
     console.log(testarray)
