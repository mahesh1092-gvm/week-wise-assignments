console.log("OTP Sent Successfully")
let seconds=10;
let intervalId=setInterval(()=>{
  seconds--;
  console.log(`wait for ${seconds}'s`)
  if(seconds==0){
    console.log("Resend OTP")
    clearInterval(intervalId)
  }
},1000)