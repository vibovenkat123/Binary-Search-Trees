import { Node } from "./Node.mjs";
import { mergeSort } from "./merge.mjs";
class Tree {
    root;
    array = [];
    constructor(array) {
        this.setup(array);
    }
    inorder(func, currentNode = this.root, result = []) {
        if (currentNode === null) {
            return;
        }
        this.inorder(func, currentNode.left, result);
        if (func)
            func(currentNode);
        result.push(currentNode.data);
        this.inorder(func, currentNode.right, result);
        return result;
    }
    find(value) {
        let currentNode = this.root;
        while (currentNode) {
            if (currentNode.data == value) {
                return currentNode;
            }
            if (value > currentNode.data) {
                currentNode = currentNode.right;
            }
            else {
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
            }
            else {
                currentNode = currentNode.left;
            }
        }
        return false;
    }
    preorder(func, currentNode = this.root, result = []) {
        if (!currentNode)
            return;
        result.push(currentNode.data);
        if (func)
            func(currentNode);
        this.preorder(func, currentNode.left, result);
        this.preorder(func, currentNode.right, result);
        return result;
    }
    levelOrder(func, result = []) {
        const queue = [this.root];
        while (queue.length) {
            for (let i = 0; i < queue.length; i++) {
                const currentNode = queue.shift();
                if (currentNode.right)
                    queue.push(currentNode.right);
                if (currentNode.left)
                    queue.push(currentNode.left);
                result.push(currentNode.data);
                if (func)
                    func(currentNode);
            }
        }
        if (!func)
            return result;
    }
    postorder(func, currentNode = this.root, result = []) {
        if (!currentNode)
            return;
        this.postorder(func, currentNode.left, result);
        this.postorder(func, currentNode.right, result);
        result.push(currentNode.data);
        if (func)
            func(currentNode.data);
        return result;
    }
    setup(array) {
        this.array = [...new Set(mergeSort(array))];
        this.root = buildTree(this.array);
    }
    height(node) {
        if (!node)
            return -1;
        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);
        return leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1;
    }
    delete(value) {
        let index = this.array.indexOf(value);
        if (index > -1) {
            this.array.splice(index, 1);
            this.setup(this.array);
        }
        else {
            return "Enter a valid number";
        }
    }
    rebalance() {
        let array = [];
        this.inorder((item) => {
            array.push(item.data);
        });
        this.setup(array);
    }
    isBalanced(root = this.root) {
        if (!root)
            return true;
        let leftHeight = this.height(root.left);
        let rightHeight = this.height(root.right);
        if (Math.abs(leftHeight - rightHeight) <= 1 &&
            this.isBalanced(root.left) &&
            this.isBalanced(root.right))
            return true;
        return false;
    }
    insert(value) {
        this.array.push(value);
        this.setup(this.array);
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
export default Tree;
