export const isAuth = () => {
  const getToken = sessionStorage.getItem("userToken");
  if (getToken) {
    return true;
  } else {
    return false;
  }
};
