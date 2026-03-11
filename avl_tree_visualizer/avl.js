class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    height(node) {
        if (!node) return 0;
        return node.height;
    }

    updateHeight(node) {
        if (!node) return;
        node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
    }

    getBalance(node) {
        if (!node) return 0;
        return this.height(node.left) - this.height(node.right);
    }

    rotateRight(y) {
        let x = y.left;
        let T2 = x.right;
        x.right = y;
        y.left = T2;
        this.updateHeight(y);
        this.updateHeight(x);
        return x;
    }

    rotateLeft(x) {
        let y = x.right;
        let T2 = y.left;
        y.left = x;
        x.right = T2;
        this.updateHeight(x);
        this.updateHeight(y);
        return y;
    }

    insert(node, value) {
        if (!node) return new Node(value);

        if (value < node.value) {
            node.left = this.insert(node.left, value);
        } else if (value > node.value) {
            node.right = this.insert(node.right, value);
        } else {
            return node; // Duplicate values are not allowed
        }

        this.updateHeight(node);

        const balance = this.getBalance(node);

        // Left Left Case
        if (balance > 1 && value < node.left.value) {
            if (this.onRotate) this.onRotate('LL', node.value);
            return this.rotateRight(node);
        }

        // Right Right Case
        if (balance < -1 && value > node.right.value) {
            if (this.onRotate) this.onRotate('RR', node.value);
            return this.rotateLeft(node);
        }

        // Left Right Case
        if (balance > 1 && value > node.left.value) {
            if (this.onRotate) this.onRotate('LR', node.value);
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }

        // Right Left Case
        if (balance < -1 && value < node.right.value) {
            if (this.onRotate) this.onRotate('RL', node.value);
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }

        return node;
    }

    insertValue(value) {
        this.root = this.insert(this.root, value);
    }

    findMin(node) {
        while (node && node.left !== null) {
            node = node.left;
        }
        return node;
    }

    delete(node, value) {
        if (!node) return null;

        if (value < node.value) {
            node.left = this.delete(node.left, value);
        } else if (value > node.value) {
            node.right = this.delete(node.right, value);
        } else {
            node = this._deleteNode(node);
        }

        if (!node) return null;
        
        return this._balanceNode(node);
    }

    _deleteNode(node) {
        if (!node.left || !node.right) {
            return node.left || node.right;
        } else {
            const temp = this.findMin(node.right);
            node.value = temp.value;
            node.right = this.delete(node.right, temp.value);
            return node;
        }
    }

    _balanceNode(node) {
        this.updateHeight(node);
        const balance = this.getBalance(node);

        if (balance > 1 && this.getBalance(node.left) >= 0) {
            if (this.onRotate) this.onRotate('LL', node.value);
            return this.rotateRight(node);
        }

        if (balance > 1 && this.getBalance(node.left) < 0) {
            if (this.onRotate) this.onRotate('LR', node.value);
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }

        if (balance < -1 && this.getBalance(node.right) <= 0) {
            if (this.onRotate) this.onRotate('RR', node.value);
            return this.rotateLeft(node);
        }

        if (balance < -1 && this.getBalance(node.right) > 0) {
            if (this.onRotate) this.onRotate('RL', node.value);
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }

        return node;
    }

    deleteValue(value) {
        this.root = this.delete(this.root, value);
    }
}
