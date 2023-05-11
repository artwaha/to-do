import axios from "axios";
import jwtDecode from "jwt-decode";

const BASE_URL = "/users";

const register = async (name, username, email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      name,
      username,
      email,
      password,
    });

    const authorizationHeader = response.headers.authorization;
    if (authorizationHeader) {
      const authorizationHeaderParts = authorizationHeader.split(" ");
      if (
        authorizationHeaderParts.length === 2 &&
        authorizationHeaderParts[0] === "Bearer"
      ) {
        const token = authorizationHeaderParts[1];
        localStorage.setItem("token", token);

        const decodedToken = jwtDecode(token);

        // Remove iat
        delete decodedToken.iat;

        return { data: response.data.message, token: decodedToken };
      }
    }
  } catch (err) {
    // Return the error message
    throw err.response.data.error;
  }
};

const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });

    const authorizationHeader = response.headers.authorization;

    if (authorizationHeader) {
      const authorizationHeaderParts = authorizationHeader.split(" ");
      if (
        authorizationHeaderParts.length === 2 &&
        authorizationHeaderParts[0] === "Bearer"
      ) {
        const token = authorizationHeaderParts[1];
        localStorage.setItem("token", token);

        const decodedToken = jwtDecode(token);

        // Remove iat
        delete decodedToken.iat;

        return { data: response.data.message, token: decodedToken };
      }
    }
  } catch (err) {
    throw err.response.data.error;
  }
};

export const userService = {
  register,
  login,
};
