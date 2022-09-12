import { Node } from "./Node";
import { mergeSort } from "./merge.js";
class Tree {
    root;
    constructor(array) {
        array = [...new Set(array)];
        this.root = buildTree(array);
    }
}
function buildTree(array, start = 0, end = array.length - 1) {
    if (start > end)
        return;
    array = mergeSort(array);
    let middle = Math.floor((start + end) / 2);
    let rootNode = new Node(middle);
    rootNode.left = buildTree(array, start, middle - 1);
    rootNode.right = buildTree(array, middle + 1, end);
    return rootNode;
}
