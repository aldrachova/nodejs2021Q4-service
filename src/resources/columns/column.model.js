const { v4: uuidv4 } = require('uuid');

class Column {
  constructor(title, order) {
    this.id = uuidv4();
    this.title = title;
    this.order = order;
  }
}

module.exports = Column;
