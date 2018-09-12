module.exports = function check(str, bracketsConfig) {
  const flattedArray = [].concat(...bracketsConfig);
  const openingBrackets = flattedArray.filter((value, index, array) => index % 2 === 0);
  const closingBrackets = flattedArray.filter((value, index, array) => index % 2 === 1);

  let opened = openingBrackets.includes(str[0]) ? true: false;
  let count = openingBrackets.includes(str[0]) ? 1: -1;
  let openedTypes = [];
  openedTypes.push(openingBrackets.indexOf(str[0]));

  for (let index = 1; index < str.length; index++) {
    if(!opened && count === -1) return false; // if first bracket is closing

    if(!opened && count === 0 && openingBrackets.includes(str[index])){
      opened = true;
      count++;
      openedTypes.push(openingBrackets.indexOf(str[index]));
      continue;
    }

    if(opened && openingBrackets.includes(str[index])) {
      const last = openedTypes.pop();
      if(closingBrackets.includes(str[index]) && last === closingBrackets.indexOf(str[index])){
        count--;
        
        if (count === 0) opened = false;
        continue;
      }
      openedTypes.push(last);
      count++;
      openedTypes.push(openingBrackets.indexOf(str[index]));
      continue;
    }



    if(opened && closingBrackets.includes(str[index])) {
      const last = openedTypes.pop();
      if (closingBrackets.indexOf(str[index]) === last) {
        count--;
      } else return false;
      
      if (count === 0) opened = false;
    }
   

  }

  return !count && !opened;
}