const initialState = {
  address: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_ADDRESS":
      return { ...state, address: action.payload };
    default:
      return state;
  }
}
