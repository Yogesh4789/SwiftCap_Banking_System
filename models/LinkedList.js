const Node = require('./Node');

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(data) {
    const node = new Node(data);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this.length += 1;
    return node;
  }

  find(predicateFn) {
    let current = this.head;

    while (current) {
      if (predicateFn(current.data)) {
        return current.data;
      }
      current = current.next;
    }

    return null;
  }

  forEach(callbackFn) {
    let current = this.head;
    let index = 0;

    while (current) {
      callbackFn(current.data, index);
      current = current.next;
      index += 1;
    }
  }

  toArray() {
    const values = [];
    this.forEach((item) => values.push(item));
    return values;
  }
}

module.exports = LinkedList;
