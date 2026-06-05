import IntcodeComputer from "./intcodeComputer.js";

const input = Deno.readTextFileSync("input.txt");

const parseProgram = (rawInput) => rawInput.trim().split(",").map(Number);

const getPermutations = (arr) => {
  if (arr.length === 1) return [arr];

  const permutations = [];

  arr.forEach((value, index) => {
    const remaining = [...arr.slice(0, index), ...arr.slice(index + 1)];

    const subPermutations = getPermutations(remaining);

    subPermutations.forEach((perm) => {
      permutations.push([value, ...perm]);
    });
  });

  return permutations;
};

const runAmplifierChain = (program, phases) => {
  let signal = 0;

  phases.forEach((phase) => {
    const computer = new IntcodeComputer(program, [phase, signal]);

    signal = computer.runUntilOutput();
  });

  return signal;
};

const findMaxThrusterSignal = (program) => {
  const permutations = getPermutations([0, 1, 2, 3, 4]);

  let maxSignal = 0;

  permutations.forEach((phases) => {
    const signal = runAmplifierChain(program, phases);

    maxSignal = Math.max(maxSignal, signal);
  });

  return maxSignal;
};

const createAmplifiers = (
  program,
  phases,
) =>
  phases.map(
    (phase) => new IntcodeComputer(program, [phase]),
  );

const runFeedbackLoop = (
  program,
  phases,
) => {
  const amplifiers = createAmplifiers(
    program,
    phases,
  );

  let signal = 0;
  let lastOutput = 0;
  let index = 0;

  while (!amplifiers[4].halted) {
    const amplifier = amplifiers[index];

    amplifier.inputs.push(signal);

    const output = amplifier.runUntilOutput();

    if (output !== null) {
      signal = output;

      if (index === 4) {
        lastOutput = output;
      }
    }

    index = (index + 1) % 5;
  }

  return lastOutput;
};

const findMaxFeedbackSignal = (program) => {
  const permutations = getPermutations([
    5,
    6,
    7,
    8,
    9,
  ]);

  let maxSignal = 0;

  permutations.forEach((phases) => {
    const signal = runFeedbackLoop(program, phases);

    maxSignal = Math.max(maxSignal, signal);
  });

  return maxSignal;
};

const printResults = (part1, part2) => {
  console.log("Part 1:", part1);
  console.log("Part 2:", part2);
};

const main = () => {
  const program = parseProgram(input);

  const part1 = findMaxThrusterSignal(program);

  const part2 = findMaxFeedbackSignal(program);

  printResults(part1, part2);
};

main();
