class IntcodeComputer {
  memory;
  inputs;
  pointer;
  halted;

  constructor(program, inputs = []) {
    this.memory = [...program];
    this.inputs = [...inputs];
    this.pointer = 0;
    this.halted = false;
  }

  getModes = (instruction) => [
    Math.floor(instruction / 100) % 10,
    Math.floor(instruction / 1000) % 10,
  ];

  getValue = (offset, mode) => {
    const value = this.memory[this.pointer + offset];

    return mode === 0 ? this.memory[value] : value;
  };

  writeValue = (offset, value) => {
    const address = this.memory[this.pointer + offset];

    this.memory[address] = value;
  };

  handleAdd = (modes) => {
    const result = this.getValue(1, modes[0]) + this.getValue(2, modes[1]);

    this.writeValue(3, result);
    this.pointer += 4;
  };

  handleMultiply = (modes) => {
    const result = this.getValue(1, modes[0]) * this.getValue(2, modes[1]);

    this.writeValue(3, result);
    this.pointer += 4;
  };

  handleInput = () => {
    const value = this.inputs.shift();

    this.writeValue(1, value);
    this.pointer += 2;
  };

  handleOutput = (modes) => {
    const output = this.getValue(1, modes[0]);

    this.pointer += 2;

    return output;
  };

  handleJumpIfTrue = (modes) => {
    const condition = this.getValue(1, modes[0]);

    if (condition !== 0) {
      this.pointer = this.getValue(2, modes[1]);

      return;
    }

    this.pointer += 3;
  };

  handleJumpIfFalse = (modes) => {
    const condition = this.getValue(1, modes[0]);

    if (condition === 0) {
      this.pointer = this.getValue(2, modes[1]);

      return;
    }

    this.pointer += 3;
  };

  handleLessThan = (modes) => {
    const value = this.getValue(1, modes[0]) < this.getValue(2, modes[1])
      ? 1
      : 0;

    this.writeValue(3, value);
    this.pointer += 4;
  };

  handleEquals = (modes) => {
    const value = this.getValue(1, modes[0]) === this.getValue(2, modes[1])
      ? 1
      : 0;

    this.writeValue(3, value);
    this.pointer += 4;
  };

  processOpcode = (opcode, modes) => {
    const operations = {
      1: () => this.handleAdd(modes),
      2: () => this.handleMultiply(modes),
      3: () => this.handleInput(),
      4: () => this.handleOutput(modes),
      5: () => this.handleJumpIfTrue(modes),
      6: () => this.handleJumpIfFalse(modes),
      7: () => this.handleLessThan(modes),
      8: () => this.handleEquals(modes),
    };

    return operations[opcode]();
  };

  executeInstruction = () => {
    const instruction = this.memory[this.pointer];

    const opcode = instruction % 100;
    const modes = this.getModes(instruction);

    if (opcode === 99) {
      this.halted = true;
      return;
    }

    return this.processOpcode(opcode, modes);
  };

  runUntilOutput = () => {
    while (!this.halted) {
      const output = this.executeInstruction();

      if (output !== undefined) return output;
    }

    return null;
  };
}

export default IntcodeComputer;
