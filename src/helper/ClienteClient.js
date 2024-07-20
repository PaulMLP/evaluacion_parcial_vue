import axios from "axios";

const API_URL = "http://localhost:7070/app-clientes/clientes";

// Obtener todos los clientes
export const getClientes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    return [];
  }
};

// Obtener un cliente por ID
export const getClienteById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo cliente con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo cliente
export const createCliente = async (cliente) => {
  try {
    const response = await axios.post(API_URL, cliente);
    return response.data;
  } catch (error) {
    console.error("Error creando cliente:", error);
    throw error;
  }
};

// Actualizar un cliente existente
export const updateCliente = async (id, cliente) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, cliente);
    return response.data;
  } catch (error) {
    console.error(`Error actualizando cliente con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar un cliente
export const deleteCliente = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error eliminando cliente con ID ${id}:`, error);
    throw error;
  }
};
