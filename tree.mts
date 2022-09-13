import { Node } from "./Node.mjs";
import { mergeSort } from "./merge.mjs";
import { prettyPrint } from "./prettyPrint.mjs";
class Tree {
  root: any;
  array = [];
  constructor(array) {
    this.setup(array);
  }
  setup(array) {
    this.array = [...new Set(mergeSort(array))];
    this.root = buildTree(this.array);
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
