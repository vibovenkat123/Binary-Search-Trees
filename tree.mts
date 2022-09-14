import { Node } from "./Node.mjs";
import { mergeSort } from "./merge.mjs";
import { prettyPrint } from "./prettyPrint.mjs";
class Tree {
  root: any;
  array = [];
  constructor(array) {
    this.setup(array);
  }
  inorder(func: Function, currentNode = this.root) {
    if (!func) return this.array;
    if (currentNode === null) {
      return;
    }
    this.inorder(func, currentNode.left);
    func(currentNode);
    this.inorder(func, currentNode.right);
  }
  find(value: number) {
    let currentNode = this.root;
    while (currentNode) {
      if (currentNode.data == value) {
        return currentNode;
      }
      if (value > currentNode.data) {
        currentNode = currentNode.right;
      } else {
        currentNode = currentNode.left;
      }
    }
    return false;
  }
  depth(node) {
    let currentNode = this.root;
    let depth = 0;
    while (currentNode) {
      if (currentNode == node) {
        return depth;
      }
      depth += 1;
      if (node.data > currentNode.data) {
        currentNode = currentNode.right;
      } else {
        currentNode = currentNode.left;
      }
    }
    return false;
  }
  preorder(func: Function, currentNode = this.root) {
    if (!func) return this.array;
    if (!currentNode) return;
    func(currentNode);
    this.preorder(func, currentNode.left);
    this.preorder(func, currentNode.right);
  }
  levelOrder(func: Function) {
    const queue = [this.root];
    if (!func) return this.array;
    while (queue.length) {
      for (let i = 0; i < queue.length; i++) {
        const currentNode = queue.shift();
        if (currentNode.right) queue.push(currentNode.right);
        if (currentNode.left) queue.push(currentNode.left);
        func(currentNode);
      }
    }
  }
  postorder(func: Function, currentNode = this.root) {
    if (!func) return this.array;
    if (!currentNode) return;
    this.postorder(func, currentNode.left);
    this.postorder(func, currentNode.right);
    func(currentNode);
  }
  setup(array: any[]) {
    this.array = [...new Set(mergeSort(array))];
    this.root = buildTree(this.array);
  }
  height(node) {
    if (!node) return -1;
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    return leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1;
  }
  delete(value: number) {
    let index = this.array.indexOf(value);
    if (index > -1) {
      this.array.splice(index, 1);
      this.setup(this.array);
    } else {
      return "Enter a valid number";
    }
  }
  insert(value: number) {
    this.array.push(value);
    this.setup(this.array);
  }
}
function buildTree(array: number[], start = 0, end = array.length - 1) {
  if (start > end) return null;
  let middle = Math.floor((start + end) / 2);
  let rootNode = new Node(array[middle]);
  rootNode.left = buildTree(array, start, middle - 1);
  rootNode.right = buildTree(array, middle + 1, end);
  return rootNode;
}
