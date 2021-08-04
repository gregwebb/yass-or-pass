const BASE_URL = '/api/posts/';

export function create(post) {
    return fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {'Content-Type': 'application/json'},
    }).then(res => res.json())
}

export function getAll(){
    return fetch(BASE_URL).then(res => res.json());
}

export default {
    create,
    getAll
  };