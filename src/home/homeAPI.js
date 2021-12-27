import { baseURL } from '../conf';

/*
  Fetch the first 25 posts from reddit frontpage and store them to state.posts
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
