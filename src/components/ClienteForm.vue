<template>
  <div class="cliente-form">
    <form class="form" @submit.prevent="addCliente">
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" v-model="cliente.nombre" required />
      </div>
      <div class="form-group">
        <label for="apellido">Apellido</label>
        <input type="text" id="apellido" v-model="cliente.apellido" required />
      </div>
      <div class="form-group">
        <label for="direccion">Dirección</label>
        <input
          type="text"
          id="direccion"
          v-model="cliente.direccion"
          required
        />
      </div>
      <button type="submit" class="btn submit-btn">Agregar Cliente</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import { createCliente } from "@/helper/ClienteClient";

export default {
  data() {
    return {
      cliente: {
        nombre: "",
        apellido: "",
        direccion: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    async addCliente() {
      try {
        await createCliente(this.cliente);
        alert("Cliente agregado exitosamente");
        this.cliente = {
          nombre: "",
          apellido: "",
          direccion: "",
        };
      } catch (error) {
        this.errorMessage = "Error al agregar cliente: " + error.message;
      }
    },
  },
};
</script>

<style scoped>
.cliente-form {
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
