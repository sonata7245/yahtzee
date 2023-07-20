
function rollDie(){
    return Math.floor(Math.random() * 6) +1
}

function calcScore(dieValues, desc, id){
  if(id <= 6){
    let values = dieValues.filter(val => val === id);
    return calc(values);
  } else if(id <= 12){
    return 0
  } else {
    return 99
  }


      function calc(values) {
        const initialValue = 0;
        return values.reduce((accumulator, currentValue) => accumulator + currentValue,
        initialValue
         );
      }
    }

export {rollDie, calcScore}





/** const counter = diceArr.reduce((acc, o) => {
  acc[o.randomNum] = acc[o.randomNum] + 1 || 1;
  return acc
}, {})

const isFourOfAKind = Object.values(counter).includes(4);
console.log(isFourOfAKind)



const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue
);

console.log(sumWithInitial);
// Expected output: 10


github copilot X

smart actions
Logi Options+ */