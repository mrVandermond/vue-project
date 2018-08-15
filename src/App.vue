<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  color: #0c4f86;
}
.base-input {
  display: block;
  width: 300px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #0c4f86;
  border-radius: 2px;
}
.base-button {
  display: inline-block;
  margin-top: 10px;
  border: 1px solid #0c4f86;
  border-radius: 2px;
  background-color: #fff;
  padding: 5px 10px;
  cursor: pointer;
}
.base-button:hover {
  background-color: rgba(12, 79, 134, 0.473);
}
</style>
