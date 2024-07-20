<template>
  <div class="productos">
    <h1>Productos</h1>
    <ProductoForm v-if="crear" />
    <button v-if="crear" class="btn custom-btn" @click="agregar">Salir</button>
    <div v-else class="btns">
      <button class="btn custom-btn" @click="agregar">
        Agregar un Nuevo Producto
      </button>

      <button class="btn custom-btn" @click="enlistarTodo">
        Enlistar Todos los Productos
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
    <ProductosLista :productos="productos" v-if="productos" />
  </div>
</template>
<script>
import ProductosLista from "@/components/ProductosLista.vue";
import ProductoForm from "@/components/ProductoForm.vue";
import { getProductos, getProductoById } from "@/helper/ProductosClient";

export default {
  components: { ProductosLista, ProductoForm },
  data() {
    return {
      crear: false,
      productos: null,
      id: null,
    };
  },
  methods: {
    agregar() {
      this.crear = !this.crear;
    },
    async enlistarTodo() {
      this.productos = await getProductos();
    },
    async buscarId() {
      if (this.id) {
        try {
          this.productos = null;
          const producto = await getProductoById(this.id);
          this.productos = [producto];
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>

<style scoped>
.productos {
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
