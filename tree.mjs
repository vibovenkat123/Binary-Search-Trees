import { Node } from "./Node.mjs";
import { mergeSort } from "./merge.mjs";
class Tree {
    root;
    constructor(array) {
        array = [...new Set(mergeSort(array))];
        this.root = buildTree(array);
    }
}
function buildTree(array, start = 0, end = array.length - 1) {
    if (start > end)
        return null;
    let middle = Math.floor((start + end) / 2);
    let rootNode = new Node(array[middle]);
    rootNode.left = buildTree(array, start, middle - 1);
    rootNode.right = buildTree(array, middle + 1, end);
    return rootNode;
}
