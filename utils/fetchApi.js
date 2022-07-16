import axios from "axios";

export const fetchApi = axios.create({
  baseURL: "http://192.168.0.5/api",
});

export const getTodos = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/todos/1"
  );

  return data;
};

export const loginUser = async (data) => {
  const response = await fetchApi.post("/auth/login", data);

  return response.data;
};
