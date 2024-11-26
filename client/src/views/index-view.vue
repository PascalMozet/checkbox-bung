<template>
  <template v-if="checkboxes[0].length">
    <div v-for="(row, index) of checkboxes" :key="index">
      <input type="checkbox" v-for="(checkbox, checkboxIndex) of row" :key="index + checkboxIndex"
        v-model="row[checkboxIndex]" @update:model-value="onCheckboxChange(index, checkboxIndex, $event)" />
    </div>
  </template>
</template>

<script setup>
import { ref, watch } from 'vue';

const checkboxes = ref([])

for (let i = 0; i < 10; i++) {
  if (!checkboxes.value[i]) checkboxes.value[i] = []
  for (let x = 0; x < 10; x++) {
    checkboxes.value[i][x] = false
  }
}


watch(checkboxes, val => console.log(val), { deep: true })

function onCheckboxChange(y, x, value) {
  console.log(y, x, value)
}
</script>
