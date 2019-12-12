// Action types
const RECEIVE_SESSION = "RECEIVE_SESSION";

// Action creators
export const receiveSession = user => ({
  type: RECEIVE_SESSION,
  user
});

const initialState = {
  session: {},
  authenticated: false
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_SESSION:
      return {
        session: action.user,
        authenticated: true
      };
    default:
      return state;
  }
};
