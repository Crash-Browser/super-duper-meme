import Benchmark from "benchmark";
import baseline from "@babel-baseline/parser";
import current from "@babel/parser";
import { report } from "../../util.mjs";

const suite = new Benchmark.Suite();
function createInput(length) {
  return "`" + " ${0}".repeat(length) + "`";
}
function benchCases(name, implementation, options) {
  for (const length of [128, 256, 512, 1024]) {
    const input = createInput(length);
    suite.add(`${name} ${length} template elements`, () => {
      implementation.parse(input, options);
    });
  }
}

current.parse(createInput(1));
benchCases("baseline", baseline);
benchCases("current", current);

suite.on("cycle", report).run();
