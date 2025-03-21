import axios from "axios";
import { defer } from "react-router-dom";

export const singlePageLoader = async ({ request, params }) => {
  const res = await axios.get(
    "http://localhost:3000/api/posts/" + params.id,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const postPromise = axios.get(
    "http://localhost:3000/api/posts?" + query,
    {
      withCredentials: true,
    }
  );
  return defer({
    postResponse: postPromise,
  });
};

export const profilePageLoader = async () => {
  const postPromise = axios.get(
    "http://localhost:3000/api/users/profilePosts",
    {
      withCredentials: true,
    }
  );
  const chatPromise = axios.get(
    "http://localhost:3000/api/chats",
    {
      withCredentials: true,
    }
  );
  return defer({
    postResponse: postPromise,
    chatResponse: chatPromise,
  });
};
