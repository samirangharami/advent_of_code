const performOperation = (operation, num1, num2) => operation(num1, num2);

const add = (num1, num2) => num1 + num2;

const mul = (num1, num2) => num1 * num2;

const programAlarm = (program) => {
  const codes = program.split(",").map((code) => parseInt(code));
  codes[1] = 12;
  codes[2] = 2;
  for (let index = 0; index < codes.length; index += 4) {
    const opCode = codes[index];
    const num1 = codes[codes[index + 1]];
    const num2 = codes[codes[index + 2]];
    const storageIndex = codes[index + 3];
    
    if (opCode === 1) codes[storageIndex] = performOperation(add, num1, num2);
    if (opCode === 2) codes[storageIndex] = performOperation(mul, num1, num2);
    if (opCode === 99) break;
  }

  return codes[0];
};

console.log(programAlarm(Deno.readTextFileSync("input.txt")));