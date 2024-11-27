<template>
  <template v-if="checkboxes">
    <div v-for="(row, index) of checkboxes" :key="index">
      <input type="checkbox" v-for="(_, checkboxIndex) of row" :key="index + checkboxIndex"
        style="height: 60px; width: 60px;" v-model="row[checkboxIndex]"
        @click.prevent="onCheckboxChange(index, checkboxIndex, $event.target.checked)" />
    </div>
  </template>
</template>

<script setup>
import { io } from 'socket.io-client';
import { ref } from 'vue';

const socket = io('http://192.168.20.51/')
const checkboxes = ref();

function onCheckboxChange(y, x, value) {
  socket.emit('update', { y, x, value });
}

socket.on('init', (arg) => {
  console.log(arg)
  checkboxes.value = arg
})

socket.on('update', (arg) => {
  checkboxes.value[arg.y][arg.x] = arg.value;
})


</script>
