const transactions = [
  { id: 1, type: "credit", amount: 5000 },
  { id: 2, type: "debit", amount: 2000 },
  { id: 3, type: "credit", amount: 10000 },
  { id: 4, type: "debit", amount: 3000 }
];

// 1. filter() all credit transactions
const filterCredits=transactions.filter((credit)=>credit.type=="credit")
console.log(filterCredits)

// 2. map() to extract only transaction amounts
const transactionAmounts=transactions.map((amount)=>amount.amount)
console.log(transactionAmounts)

// 3. reduce() to calculate final account balance
const finalAccountBalance=transactions.reduce((preBalance,postBalance)=>preBalance+postBalance.amount,0)
console.log(finalAccountBalance)

// 4. find() the first debit transaction
const findFirstDebit=transactions.find((firstDebit)=>firstDebit.type=="debit")
console.log(findFirstDebit)

// 5. findIndex() of transaction with amount 10000
const find10000Index=transactions.findIndex((indexOf10000)=>indexOf10000.amount==10000)
console.log(find10000Index)