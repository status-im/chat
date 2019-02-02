export default class Store {
  get(key) {
    return localStorage.getItem(key);
  }

  set(key, val) {
    localStorage.setItem(key, val);
  }
}
