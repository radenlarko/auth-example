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

export const getPosts = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );

  return data;
};

export const getUsers = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );

  return data;
};

export const getPassenger = async (page) => {
  const { data } = await axios.get(
    `https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`
  );

  return data;
};

export const loginUser = async (data) => {
  const response = await fetchApi.post("/auth/login", data);

  return response.data;
};
