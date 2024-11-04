// const serviceConfig = {
//   host: process.env.REACT_APP_API_HOST,
//   retailer: process.env.REACT_APP_RETAILER,
//   key: process.env.REACT_APP_KEY,
//   lib: [process.env.REACT_APP_LIB]
// };


// export default serviceConfig;
const serviceConfig = {
  host: import.meta.env.VITE_API_APP_HOST,
};

export default serviceConfig;