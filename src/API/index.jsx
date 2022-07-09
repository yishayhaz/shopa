import axios from "axios";

const URL = "http://192.168.1.12:5000/api";

const GET = (slug) => axios.get(`${URL}${slug}`);
const POST = (slug, doc) => axios.post(`${URL}${slug}`, doc);
const DELETE = (slug, doc) => axios.delete(`${URL}${slug}`, { data: doc });

export { GET, POST, DELETE };
