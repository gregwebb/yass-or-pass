import tokenService from './tokenService';

const BASE_URL = '/api';

export function create(id) {
    return fetch(`${BASE_URL}/posts/${id}/yasss`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
      }
    
    }).then(res => res.json());
  }

export function removeYass(id){
    return fetch(`${BASE_URL}/yasss/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
          }
    }).then(res => res.json());
}