<template>
  <nav>
    <router-link to="/clientes">Clientes</router-link> |
    <router-link to="/productos">Productos</router-link> |
    <router-link to="/ordenes-compras">Ordenes Compras</router-link>
  </nav>
  <router-view />
  <footer>
    <h3>Evaluación Parcial</h3>
    <h5>Programación Distribuida</h5>
    <h5>Paúl Merizalde</h5>
  </footer>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
