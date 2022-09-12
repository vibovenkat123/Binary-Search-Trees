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
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};
