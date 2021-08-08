import tokenService from "./tokenService";

const BASE_URL = "/api/posts/";

export function create(post) {
  return fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((res) => res.json());
}

export function getAll() {
  return fetch(BASE_URL).then((res) => res.json());
}

export function deletePost(id) {
  return fetch(`${BASE_URL}${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((res) => {
    if (res.ok) return res.json();
    new Error("error deleting");
  });
}

export default {
  create,
  getAll,
  deletePost,
};
