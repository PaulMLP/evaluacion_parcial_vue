import axios from 'axios';

const API_URL = 'http://localhost:7070/app-ordenes-compras/ordenes-compras';

// Obtener todas las órdenes de compra
export const getOrdenesCompras = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las órdenes de compra:', error);
    throw error;
  }
};

// Obtener una orden de compra por ID
export const getOrdenCompra = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la orden de compra con ID ${id}:`, error);
    throw error;
  }
};

// Crear una nueva orden de compra
export const createOrdenCompra = async (ordenCompra) => {
  try {
    const response = await axios.post(API_URL, ordenCompra);
    return response.data;
  } catch (error) {
    console.error('Error al crear la orden de compra:', error);
    throw error;
  }
};

// Actualizar una orden de compra
export const updateOrdenCompra = async (id, ordenCompra) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, ordenCompra);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la orden de compra con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar una orden de compra
export const deleteOrdenCompra = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error al eliminar la orden de compra con ID ${id}:`, error);
    throw error;
  }
};