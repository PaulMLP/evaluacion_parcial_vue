<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in productosAux" :key="producto.id">
          <td>{{ producto.id }}</td>
          <td>
            <input
              v-if="editId === producto.id"
              v-model="editProducto.nombre"
              type="text"
              placeholder="Nombre"
            />
            <span v-else>{{ producto.nombre }}</span>
          </td>
          <td>
            <input
              v-if="editId === producto.id"
              v-model="editProducto.precio"
              type="text"
              placeholder="Precio"
            />
            <span v-else>{{ producto.precio }}</span>
          </td>
          <td>
            <button
              v-if="editId === producto.id"
              class="btn save-btn"
              @click="actualizarProducto(producto.id)"
            >
              Actualizar
            </button>
            <button
              v-if="editId === producto.id"
              class="btn cancel-btn"
              @click="cancelEdit"
            >
              Cancelar
            </button>
            <button v-else class="btn edit-btn" @click="startEdit(producto)">
              Editar
            </button>
            <button
              v-if="!editId"
              class="btn delete-btn"
              @click="eliminarProducto(producto.id)"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  updateProducto,
  deleteProducto,
  getProductos,
  getProductoById,
} from "@/helper/ProductosClient";

export default {
  props: {
    productos: Array,
  },
  data() {
    return {
      productosAux: this.productos,
      editId: null,
      editProducto: {
        id: null,
        nombre: "",
        precio: null,
      },
    };
  },
  methods: {
    async startEdit(producto) {
      this.editId = producto.id;
      this.editProducto = { ...producto };
    },
    async actualizarProducto(id) {
      try {
        await updateProducto(id, this.editProducto);
        this.editId = null;
        await this.fetchProductos();
      } catch (error) {
        console.error("Error al actualizar producto:", error);
      }
    },
    cancelEdit() {
      this.editId = null;
    },
    async eliminarProducto(id) {
      try {
        await deleteProducto(id);
        await this.fetchProductos();
      } catch (error) {
        console.error("Error al eliminar cliente:", error);
      }
    },
    async fetchProductos() {
      const size = this.productosAux.length;
      try {
        this.productosAux =
          size > 1 ? await getProductos() : await getProductoById(this.editId);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Estilos para la tabla */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:hover {
  background-color: #eaeaea;
}

/* Estilos para los botones */
.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 14px;
  margin-right: 8px;
}

.edit-btn {
  background-color: #007bff;
}

.edit-btn:hover {
  background-color: #0056b3;
}

.save-btn {
  background-color: #28a745;
}

.save-btn:hover {
  background-color: #218838;
}

.cancel-btn {
  background-color: #dc3545;
}

.cancel-btn:hover {
  background-color: #c82333;
}

.delete-btn {
  background-color: #f44336;
}

.delete-btn:hover {
  background-color: #e53935;
}

input {
  width: 100%;
  box-sizing: border-box;
}
</style>
