const user = {
  id: 101,
  name: "Ravi",
  preferences: {
    theme: "dark",
    language: "en",
  },
};
let userCpy={...user};
// let userCpy=structuredClone(user);
userCpy.name="sanju"
userCpy.preferences.theme="light"
console.log("user",user)
console.log("userCpy",userCpy)
//since using shallow copy for a nested object
//both the data changed in user and userCpy
//but using deepcopy is the good choice