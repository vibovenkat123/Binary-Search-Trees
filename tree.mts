import { Node } from "./Node.mjs";
import { mergeSort } from "./merge.mjs";
class Tree {
  root: any;
  constructor(array) {
    array = [...new Set(mergeSort(array))];
    this.root = buildTree(array);
  }
}
function buildTree(array: number[], start = 0, end = array.length - 1) {
  if (start > end) return null;
  let middle = Math.floor((start + end) / 2);
  let rootNode = new Node(middle);
  rootNode.left = buildTree(array, start, middle - 1);
  rootNode.right = buildTree(array, middle + 1, end);
  return rootNode;
}
const prettyPrint = (node, array, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(
      node.right,
      array,
      `${prefix}${isLeft ? "│   " : "    "}`,
      false
    );
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${array[node.data]}`);
  if (node.left !== null) {
    prettyPrint(node.left, array, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
const arr = [5, 4, 7, 8, 2];
const test = new Tree(arr);
prettyPrint(test.root, arr);
