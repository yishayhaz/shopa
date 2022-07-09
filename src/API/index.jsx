import axios from "axios";

const GET = (slug) => axios.get(`${URL}${slug}`);
const POST = (slug, doc) => axios.post(`${URL}${slug}`, doc);
const DELETE = (slug, doc) => axios.delete(`${URL}${slug}`, { data: doc });

export { GET, POST, DELETE };
