import { client } from "../LensClient/client";
import { getDefaultProfileId } from "../LensClient/queries";
export async function getProfileId(address, dispatch) {
  const profileId = await client.query({
    query: getDefaultProfileId,
    variables: {
      request: {
        ethereumAddress: address,
      },
    },
  });
  console.log(profileId);
  if (profileId.data.defaultProfile) {
    dispatch({
      type: "SET_PROFILE_ID",
      payload: profileId.data.defaultProfile.id,
    });
    dispatch({
      type: "SET_HANDLE",
      payload: profileId.data.defaultProfile.handle.split(".")[0],
    });
  }
}
