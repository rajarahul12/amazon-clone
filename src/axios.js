import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/react-amzn/us-central1/api", //The api curl (Cloud Function)
});

export default instance;

//https://us-central1-react-amzn.cloudfunctions.net/api
