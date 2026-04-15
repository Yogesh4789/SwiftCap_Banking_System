const TreeNode = require('./TreeNode');

class BST {
  constructor() {
    this.root = null;
  }

  insert(key, value) {
    if (!this.root) {
      this.root = new TreeNode(key, value);
      return this.root;
    }

    return this._insertRecursive(this.root, key, value);
  }

  _insertRecursive(node, key, value) {
    if (key === node.key) {
      throw new Error(`Account ${key} already exists`);
    }

    if (key < node.key) {
      if (!node.left) {
        node.left = new TreeNode(key, value);
        return node.left;
      }
      return this._insertRecursive(node.left, key, value);
    }

    if (!node.right) {
      node.right = new TreeNode(key, value);
      return node.right;
    }
    return this._insertRecursive(node.right, key, value);
  }

  find(key) {
    let current = this.root;

    while (current) {
      if (key === current.key) {
        return current.value;
      }
      current = key < current.key ? current.left : current.right;
    }

    return null;
  }

  inOrderTraversal(callbackFn) {
    this._inOrder(this.root, callbackFn);
  }

  _inOrder(node, callbackFn) {
    if (!node) {
      return;
    }

    this._inOrder(node.left, callbackFn);
    callbackFn(node.key, node.value);
    this._inOrder(node.right, callbackFn);
  }
}

module.exports = BST;
