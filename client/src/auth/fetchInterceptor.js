const token = JSON.parse(localStorage.getItem("token"));

const fetchConfig = {
  Accept: "application/json",
  Authorization: JSON.parse(localStorage.getItem("token")),
  "Content-Type": "application/json",
};

export { fetchConfig };
