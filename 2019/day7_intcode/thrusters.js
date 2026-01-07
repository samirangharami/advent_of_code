import { permutations } from "jsr:@std/collections";

const add = (num1, num2) => num1 + num2;
const mul = (num1, num2) => num1 * num2;
const operations = { 1: add, 2: mul };
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

const performOpCode5And6 = (codes, opCode, parameter1, parameter2, index) => {
  const fullOpCode = opCode.toString().padStart(4, "0");

  const addressToJump = (fullOpCode[0] === "0")
    ? codes[parameter2]
    : parameter2;
  const numtoCheck = (fullOpCode[1] === "0") ? codes[parameter1] : parameter1;

  if (fullOpCode.at(-1) === "5") {
    return numtoCheck !== 0 ? addressToJump - 2 : index + 1;
  }

  if (fullOpCode.at(-1) === "6") {
    return numtoCheck === 0 ? addressToJump - 2 : index + 1;
  }
};

const performOpCode7And8 = (
  codes,
  opCode,
  parameter1,
  parameter2,
  parameter3,
) => {
  const fullOpCode = (opCode.toString()).padStart(5, "0");

  const num2 = (fullOpCode[1] === "0") ? codes[parameter2] : parameter2;
  const num1 = (fullOpCode[2] === "0") ? codes[parameter1] : parameter1;

  if (fullOpCode.at(-1) === "7") codes[parameter3] = num1 < num2 ? 1 : 0;
  if (fullOpCode.at(-1) === "8") codes[parameter3] = num1 === num2 ? 1 : 0;
};

const programAlarm = (program, phaseSetting, input, startingIndex = 0) => {
  const codes = program.split(",").map((code) => parseInt(code));

  let count = 0;
  for (let index = startingIndex; index < codes.length; index += 2) {
    const opCode = codes[index];
    const parameter1 = codes[index + 1];
    const parameter2 = codes[index + 2];
    const parameter3 = codes[index + 3];

    if ((opCode % 10 === 1) || (opCode % 10 === 2)) {
      performOpCode1And2(codes, opCode, parameter1, parameter2, parameter3);
      index += 2;
    }
    if ((opCode % 10 === 5) || (opCode % 10 === 6)) {
      index = performOpCode5And6(codes, opCode, parameter1, parameter2, index);
    }
    if ((opCode % 10 === 7) || (opCode % 10 === 8)) {
      performOpCode7And8(codes, opCode, parameter1, parameter2, parameter3);
      index += 2;
    }

    if (opCode === 4) {
      return { output: codes[parameter1], index: index + 1 };
    }
    if (opCode === 3) {
      codes[parameter1] = count === 0 ? phaseSetting : input;
      count++;
    }
    if (opCode === 99) break;
  }
};

const phaseSettingCombinations = permutations([5, 6, 7, 8, 9]);

// const software = Deno.readTextFileSync("input.txt");
const software =
  `3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10`;

const outputs = phaseSettingCombinations.map((phaseSettings) => {
  const input = [];
  let count = 0;
  for (let index = 0; index < phaseSettings.length; index++) {
    if (count) {
      input.push(
        programAlarm(software, phaseSettings[index], input[index - 1].output),
      );
    } else {
      input.push(programAlarm(software, phaseSettings[index], 0));
      count++;
    }
  }
  return input;
});
console.log(outputs);

const highestOutput = outputs.reduce((largestOutput, CurrOutput, i) => {
  if (CurrOutput[4].output > outputs[largestOutput][4].output) return i;
}, 0);

// console.log(`highest o/p index - ${highestOutput} highest - ${outputs[highestOutput]}`);

// const outputsAfterLoop = phaseSettingCombinationsInLoop.map((phaseSettings) => {
//   const input = [];

//   for (let index = 0; index < phaseSettings.length; index++) {
//     input.push(
//       programAlarm(software, phaseSettings[index], outputs[index].output),
//     );
//   }

//   return input;
// });

// console.log(outputsAfterLoop.toSorted((a, b) => b - a)[0]);
