<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Dirección</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cliente in clientesAux" :key="cliente.id">
          <td>{{ cliente.id }}</td>
          <td>
            <input
              v-if="editId === cliente.id"
              v-model="editCliente.nombre"
              type="text"
              placeholder="Nombre"
            />
            <span v-else>{{ cliente.nombre }}</span>
          </td>
          <td>
            <input
              v-if="editId === cliente.id"
              v-model="editCliente.apellido"
              type="text"
              placeholder="Apellido"
            />
            <span v-else>{{ cliente.apellido }}</span>
          </td>
          <td>
            <input
              v-if="editId === cliente.id"
              v-model="editCliente.direccion"
              type="text"
              placeholder="Dirección"
            />
            <span v-else>{{ cliente.direccion }}</span>
          </td>
          <td>
            <button
              v-if="editId === cliente.id"
              class="btn save-btn"
              @click="actualizarCliente(cliente.id)"
            >
              Actualizar
            </button>
            <button
              v-if="editId === cliente.id"
              class="btn cancel-btn"
              @click="cancelEdit"
            >
              Cancelar
            </button>
            <button v-else class="btn edit-btn" @click="startEdit(cliente)">
              Editar
            </button>
            <button
              v-if="!editId"
              class="btn delete-btn"
              @click="eliminarCliente(cliente.id)"
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
  updateCliente,
  deleteCliente,
  getClientes,
  getClienteById,
} from "@/helper/ClienteClient";

export default {
  props: {
    clientes: Array,
  },
  data() {
    return {
      clientesAux: this.clientes,
      editId: null,
      editCliente: {
        id: null,
        nombre: "",
        apellido: "",
        direccion: "",
      },
    };
  },
  methods: {
    async startEdit(cliente) {
      this.editId = cliente.id;
      this.editCliente = { ...cliente };
    },
    async actualizarCliente(id) {
      try {
        await updateCliente(id, this.editCliente);
        this.editId = null;
        await this.fetchClientes();
      } catch (error) {
        console.error("Error al actualizar cliente:", error);
      }
    },
    cancelEdit() {
      this.editId = null; // Termina la edición sin guardar
    },
    async eliminarCliente(id) {
      try {
        await deleteCliente(id);
        await this.fetchClientes(); // Refresca la lista de clientes
      } catch (error) {
        console.error("Error al eliminar cliente:", error);
      }
    },
    async fetchClientes() {
      const size = this.clientesAux.length;
      try {
        this.clientesAux =
          size > 1 ? await getClientes() : await getClienteById(this.editId);
      } catch (error) {
        console.error("Error al cargar clientes:", error);
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
