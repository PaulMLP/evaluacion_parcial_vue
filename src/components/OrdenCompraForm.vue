<template>
  <div class="orden-form">
    <form class="form" @submit.prevent="addOrden">
      <div class="form-group">
        <label for="clienteId">Id Cliente</label>
        <input type="number" id="clienteId" v-model="orden.clienteId" required />
      </div>
      <div class="form-group">
        <label for="productoId">Id Prodcuto</label>
        <input type="number" id="productoId" v-model="orden.productoId" required />
      </div>
      <div class="form-group">
        <label for="precio">Precio</label>
        <input
          type="number"
          id="precio"
          v-model="orden.precio"
          required
        />
      </div>
      <button type="submit" class="btn submit-btn">Agregar Orden de Compra</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import { createOrdenCompra } from "@/helper/OrdenesComprasClient";

export default {
  data() {
    return {
      orden: {
        clienteId: null,
        productoId: null,
        precio: null,
      },
      errorMessage: "",
    };
  },
  methods: {
    async addOrden() {
      try {
        await createOrdenCompra(this.orden);
        alert("Orden de Compra agregada exitosamente");
        this.orden = {
          clienteId: null,
          productoId: null,
          precio: null,
        };
      } catch (error) {
        this.errorMessage = "Error al agregar orden: " + error.message;
      }
    },
  },
};
</script>

<style scoped>
.orden-form {
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
