import axios from "axios";

class AuthService {
    constructor(baseURL) {
        this.baseURL = baseURL;
      }
  async getAuth() {
    return await axios
      .get(`${this.baseURL}/getAccessToken`)
      .then((response) => {
        if (response.data.success) { 
          return response.data.access_token;
        }
      })
      .catch((error) => {
        console.error("Erro ao fazer requisição:", error);
      });
  }
}

const authService = new AuthService(process.env.REACT_APP_API_URL_V1); 
export default authService;
