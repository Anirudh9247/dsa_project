document.addEventListener('DOMContentLoaded', () => {
    const tree = new AVLTree();
    const visualizer = new AVLVisualizer(tree, 'tree-container');
    const logContainer = document.getElementById('log');

    const insertBtn = document.getElementById('insert-btn');
    const deleteBtn = document.getElementById('delete-btn');
    const resetBtn = document.getElementById('reset-btn');
    const valueInput = document.getElementById('node-value');

    const log = (message, type = 'info') => {
        const logEntry = document.createElement('div');
        logEntry.classList.add('log-entry', type);
        logEntry.textContent = message;
        logContainer.appendChild(logEntry);
        logContainer.scrollTop = logContainer.scrollHeight;
    };

    insertBtn.addEventListener('click', () => {
        const value = parseInt(valueInput.value, 10);
        if (isNaN(value)) {
            log('Invalid input: Please enter a number.', 'error');
            return;
        }
        tree.insertValue(value);
        visualizer.draw();
        log(`Inserted ${value}`, 'insert');
        valueInput.value = '';
    });

    deleteBtn.addEventListener('click', () => {
        const value = parseInt(valueInput.value, 10);
        if (isNaN(value)) {
            log('Invalid input: Please enter a number.', 'error');
            return;
        }
        tree.deleteValue(value);
        visualizer.draw();
        log(`Deleted ${value}`, 'delete');
        valueInput.value = '';
    });

    resetBtn.addEventListener('click', () => {
        tree.root = null;
        visualizer.draw();
        log('Tree has been reset.', 'info');
    });

    // Initial draw
    visualizer.draw();
});