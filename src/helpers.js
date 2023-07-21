
function rollDie(){
    return Math.floor(Math.random() * 6) +1
}

function isOfKind(values, kind) {
  for(let i = 0; i < values.length; i++){
  if(values[i] >= kind){
    return true;
  }
}
}

function isFullHouse(checkSimilar){
  console.log(Object.values(checkSimilar))
  return((Object.values(checkSimilar).includes(3) && Object.values(checkSimilar).includes(2)) ||  (Object.values(checkSimilar).includes(2) && Object.values(checkSimilar).includes(4)) || (Object.values(checkSimilar).includes(5)))
  }

function isSmallStraight(dieValues){
  return((dieValues.includes(1) && dieValues.includes(2) && dieValues.includes(3) && dieValues.includes(4)) || (dieValues.includes(2) && dieValues.includes(3) && dieValues.includes(4) && dieValues.includes(5)) || (dieValues.includes(3) && dieValues.includes(4) && dieValues.includes(5) && dieValues.includes(6)))
}

function isLargeStraight(dieValues){
  return((dieValues.includes(1) && dieValues.includes(2) && dieValues.includes(3) && dieValues.includes(4) && dieValues.includes(5)) || (dieValues.includes(2) && dieValues.includes(3) && dieValues.includes(4) && dieValues.includes(5) && dieValues.includes(6)))
}

function groupSimilar(dieValues){
  return dieValues.reduce((cnt, cur) => (cnt[cur] = cnt[cur] + 1 || 1, cnt), {});
}

function calcScore(dieValues, desc, id){
  if(id <= 6){
    let values = dieValues.filter(val => val === id);
    return calc(values);
  } else if(id <= 12) {
    let checkSimilar
    let values
    console.log(id)
    switch(id) {
      case 7: 
        checkSimilar = groupSimilar(dieValues)
        values = Object.values(checkSimilar)
        if (isOfKind(values, 3)){
          return calc(dieValues)
        }else{return 0}
      case 8: 
        checkSimilar = groupSimilar(dieValues)
        values = Object.values(checkSimilar)
        if (isOfKind(values, 4)){
          return calc(dieValues)
        }else{return 0}
      case 9:
        checkSimilar = groupSimilar(dieValues)
        if (isFullHouse(checkSimilar)){
          return 25
        }else{return 0}
      case 10:
        if (isSmallStraight(dieValues)){
          return 30
        }else{return 0}
      case 11:
        if (isLargeStraight(dieValues)){
          return 40
        }else{return 0}
      case 12:
        checkSimilar = groupSimilar(dieValues)
        values = Object.values(checkSimilar)
        if (isOfKind(values, 5)){
          return 50
        }else{return 0}
      default:
        break;
    }
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