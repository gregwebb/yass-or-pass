import tokenService from './tokenService';

const BASE_URL = '/api';

export function create(id) {
    return fetch(`${BASE_URL}/posts/${id}/likes`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
      }
    
    }).then(res => res.json());
  }

export function removeLike(id){
    return fetch(`${BASE_URL}/likes/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
          }
    }).then(res => res.json());
}

export function getAll(){
  return fetch(BASE_URL).then(res => res.json());
}

export function votedPosts(){
    return fetch('${BASE_URL}/liked/').then(res => res.json());
  }
