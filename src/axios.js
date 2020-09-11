import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-react-amzn.cloudfunctions.net/api", //The api curl (Cloud Function)
});

export default instance;

//https://us-central1-react-amzn.cloudfunctions.net/api
