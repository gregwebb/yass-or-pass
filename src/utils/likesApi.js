import tokenService from "./tokenService";

const BASE_URL = "/api";

export function create(id) {
  return fetch(`${BASE_URL}/posts/${id}/likes`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((res) => res.json());
}

export function removeLike(id) {
  return fetch(`${BASE_URL}/likes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((res) => res.json());
}

export function getAll() {
  return fetch(BASE_URL).then((res) => res.json());
}

export function getMatches() {
  return fetch(`${BASE_URL}/matches`, {
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((res) => res.json());
}
