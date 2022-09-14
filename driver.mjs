import { prettyPrint } from "./prettyPrint.mjs";
import Tree from "./tree.mjs";
const randomArray = (size) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
};
const tree = new Tree(randomArray(50));
console.log("The tree:\n");
prettyPrint(tree.root);
console.log("Balanced:", tree.isBalanced());
console.log("Balues from level order:", tree.levelOrder());
console.log("Values from preorder:", tree.preorder());
console.log("Values from inorder:", tree.inorder());
console.log("Values from postorder:", tree.postorder());
console.log("Insert outlier 100000:\n");
tree.insert(100000);
prettyPrint(tree.root);
