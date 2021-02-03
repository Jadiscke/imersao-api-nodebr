const ICrud = require("../interfaces/interfaceCrud");

class ContextStrategy extends ICrud {
  #database;
  constructor(strategy) {
    super();
    this.#database = strategy;
  }

  create(item) {
    this.#database.create(item);
  }

  read(query) {
    this.#database.read(query);
  }

  update(id, item) {
    this.#database.update(id, item);
  }

  delete(id) {
    this.#database.delete(id);
  }

  isConnected() {
    return this.#database.isConnected();
  }
}

module.exports = ContextStrategy;
