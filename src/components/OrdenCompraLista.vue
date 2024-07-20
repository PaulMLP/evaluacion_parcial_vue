<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>ID Cliente</th>
          <th v-if="!editId">Nombre Cliente</th>
          <th>ID Producto</th>
          <th v-if="!editId">Nombre Producto</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="orden in ordenesAux" :key="orden.id">
          <td>{{ orden.id }}</td>
          <td>
            <input
              v-if="editId === orden.id"
              v-model="editOrden.clienteId"
              type="text"
              placeholder="Cliente Id"
            />
            <span v-else>{{ orden.clienteId }}</span>
          </td>
          <td v-if="!editId">
            <span>{{ orden.nombreCliente }}</span>
          </td>
          <td>
            <input
              v-if="editId === orden.id"
              v-model="editOrden.productoId"
              type="text"
              placeholder="Producto Id"
            />
            <span v-else>{{ orden.productoId }}</span>
          </td>
          <td v-if="!editId">
            <span>{{ orden.nombreProducto }}</span>
          </td>
          <td>
            <input
              v-if="editId === orden.id"
              v-model="editOrden.precio"
              type="number"
              placeholder="Precio"
            />
            <span v-else>{{ orden.precio }}</span>
          </td>
          <td>
            <button
              v-if="editId === orden.id"
              class="btn save-btn"
              @click="actualizarOrden(orden.id)"
            >
              Actualizar
            </button>
            <button
              v-if="editId === orden.id"
              class="btn cancel-btn"
              @click="cancelEdit"
            >
              Cancelar
            </button>
            <button v-else class="btn edit-btn" @click="startEdit(orden)">
              Editar
            </button>
            <button
              v-if="!editId"
              class="btn delete-btn"
              @click="eliminarOrden(orden.id)"
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
  updateOrdenCompra,
  deleteOrdenCompra,
  getOrdenesCompras,
  getOrdenCompra,
} from "@/helper/OrdenesComprasClient";

export default {
  props: {
    ordenes: Array,
  },
  data() {
    return {
      ordenesAux: this.ordenes,
      editId: null,
      editOrden: {
        id: null,
        clienteId: null,
        nombreCliente: "",
        productoId: null,
        nombreProducto: "",
        precio: null,
      },
    };
  },
  methods: {
    async startEdit(orden) {
      this.editId = orden.id;
      this.editOrden = { ...orden };
    },
    async actualizarOrden(id) {
      try {
        await updateOrdenCompra(id, this.editOrden);
        this.editId = null;
        await this.fetchOrden();
      } catch (error) {
        console.error("Error al actualizar orden compra:", error);
      }
    },
    cancelEdit() {
      this.editId = null; // Termina la edición sin guardar
    },
    async eliminarOrden(id) {
      try {
        await deleteOrdenCompra(id);
        await this.fetchOrden();
      } catch (error) {
        console.error("Error al eliminar orden compra:", error);
      }
    },
    async fetchOrden() {
      const size = this.ordenesAux.length;
      try {
        this.ordenesAux =
          size > 1
            ? await getOrdenesCompras()
            : await getOrdenCompra(this.editId);
      } catch (error) {
        console.error("Error al cargar orden compra:", error);
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
