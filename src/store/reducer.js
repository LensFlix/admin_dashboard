const initialState = {
  address: null,
  accessToken: null,
  profileId: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_ADDRESS":
      return { ...state, address: action.payload };
    case "SET_ACCESS_TOKEN":
      return { ...state, accessToken: action.payload };
    case "SET_PROFILE_ID":
      return { ...state, profileId: action.payload };
    default:
      return state;
  }
}
