const isWithinPermitted = (largerSet, adjacent) => {
  const numberOfAdjacent = [...largerSet.toString()].filter((num) =>
    num === adjacent.toString()
  );
  return numberOfAdjacent.length === 2;
};

const hasAdjacentEqual = (passWord) => {
  let lastDigit = Infinity;
  let toBeChecked = passWord;
  let adjacentAreAcceptable = false;

  while (toBeChecked > 0) {
    const currDigit = toBeChecked % 10;
    if (currDigit === lastDigit && isWithinPermitted(passWord, currDigit)) {
      adjacentAreAcceptable = true;
    }
    lastDigit = currDigit;
    toBeChecked = Math.floor(toBeChecked / 10);
  }
  
  return adjacentAreAcceptable;
};

const isValid = (password) => {
  return (password + "" === [...password + ""].toSorted().join("")) &&
    hasAdjacentEqual(password);
};

const validPasswords = ({ rangeStart, rangeEnd }) => {
  let count = 0;
  for (let passWord = rangeStart; passWord <= rangeEnd; passWord++) {
    if (isValid(passWord)) count++;
  }
  return count;
};

const range = "387638-919123".split("-").map((x) => parseInt(x));

console.log(validPasswords({ rangeStart: range[0], rangeEnd: range[1] }));
