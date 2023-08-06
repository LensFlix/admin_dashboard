const initialState = {
  address: null,
  accessToken: null,
  profileId: null,
  handle: null,
};

export default function reducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case "SET_ADDRESS":
      return { ...state, address: action.payload };
    case "SET_ACCESS_TOKEN":
      return { ...state, accessToken: action.payload };
    case "SET_PROFILE_ID":
      return {
        ...state,
        profileId: action.payload,
      };
    case "SET_HANDLE":
      return {
        ...state,
        handle: action.payload,
      };
    default:
      return state;
  }
}
