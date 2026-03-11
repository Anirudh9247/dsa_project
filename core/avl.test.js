// A simple test suite for the AVLTree
const runAVLTests = () => {
    console.log('Running AVL Tree tests...');

    // We need a find method for testing, let's add it to the prototype
    AVLTree.prototype.find = function(node, value) {
        if (!node) return null;
        if (value < node.value) {
            return this.find(node.left, value);
        } else if (value > node.value) {
            return this.find(node.right, value);
        } else {
            return node;
        }
    };

    // Test 1: Insertion
    const tree = new AVLTree();
    tree.insertValue(10);
    tree.insertValue(20);
    tree.insertValue(30); // RR rotation
    console.assert(tree.root.value === 20, 'Test 1.1 Failed: RR rotation');
    console.assert(tree.root.left.value === 10, 'Test 1.2 Failed: RR rotation');
    console.assert(tree.root.right.value === 30, 'Test 1.3 Failed: RR rotation');

    tree.insertValue(5);
    tree.insertValue(3); // LL rotation
    console.assert(tree.root.left.value === 5, 'Test 1.4 Failed: LL rotation');
    console.assert(tree.root.left.left.value === 3, 'Test 1.5 Failed: LL rotation');
    
    // Test 2: Deletion
    tree.deleteValue(3); // Delete leaf
    console.assert(tree.find(tree.root, 3) === null, 'Test 2.1 Failed: Delete leaf');

    tree.deleteValue(10); // Delete node with two children
    console.assert(tree.find(tree.root, 10) === null, 'Test 2.2 Failed: Delete node with two children');
    
    // Test 3: FindMin
    const minNode = tree.findMin(tree.root);
    console.assert(minNode.value === 5, 'Test 3.1 Failed: findMin');

    console.log('AVL Tree tests completed.');
};

runAVLTests();