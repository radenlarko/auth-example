import axios from "axios";

export const fetchApi = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getTodos = async () => {
  try {
    const response = await fetchApi.get("/todos/1");

    if (response.status !== 200) {
      return Promise.reject(response.data);
    }

    return Promise.resolve(response.data);
  } catch (err) {
    if (err.response) {
      return err.response;
    }

    return err;
  }
};
