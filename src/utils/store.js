export default class Store {
  constructor(opts) {}

  get(key) {
    return localStorage.getItem(key);
  }

  set(key, val) {
    localStorage.setItem(key, val);
  }
}
