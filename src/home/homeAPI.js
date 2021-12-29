import { baseURL } from '../conf';

/*
  Fetch the first 25 posts from best 
*/
export const fetchPosts = () => {
  const url = `${baseURL}/bestAll`;
  return fetch(url)
    .then(data => data.json());
}

export const fetchComments = (id) => {
  const url = `${baseURL}/submission?id=${id}`;
  return fetch(url)
    .then(data => data.json());
}
