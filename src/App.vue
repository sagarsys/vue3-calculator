<script setup lang="ts">
import { ref, watch } from "vue";

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const operators = ["AC", "+", "-", "x", "÷", "%"];

const input1 = ref("");
const input2 = ref("");
const operation = ref("");

const result = ref(0);
const displayed = ref("0");

const onNumberClick = (input: string) => {
  if (!input1.value || !operation.value) input1.value += input;
  else input2.value += input;
};

const onOperatorClick = (op: string) => {
  if (op === "AC") return reset();
  operation.value = op;
  // chain calculations
  if (result.value) {
    const current = result.value.toString();
    reset();
    input1.value = current;
    operation.value = op;
    calculate();
  }
};

watch(
  [
    () => input1.value,
    () => input2.value,
    () => operation.value,
    () => result.value,
  ],
  ([in1, in2, op, res]) => {
    if (in1) displayed.value = in1;
    if (op) displayed.value += op;
    if (in2) displayed.value += in2;
    if (res) displayed.value += `= ${res}`;
  },
);

const reset = () => {
  input1.value = "";
  input2.value = "";
  operation.value = "";
  result.value = 0;
  displayed.value = "0";
};

const calculate = () => {
  const in1 = parseInt(input1.value);
  const in2 = parseInt(input2.value);

  switch (operation.value) {
    case "+":
      result.value = in1 + in2;
      break;
    case "-":
      result.value = in1 - in2;
      break;
    case "x":
      result.value = in1 * in2;
      break;
    case "÷":
      result.value = in1 / in2;
      break;
    case "%":
      result.value = in1 % in2;
      break;
  }
};
</script>

<template>
  <div class="bg-slate-700 max-w-100 m-4 p-4 rounded-lg">
    <input
      type="text"
      class="w-[95%] text-right border text-white my-2 py-4 px-8 mx-2 font-bold"
      v-model="displayed"
    />
    <div class="grid grid-cols-4 gap-2">
      <div class="grid col-span-3 grid-cols-3 gap-2 px-4 py-8">
        <button
          class="p-2 text-white border"
          v-for="item in numbers"
          :class="item === '0' && 'col-span-3'"
          :key="item"
          @click="() => onNumberClick(item)"
        >
          {{ item }}
        </button>
      </div>
      <div class="flex flex-wrap flex-column pr-4 py-8">
        <button
          class="p-2 text-white border w-25 mb-2"
          v-for="operator in operators"
          :key="operator"
          @click="() => onOperatorClick(operator)"
        >
          {{ operator }}
        </button>
        <button class="p-2 text-white border w-25 mb-2" @click="calculate">
          =
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
