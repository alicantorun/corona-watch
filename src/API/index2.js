const APP_API_URL =
  //   process.env.NODE_ENV === "production"
  //     ? process.env.REACT_APP_LIVE_STORE_URL
  //     : process.env.REACT_APP_LOCAL_STORE_URL;
  "";

const GET_ALL = async () => {
  const rawResponse = await fetch(`${APP_API_URL}/all`);
  return rawResponse.json();
};

const GET_COUNTRIES = async () => {
  const rawResponse = await fetch(`${APP_API_URL}/countries`);
  return rawResponse.json();
};

export { APP_API_URL, GET_ALL, GET_COUNTRIES };
