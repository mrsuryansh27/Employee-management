import axios from 'axios';

// Replace with your Cosmocloud API URL and your actual projectId and environmentId
const API_URL = process.env.REACT_APP_API_URL;
const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;
const ENVIRONMENT_ID = process.env.REACT_APP_ENVIRONMENT_ID;

const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Optional: 10 seconds timeout
  headers: {
    'projectId': PROJECT_ID,
    'environmentId': ENVIRONMENT_ID
  }
});

export const getEmployees = async () => {
  try {
    const response = await instance.get('/employee');
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const getEmployeeById = async (id) => {
  try {
    const response = await instance.get(`/employee/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching employee with ID ${id}:`, error);
    throw error;
  }
};

export const addEmployee = async (employee) => {
  try {
    const response = await instance.post('/employee', employee);
    return response.data;
  } catch (error) {
    console.error('Error adding employee:', error);
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    await instance.delete(`/employee/${id}`);
  } catch (error) {
    console.error(`Error deleting employee with ID ${id}:`, error);
    throw error;
  }
};
