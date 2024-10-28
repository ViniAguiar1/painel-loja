import axios from 'axios';

export const loginService = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/usuarios/login`, {
      email: email,  // aqui usamos o 'nome' que é esperado na API
      senha: password
    });
    
    // Retorna o token e os dados do usuário
    return response.data;
  } catch (error) {
    throw new Error('Credenciais inválidas');
  }
};