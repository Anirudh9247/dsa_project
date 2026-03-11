# AVL Tree Visualizer

An interactive and educational visualization tool for AVL Trees—a self-balancing Binary Search Tree. This project allows users to see how nodes are inserted, how tree balances itself, and visually demonstrates the rotations (LL, RR, LR, RL) in real-time.

---

## 🚀 Live Visuals
*(You can host this on GitHub Pages and link it here!)*

## 🛠️ Tech Stack
This project is built using purely native web technologies, making it lightweight, fast, and dependency-free:
- **HTML5**: For the structure of the visualizer interface.
- **CSS3**: For styling, layout, and smooth animations during node placement and rotations.
- **Vanilla JavaScript (ES6+)**: For implementing the AVL tree logic (`avl.js`), DOM manipulation, and dynamic rendering (`visualizer.js` and `app.js`).

## 📂 Project Structure
```text
├── avl_tree_visualizer/
│   ├── index.html       # The main visualizer application interface
│   ├── style.css        # Stylesheet for the UI and tree nodes
│   ├── app.js           # Core event listeners and user interactions
│   ├── avl.js           # The pure data structure logic for the AVL Tree
│   ├── visualizer.js    # Logic for rendering nodes and links on the screen
│   ├── avl.md           # A comprehensive theory document detailing how AVL trees work
│   ├── avl.test.js      # Unit tests for the AVL tree logic
│   └── test.html        # A simple testing interface
└── README.md            # You are here!
```

## 📖 AVL Theory Reference
We have included a detailed breakdown of the theory behind AVL Trees, covering:
- What balance factors are.
- Why AVL trees are preferred over standard BSTs.
- Detailed explanations of Single (LL, RR) and Double (LR, RL) rotations.
- Time & Space Complexities.

Read the full theory here: [avl_tree_visualizer/avl.md](./avl_tree_visualizer/avl.md).

## 💻 How to View & Run Locally

Since this project has no external dependencies like React or Node.js backends, running it is incredibly simple!

### Method 1: Direct File Open
Simply clone the repository and open the index file in your browser:
1. Clone this repo: `git clone https://github.com/Anirudh9247/dsa_project.git`
2. Navigate into the folder: `cd dsa_project/avl_tree_visualizer`
3. Double click on `index.html` to open it in Chrome, Firefox, or Safari.

### Method 2: Local Server (Recommended for Best Experience)
If you are using VS Code, we highly recommend the **Live Server** extension.
1. Open the project folder in VS Code.
2. Right-click `index.html` inside `avl_tree_visualizer/`.
3. Select **"Open with Live Server"**.

## 🤝 Contributing
Feel free to fork the project, add more interactive features (like node deletion visuals), and open a pull request!
