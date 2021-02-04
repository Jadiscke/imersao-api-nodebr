const ICrud = require("../interfaces/interfaceCrud");

class ContextStrategy extends ICrud {
  #database;
  constructor(strategy) {
    super();
    this.#database = strategy;
  }

  create(item) {
    return this.#database.create(item);
  }

  read(query) {
    return this.#database.read(query);
  }

  update(id, item) {
    return this.#database.update(id, item);
  }

  delete(id) {
    return this.#database.delete(id);
  }

  isConnected() {
    return this.#database.isConnected();
  }

  connect() {
    return this.#database.connect();
  }
}

module.exports = ContextStrategy;
