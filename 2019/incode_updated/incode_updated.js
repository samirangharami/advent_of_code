const operations = { 1: add, 2: mul };
const add = (num1, num2) => num1 + num2;
const mul = (num1, num2) => num1 * num2;
const performOperation = (operation, num1, num2) => operation(num1, num2);

const performOpCode1And2 = (
  codes,
  opCode,
  parameter1,
  parameter2,
  parameter3,
) => {
  const fullOpCode = (opCode.toString()).padStart(5, "0");
  const num2 = (fullOpCode[1] === "0") ? codes[parameter2] : parameter2;
  const num1 = (fullOpCode[2] === "0") ? codes[parameter1] : parameter1;

  codes[parameter3] = performOperation(
    operations[fullOpCode.at(-1)],
    num1,
    num2,
  );
};

const programAlarm = (program) => {
  const codes = program.split(",").map((code) => parseInt(code));

  for (let index = 0; index < codes.length; index += 2) {
    const opCode = codes[index];
    const parameter1 = codes[index + 1];
    const parameter2 = codes[index + 2];
    const parameter3 = codes[index + 3];
    const addressIndexForInputAndOutput = codes[index + 1];

    if ((opCode % 10 === 1) || (opCode % 10 === 2)) {
      performOpCode1And2(codes, opCode, parameter1, parameter2, parameter3);
      index += 2;
    }

    if (opCode === 3) {
      codes[addressIndexForInputAndOutput] = parseInt(prompt("enter data"));
    }

    if (opCode === 4) console.log(codes[addressIndexForInputAndOutput]);
    if (opCode === 99) break;
  }
};

programAlarm(Deno.readTextFileSync("input.txt"));
