const { NotImplementedError } = require('../extensions/index.js');

 const { Node } = require('../extensions/list-tree.js');






class BinarySearchTree {

  addNode (node, data) {
    if (data < node.data) {
      if (!node.left) {
        node.left = new Node(data);
      } else {
        this.addNode (node.left, data)
      }
    }
    if (data > node.data) {
      if (!node.right) {
        node.right = new Node(data);
      } else {
        this.addNode(node.right, data)
      }
    }
  }

  root() {
    return (this.tree) ? this.tree : null;
  }

  add(data) {
    if (!this.tree) {
      this.tree = new Node(data);
    } else {
      if (data < this.tree.data) {
        if (!this.tree.left) {
          this.tree.left = new Node(data);
        } else {
          this.addNode(this.tree.left, data)
        }
      }
      if (data > this.tree.data) {
        if (!this.tree.right) {
          this.tree.right = new Node(data);
        } else {
          this.addNode(this.tree.right, data)
        }
      }
    }
  }

  has(data, node = this.tree) {
    if (!node) return false;
    if (data === node.data)
      return true;
    if (node.data > data)
      return this.has(data, node.left)
    if (node.data < data)
      return this.has(data, node.right)
  }

  find (data, node = this.tree) {
    if (!node) return null;
    if (data === node.data)
      return node;
    if (node.data > data)
      return this.find(data, node.left)
    if (node.data < data)
      return this.find(data, node.right)
  }

  remove(data, node = this.tree) {
    if (this.tree.data === data) {
        let nodeRightMin = this.minNode(this.tree.right)
        const newNodeReplace = new Node(nodeRightMin.data)
        newNodeReplace.left = this.tree.left;
        newNodeReplace.right = this.tree.right;
        this.tree = newNodeReplace;
        //this.remove(nodeRightMin.data, this.tree.right);
        return;
    }

    if (node.data > data) {
      if (node.left.data != data) {

        this.remove(data, node.left);
      } else {

        if (!node.left.left && !node.left.right) {

          node.left = null;
          return;
        }

        if (!node.left.right) {
          node.left = node.left.left;

          return;
        }

        if (!node.left.left) {
          node.left = node.left.right;

          return ;
        }
        let nodeRightMin = this.minNode(node.left.right)
        this.remove(nodeRightMin.data, node.left);
        const newNodeReplace = new Node(nodeRightMin.data)
        newNodeReplace.left = node.left.left;
        newNodeReplace.right = node.left.right;
        node.left = newNodeReplace;
      }
    } else {
      if (node.right.data != data) {
        this.remove(data, node.right);
      } else {

        if (!node.right.left && !node.right.right) {
          node.right = null;
          return;
        }
        if (!node.right.right) {
          node.right = node.right.left;

          return;
        }
        if (!node.right.left) {
          node.right = node.right.right;

          return ;
        }

        let nodeRightMin = this.minNode(node.right.right)
        this.remove(nodeRightMin.data, node.right);
        const newNodeReplace = new Node(nodeRightMin.data)
        newNodeReplace.left = node.right.left;
        newNodeReplace.right = node.right.right;
        node.right = newNodeReplace;
      }
    }
  }

  minNode(node = this.tree) {
    if (!node) return null;
    if (!node.left) return node;
    return this.minNode(node.left);
  }

  min(node = this.tree) {
    return this.minNode(node).data
  }

  maxNode(node = this.tree) {
    if (!node) return null;
    if (!node.right) return node;
    return this.maxNode(node.right);
  }

  max(node = this.tree) {
    return this.maxNode(node).data;
  }
}

module.exports = {
  BinarySearchTree
};