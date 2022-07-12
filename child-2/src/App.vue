<template>
  <div id="app">
    <h1>子应用2</h1>
    <div id="nav">
      <router-link to="/index">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>
