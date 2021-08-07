import tokenService from "./tokenService";

const BASE_URL = "/api";

export function create(id) {
  return fetch(`${BASE_URL}/posts/${id}/dislikes`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((res) => res.json());
}

export function removeDislike(id) {
  return fetch(`${BASE_URL}/dislikes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((res) => res.json());
}
