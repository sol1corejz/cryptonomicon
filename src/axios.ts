import axios from "axios";

const instance = axios.create({
  baseURL: 'https://min-api.cryptocompare.com/data',
  headers: {authorization: "9f87f81c83620862e348d58f61daee1a6c5b3f72c8cfb2e8cf126f5932cdefb7"}
})

export default instance;