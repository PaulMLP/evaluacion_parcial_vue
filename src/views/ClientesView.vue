<template>
  <div class="clientes">
    <h1>Clientes</h1>
    <ClienteForm v-if="crear" />
    <button v-if="crear" class="btn custom-btn" @click="agregar">
      Salir
    </button>

    <div v-else class="btns">
      <button class="btn custom-btn" @click="agregar">
        Agregar un Nuevo Cliente
      </button>

      <button class="btn custom-btn" @click="enlistarTodo">
        Enlistar Todos los Clientes
      </button>

      <div class="search">
        <input
          type="search"
          id="search-input"
          class="search-input"
          placeholder="Buscar por id..."
          v-model="id"
        />
        <button class="btn custom-btn" @click="buscarId">
          Buscar &#128269;
        </button>
      </div>
    </div>
    <ClientesLista :clientes="clientes" v-if="clientes" />
  </div>
</template>
<script>
import ClientesLista from "@/components/ClientesLista.vue";
import ClienteForm from "@/components/ClienteForm.vue";
import { getClientes, getClienteById } from "@/helper/ClienteClient";

export default {
  components: { ClientesLista, ClienteForm },
  data() {
    return {
      crear: false,
      clientes: null,
      id: null,
    };
  },
  methods: {
    agregar() {
      this.crear = !this.crear;
    },
    async enlistarTodo() {
      this.clientes = await getClientes();
    },
    async buscarId() {
      try {
        this.clientes = null;
        const cliente = await getClienteById(this.id);
        this.clientes = [cliente];
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.clientes {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btns {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 10px;
}

.search {
  display: flex;
  align-items: center;
}

.search-input,
.custom-btn {
  height: 40px;
  padding: 0 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.custom-btn {
  border: none;
  background-color: #3d6ea2;
  color: white;
  cursor: pointer;
  margin-left: 10px;
}

.custom-btn:hover {
  background-color: #3a7ec7;
}
</style>
