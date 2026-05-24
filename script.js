class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);

    if (sortedArray.length === 0) {
      return null;
    }

    const mid = Math.floor(sortedArray.length / 2);
    const root = new Node(sortedArray[mid]);

    root.left = this.buildTree(sortedArray.slice(0, mid));
    root.right = this.buildTree(sortedArray.slice(mid + 1));

    return root;
  }

  includes(value, node = this.root) {
    if (node === null) {
      return false;
    }

    if (node.data === value) {
      return true;
    }

    if (value < node.data) {
      return this.includes(value, node.left);
    }

    return this.includes(value, node.right);
  }

  insert(value, node = this.root) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    if (value === node.data) {
      return;
    }

    if (value < node.data) {
      if (node.left === null) {
        node.left = new Node(value);
        return;
      }

      this.insert(value, node.left);
    } else {
      if (node.right === null) {
        node.right = new Node(value);
        return;
      }

      this.insert(value, node.right);
    }
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

tree.insert(100);
tree.insert(2);
tree.insert(23);

prettyPrint(tree.root);
console.log(tree.includes(23));
console.log(tree.includes(100));
