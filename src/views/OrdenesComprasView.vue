<template>
  <div class="ordenes-compras">
    <h1>Ordenes Compras</h1>
    <OrdenCompraForm v-if="crear" />
    <button v-if="crear" class="btn custom-btn" @click="agregar">Salir</button>

    <div v-else class="btns">
      <button class="btn custom-btn" @click="agregar">
        Agregar un Nueva Orden Cobro
      </button>

      <button class="btn custom-btn" @click="enlistarTodo">
        Enlistar Todos las Ordenes de Cobro
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
    <OrdenCompraLista :ordenes="ordenes" v-if="ordenes && !crear" />
  </div>
</template>

<script>
import OrdenCompraForm from "@/components/OrdenCompraForm.vue";
import OrdenCompraLista from "@/components/OrdenCompraLista.vue";
import {
  getOrdenesCompras,
  getOrdenCompra,
} from "@/helper/OrdenesComprasClient";

export default {
  components: { OrdenCompraForm, OrdenCompraLista },
  data() {
    return {
      crear: false,
      ordenes: null,
      id: null,
    };
  },
  methods: {
    agregar() {
      this.crear = !this.crear;
    },
    async enlistarTodo() {
      this.ordenes = await getOrdenesCompras();
      console.log(this.ordenes);
    },
    async buscarId() {
      try {
        this.ordenes = null;
        const orden = await getOrdenCompra(this.id);
        this.ordenes = [orden];
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.ordenes-compras {
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
