const initialState = {
  auth: {
    user: null,
    email: null,
    isLogin: !!localStorage.getItem("TOKEN"),
  },
};

export default initialState;
