import { baseURL } from "../conf";

export const upvote = (id) => {
  const url = `${baseURL}/upvote?id=${id}`;
  return fetch(url).then(data => data.json())
}

export const downvote = (id) => {
  const url = `${baseURL}/downvote?id=${id}`;
  return fetch(url).then(data => data.json());
}

export const fetchPost = (id) => {
  const url = `${baseURL}/post?id=${id}`;
  return fetch(url).then(data => data.json());
}