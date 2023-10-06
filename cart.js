// const prompt = require("prompt");
// console.log("Guess a number");                                                                                                                                                                                                                                                                                                                                                                                                                                                                           .....................................................................xss a number");
// prompt.start();
// function ask() {
//   prompt.get("guess_number", function (err,result) {
// if(err) {return;}
// let userInput = result.guess_number;
// let x = Math.floor((Math.random() * 11) );
// if(userInput == "exit")  {
//   prompt.end();
//  }
// if(userInput == x)  {
//   console.log("You have won!");
// ask();
// }  
// else { 
//   console.log("You have lost! the random number generated is " + x);
//   ask();
// }});
// }

// ask();
// let firstname = "abiola";
// let lastName = "kunle";
// let person = {
//   firstname,
//   lastName
// };
// console.log(person);



// const prompt = require("prompt");
// prompt.start();
// function standBy() {
// prompt.get("cartSimulator",  (err,res) => {
//   let userInput1 = res.cartSimulator;
//   const cart = {
//     cartArray: () => {[]},
//     addToCart: (item) => {
//       return this.cartArray.push(item);
//     },
//     removeFromCart: () => {
//       return this.addToCart.pop();
//     },
//     "show-items": () => {
      
//     },
//   length: () => {
//       return cartArray.length;
//   },
  
//   }
  
//   if (err) { return; }
//   else if (userInput1 == "add") {
//     console.log("what do you want to add ?");
//     cart.addToCart(userInput1);
//     standBy();
//     console.log('you have added ' + userInput1);
   
//   } else if (userInput1 == "remove") {
//         removeFromCart();
//         standBy();
//   }  else if (userInput1 == "show-items") {
//     let i = 0;
  
//   } else {
    
//   } 

// });


// }
// standBy();

const readLine = require('readline');
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.on('line', (line) => {

})