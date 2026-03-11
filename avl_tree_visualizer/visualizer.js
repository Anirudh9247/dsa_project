class AVLVisualizer {
    constructor(tree, containerId) {
        this.tree = tree;
        this.container = document.getElementById(containerId);
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svg.setAttribute("width", "100%");
        this.svg.setAttribute("height", "100%");
        this.g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        this.svg.appendChild(this.g);
        this.container.appendChild(this.svg);
        
        this.nodeRadius = 30;
        this.nodeColor = "#3498db";
        this.highlightColor = "#e74c3c";
        this.balanceColor = "#2ecc71";
        this.lineColor = "#95a5a6";
        
        this.animationSpeed = 500;
        this.nodeElements = new Map(); // Map node reference to DOM element
        
        this.panZoom = null;
    }

    // Calculate positions for all nodes
    calculatePositions(node, x, y, depth, horizontalGap) {
        if (!node) return;

        node.x = x;
        node.y = y;

        const nextY = y + 100;
        const nextHorizontalGap = horizontalGap / 1.8; // Reduce the gap for lower levels

        if (node.left) {
            this.calculatePositions(node.left, x - horizontalGap, nextY, depth + 1, nextHorizontalGap);
        }
        if (node.right) {
            this.calculatePositions(node.right, x + horizontalGap, nextY, depth + 1, nextHorizontalGap);
        }
    }

    // Draw the tree with DOM element mapping
    draw() {
        this.g.innerHTML = '';
        this.nodeElements.clear();

        if (!this.tree.root) {
            if (this.panZoom) {
                this.panZoom.destroy();
                this.panZoom = null;
            }
            return;
        }

        // Calculate positions
        const containerWidth = Math.max(this.container.offsetWidth, 800);
        this.calculatePositions(this.tree.root, containerWidth / 2, 50, 0, containerWidth / 4);
        
        // Draw elements
        this.drawLines(this.tree.root);
        this.drawNodes(this.tree.root);

        // Instead of a blind timeout, wait for the next exact animation frame so the browser 
        // can guarantee SVG geometry is calculated before binding/updating the pan-zoom plugin.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (!this.panZoom) {
                    this.panZoom = svgPanZoom(this.svg, {
                        zoomEnabled: true,
                        controlIconsEnabled: true,
                        fit: true,
                        center: true,
                    });
                } else {
                    try {
                        this.panZoom.updateBBox();
                        this.panZoom.fit();
                        this.panZoom.center();
                    } catch (err) {
                        console.log("Ignored panZoom geometry warning:", err);
                    }
                }
            });
        });
    }

    drawLines(node) {
        if (!node) return;

        if (node.left) {
            this.drawLine(node, node.left);
            this.drawLines(node.left);
        }
        if (node.right) {
            this.drawLine(node, node.right);
            this.drawLines(node.right);
        }
    }

    drawLine(parent, child) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", parent.x);
        line.setAttribute("y1", parent.y);
        line.setAttribute("x2", child.x);
        line.setAttribute("y2", child.y);
        line.setAttribute("stroke", this.lineColor);
        line.setAttribute("stroke-width", 2);
        line.setAttribute("id", `line-${parent.value}-${child.value}`);
        this.g.appendChild(line);
    }

    drawNodes(node) {
        if (!node) return;

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", node.x);
        circle.setAttribute("cy", node.y);
        circle.setAttribute("r", this.nodeRadius);
        circle.setAttribute("fill", this.nodeColor);
        circle.setAttribute("stroke", "#2c3e50");
        circle.setAttribute("stroke-width", 2);
        circle.setAttribute("id", `node-${node.value}`);
        circle.setAttribute("class", "node-circle");
        
        // Add transition for smooth animation
        circle.style.transition = "all 0.5s ease";

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", node.x);
        text.setAttribute("y", node.y);
        text.setAttribute("dy", ".3em");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("fill", "white");
        text.setAttribute("font-family", "Arial");
        text.setAttribute("font-size", "16px");
        text.setAttribute("id", `text-${node.value}`);
        text.textContent = node.value;

        // Balance factor text
        const balanceText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        balanceText.setAttribute("x", node.x);
        balanceText.setAttribute("y", node.y + 45);
        balanceText.setAttribute("text-anchor", "middle");
        balanceText.setAttribute("fill", this.balanceColor);
        balanceText.setAttribute("font-family", "Arial");
        balanceText.setAttribute("font-size", "10px");
        balanceText.setAttribute("id", `balance-${node.value}`);
        balanceText.textContent = this.tree.getBalance(node);

        this.g.appendChild(circle);
        this.g.appendChild(text);
        this.g.appendChild(balanceText);

        // Store reference for animation
        this.nodeElements.set(node, { circle, text, balanceText });

        this.drawNodes(node.left);
        this.drawNodes(node.right);
    }

    // Animate a specific node
    async animateNode(node, color = null) {
        const elements = this.nodeElements.get(node);
        if (!elements) return;

        if (color) {
            elements.circle.setAttribute("fill", color);
        }

        await this.sleep(300);

        if (color) {
            elements.circle.setAttribute("fill", this.nodeColor);
        }
    }

    // Animate a line
    async animateLine(parent, child, color = null) {
        const line = document.getElementById(`line-${parent.value}-${child.value}`);
        if (!line) return;

        if (color) {
            line.setAttribute("stroke", color);
        }

        await this.sleep(300);

        if (color) {
            line.setAttribute("stroke", this.lineColor);
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}