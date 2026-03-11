# AVL Trees: A Comprehensive Theory

## 1. Introduction

An **AVL Tree** (named after its inventors Adelson-Velsky and Landis) is a self-balancing Binary Search Tree (BST). It was the first such data structure to be invented. In an AVL tree, the heights of the two child subtrees of any node differ by at most one; if at any time they differ by more than one, rebalancing is done to restore this property.

## 2. The Balance Factor

The balancing mechanism of an AVL tree is governed by the **Balance Factor**.
The Balance Factor (BF) of a node is calculated as:

```text
Balance Factor = Height(Left Subtree) - Height(Right Subtree)
```

*Note: Some implementations define it as `Height(Right) - Height(Left)`.*

For an AVL tree to be locally balanced at a node, the Balance Factor must be **-1, 0, or +1**.

- **BF = 1**: The left subtree is taller by 1.
- **BF = 0**: The left and right subtrees are of equal height.
- **BF = -1**: The right subtree is taller by 1.

If the absolute value of the balance factor exceeds 1 (i.e., BF < -1 or BF > 1) after an insertion or deletion, the tree violates the AVL property and must be rebalanced using **Rotations**.

## 3. Why Use AVL Trees?

In a standard Binary Search Tree, operations like search, minimum, maximum, insert, and delete take $O(h)$ time, where $h$ is the height of the tree. In the worst-case scenario (inserting already sorted data), a BST becomes heavily skewed (effectively a linked list), resulting in $O(n)$ time complexity.

AVL trees rigidly maintain a logarithmic height $O(\log n)$. This self-balancing property ensures that all fundamental operations—Search, Insertion, and Deletion—run in $O(\log n)$ time even in the worst case.

## 4. Rebalancing: Tree Rotations

When the AVL property is violated, tree rotations are performed to restore order without violating the underlying Binary Search Tree properties (in-order traversal must remain identical).

Rebalancing is done bottom-up: we find the first node (closest to the newly inserted/deleted node) that has a balance factor of +2 or -2, and perform rotations.

There are four primary cases of imbalance, requiring either a single or consecutive double rotation:

### 4.1. Single Rotations

Used when the newly inserted node and the unbalanced node's child lean in the same direction.

- **Left-Left (LL) Case $\rightarrow$ Right Rotation**
  Occurs when a node is inserted into the left subtree of the left child.
  *Fix:* Perform a single Right Rotation.

- **Right-Right (RR) Case $\rightarrow$ Left Rotation**
  Occurs when a node is inserted into the right subtree of the right child.
  *Fix:* Perform a single Left Rotation.

### 4.2. Double Rotations

Used when the newly inserted node and the unbalanced node's child lean in opposite directions.

- **Left-Right (LR) Case $\rightarrow$ Left-Right Rotation**
  Occurs when a node is inserted into the right subtree of the left child.
  *Fix:* First, perform a Left Rotation on the left child. This transforms the tree into an LL case. Then, perform a Right Rotation on the root.

- **Right-Left (RL) Case $\rightarrow$ Right-Left Rotation**
  Occurs when a node is inserted into the left subtree of the right child.
  *Fix:* First, perform a Right Rotation on the right child. This transforms the tree into an RR case. Then, perform a Left Rotation on the root.

## 5. Operations

### Insertion

1. Perform a standard BST insertion.
2. Update the height of current node.
3. Calculate the balance factor of the current node.
4. If the generic balance factor implies an imbalance (BF > 1 or BF < -1), identify the case (LL, RR, LR, RL) and perform the necessary rotations.

**Time Complexity**: $O(\log n)$

### Deletion

1. Perform a standard BST deletion.
2. Update the height of current node.
3. Calculate the balance factor of the current node.
4. If imbalanced, perform rotations. *Note: Unlike insertion which requires at most one rotation (or one double rotation) to fully rebalance the tree, deletion might require cascades of rotations up to the root.*

**Time Complexity**: $O(\log n)$

### Search

Searching in an AVL tree is exactly the same as in a standard BST.

**Time Complexity**: $O(\log n)$

## 6. Complexity Summary

| Operation | Average Case | Worst Case |
| :--- | :--- | :--- |
| **Search** | $O(\log n)$ | $O(\log n)$ |
| **Insert** | $O(\log n)$ | $O(\log n)$ |
| **Delete** | $O(\log n)$ | $O(\log n)$ |
| **Space** | $O(n)$ | $O(n)$ |

## 7. AVL Trees vs. Red-Black Trees

Both are widely used self-balancing binary search trees.

- **AVL Trees** are more strictly balanced than Red-Black trees. This means AVL trees provide faster lookups (searches) because the path to any node is minimized.
- **Red-Black Trees** require fewer rotations during insertion and deletion. For write-intensive applications, Red-Black Trees are often preferred (they are used in Java's `TreeMap` and C++'s `std::map`).
- Due to strict balancing, **AVL trees are best suited for read-intensive operations**.
