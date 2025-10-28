/* eslint-disable no-unused-expressions */

//flatten obj
export const flattenObj = (obj, parentKey, res = {}) => {
  for (let key in obj) {
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      flattenObj(obj[key], newKey, res);
    } else {
      res[newKey] = obj[key];
    }

  }
  return res;
}

// Input:  "Hello world from sriram"
// Output: "sriram from world Hello"
// eslint-disable-next-line no-unused-expressions

 export const reverseString=() =>{
  const input  = 'Hello world from Sriram';
  //console.log(input.split(' ').reverse().join().toString().replaceAll(',',' '));
 }

export const matchinParanthesis = () => {
  const input = '[[{}]]';
  const map = { '{': '}','[':']' };
  const stack = [];

  for (let char of input) {
    if (map[char]) {
      stack.push(char);
      console.log(stack)
    } else {
      if (stack.length === 0 || map[stack.pop()] !== char) return false;
    }
  }

  return stack.length === 0; // true if all matched
};

//console.log(matchinParanthesis()); // true