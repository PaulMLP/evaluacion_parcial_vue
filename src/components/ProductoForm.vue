<template>
  <div class="producto-form">
    <form class="form" @submit.prevent="addProducto">
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" v-model="producto.nombre" required />
      </div>
      <div class="form-group">
        <label for="precio">Precio</label>
        <input type="number" id="precio" v-model="producto.precio" required />
      </div>

      <button type="submit" class="btn submit-btn">Agregar Producto</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import { createProducto } from "@/helper/ProductosClient";

export default {
  data() {
    return {
      producto: {
        nombre: "",
        precio: null,
      },
      errorMessage: "",
    };
  },
  methods: {
    async addProducto() {
      try {
        await createProducto(this.producto);
        alert("Producto agregado exitosamente");
        this.producto = {
          nombre: "",
          precio: null,
        };
      } catch (error) {
        this.errorMessage = "Error al agregar producto: " + error.message;
      }
    },
  },
};
</script>

<style scoped>
.producto-form {
  max-width: 600px;
  margin: 10px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-left: 5px;
  margin-bottom: 5px;
  text-align: start;
}

input {
  height: 40px;
  padding: 0 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button.submit-btn {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button.submit-btn:hover {
  background-color: #45a049;
}

.error-message {
  color: #f44336;
  margin-top: 10px;
}
</style>
