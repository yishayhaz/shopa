import axios from "axios";

// const URL = "http://34.89.161.92:8080/api";
const URL = "/api";

const GET = (slug) => axios.get(`${URL}${slug}`);
const POST = (slug, doc) => axios.post(`${URL}${slug}`, doc);
const DELETE = (slug, doc) => axios.delete(`${URL}${slug}`, { data: doc });

export { GET, POST, DELETE };
