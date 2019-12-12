// Action types
const TOGGLE_LOGIN = "TOGGLE_LOGIN";
const TOGGLE_REGISTER = "TOGGLE_REGISTER";

// Action creators
export const toggleLogin = () => ({
  type: TOGGLE_LOGIN
});

export const toggleRegister = () => ({
  type: TOGGLE_REGISTER
});

const initialState = {
  login: false,
  register: false
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LOGIN:
      return {
        ...state,
        login: !state.login
      };
    case TOGGLE_REGISTER:
      return {
        ...state,
        register: !state.register
      };
    default:
      return state;
  }
};
