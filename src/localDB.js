const localDB = {
  get(name) {
    return localStorage[name] && JSON.parse(localStorage[name]);
  },
  set(name, value) {
    localStorage[name] = JSON.stringify(value);
    return value;
  }
};

export default localDB;
