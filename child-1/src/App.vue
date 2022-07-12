<template>
  <div id="app">
    <h1>子应用1</h1>
    <div id="nav">
      <router-link to="/index">Home</router-link> |
      <router-link to="/login">Login</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
