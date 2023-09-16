<template>
  <nav class="navbar">
    <!--<router-link to="/">Chat</router-link> |
    <router-link to="/result">Result</router-link>-->
    <img class="isotipo" src="./assets/hat.png" alt="image hat">
    <span class="logo">The Sorting Hat</span>
  </nav>
  <router-view />
</template>

<style lang="scss">
@import "styles/main.scss";

* {
  padding: 0px;
  margin: 0px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav.navbar {
  width: 100%;
  padding: 20px 0px;
  background-color: #222;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 999;
  .isotipo{
    width: 30px;
    height: auto;
  }
  .logo {
    font-family: "Libre Baskerville", serif;
    font-size: 1.5em;
    font-weight: bold;
    text-align: center;
    color: #fff;
  }
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: $blue-hex;
    }
  }
}
</style>
