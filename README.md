# TechPattern Electronics | Design Patterns

## Project Information

| Field | Details |
| :--- | :--- |
| **Project Name** | TechPattern Electronics |
| **Student Name(s)** | [ENTER STUDENT NAME HERE] |
| **Student ID(s)** | [ENTER STUDENT ID HERE] |
| **University Email(s)** | [ENTER EMAIL HERE] |

## Project Description and Objectives

**TechPattern Electronics** is a conceptual e-commerce dashboard developed to demonstrate the practical application of **Object-Oriented Design Patterns** in a modern web environment. The project simulates a high-end electronics store ("TechPattern") where each feature represents a specific design pattern solving a concrete software design problem.

### Objectives
1.  **Demonstrate Behavioral & Creational Patterns**: clearly implement patterns like Abstract Factory, Builder, Composite, Adapter, Bridge, and Factory Method.
2.  **Clean Architecture**: Separation of concerns between the UI (HTML/CSS) and logic (JavaScript classes).
3.  **Visual Feedback**: Use a modern, responsive UI to visually represent the state changes triggered by these patterns.

### Design Patterns Implemented

*   **Abstract Factory**: Used for the "Brand Ecosystems" to ensure cross-compatibility between Laptops and Phones of the same brand (Apple vs. Samsung).
*   **Builder Pattern**: Used in the "Custom PC Configurator" to construct complex PC objects with various optional components (GPU, RAM, RGB).
*   **Composite Pattern**: Used for "Product Bundles" to treat a group of products (Laptop + Phone + Charger) as a single Product entity.
*   **Adapter Pattern**: Used to integrate "Legacy Inventory Items" (e.g., Floppy Disks) into the modern shopping cart system.
*   **Bridge Pattern**: Decouples the shipping abstraction (Standard vs. Express) from the carrier implementation (FedEx, UPS, DHL).
*   **Factory Method**: Encapsulates the creation of different payment processors (Credit Card vs. PayPal).
*   **Singleton Pattern**: Ensures only one instance of the `Cart` exists throughout the application lifecycle.

---

## Source Code

Below is the complete source code for the project.

### 1. `index.html`
**Description**: THe main structure of the application, defining sections for each design pattern demonstration.

<details>
<summary>Click to view index.html</summary>

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechPattern Electronics | Design Patterns</title>
    <!-- Google Fonts: Outfit -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <!-- Lucide Icons (for placeholders) -->
    <script src="https://unpkg.com/lucide@latest"></script>
</head>

<body>

    <header>
        <div class="header-content">
            <div class="logo">
                TechPattern
            </div>
            <div id="cart-status" class="cart-summary">
                <span class="cart-icon">🛒</span>
                <span id="cart-count">0</span> items | $<span id="cart-total">0.00</span>
            </div>
        </div>
    </header>

    <section class="hero">
        <div class="container">
            <h1>
                Engineered with Patterns.
                <span>Built for Performance.</span>
            </h1>
            <p>Experience the perfect fusion of Object-Oriented Design and Premium Electronics.</p>
        </div>
    </section>

    <div class="container">

        <!-- 1. ABSTRACT FACTORY -->
        <section class="pattern-section">
            <div class="section-header">
                <div>
                    <h2 class="section-title">Brand Ecosystems</h2>
                    <div class="section-desc">
                        Choose a brand family. The <strong>Abstract Factory</strong> ensures you get matching components
                        (Laptop + Phone)
                        for that specific ecosystem, preventing incompatible sets.
                    </div>
                </div>
                <span class="pattern-badge">Abstract Factory</span>
            </div>

            <div style="margin-bottom: 2rem; display: flex; gap: 1rem;">
                <button onclick="app.renderBrandProducts('Fruit')" style="width: auto;">
                    Apple Ecosystem
                </button>
                <button onclick="app.renderBrandProducts('Robo')" class="secondary" style="width: auto;">
                    Samsung Ecosystem
                </button>
            </div>
            <div id="brand-products" class="grid">
                <!-- Products rendered here via JS -->
            </div>
        </section>

        <!-- 2. BUILDER -->
        <section class="pattern-section">
            <div class="section-header">
                <div>
                    <h2 class="section-title">Custom PC Configurator</h2>
                    <div class="section-desc">
                        Construct a complex PC object step-by-step. The <strong>Builder Pattern</strong> handles the
                        construction process,
                        allowing different representations using the same construction code.
                    </div>
                </div>
                <span class="pattern-badge">Builder</span>
            </div>

            <div class="card" style="max-width: 600px;">
                <div class="card-image-placeholder">🖥️</div>
                <h3>Gaming Rig Builder</h3>
                <div class="config-options">
                    <label><input type="radio" name="cpu" value="High-End CPU" checked> High-End CPU ($300)</label>
                    <label><input type="radio" name="cpu" value="Standard CPU"> Standard CPU ($150)</label>
                    <hr>
                    <label><input type="checkbox" id="opt-gpu"> Add Discrete GPU (+$500)</label>
                    <label><input type="checkbox" id="opt-ram"> Upgrade to 32GB RAM (+$100)</label>
                    <label><input type="checkbox" id="opt-rgb"> Add RGB Lighting Pack (+$50)</label>
                </div>
                <div class="price">Est. Price: <span id="builder-price">$???</span></div>
                <button onclick="app.buildAndAddPC()">Build & Add to Cart</button>
            </div>
        </section>

        <!-- 3. COMPOSITE & ADAPTER -->
        <section class="pattern-section">
            <div class="section-header">
                <div>
                    <h2 class="section-title">Bundles & Clearance</h2>
                    <div class="section-desc">
                        <strong>Composite</strong> treats groups of products like a single object.
                        <strong>Adapter</strong> wraps old inventory items to make them compatible with modern systems.
                    </div>
                </div>
                <span class="pattern-badge">Composite & Adapter</span>
            </div>

            <div class="grid">
                <!-- Composite Bundle -->
                <div class="card">
                    <div class="card-image-placeholder">🎁</div>
                    <h3>The "Starter" Bundle</h3>
                    <p>Contains: 1 Basic Laptop, 1 Basic Phone, 1 Charger.</p>
                    <div class="price">$1200.00</div>
                    <button onclick="app.addBundle()">Add Bundle to Cart</button>
                </div>

                <!-- Adapter Item -->
                <div class="card" style="border-color: rgba(244, 63, 94, 0.3);">
                    <div class="card-image-placeholder" style="color: #f43f5e;">💾</div>
                    <h3>Vintage Floppy Disk</h3>
                    <p>Source: Legacy Inventory System v1.0</p>
                    <div class="price">$5.00</div>
                    <button onclick="app.addLegacyItem()" class="secondary"
                        style="color: #f43f5e; border-color: #f43f5e;">Add Legacy Item</button>
                </div>
            </div>
        </section>

        <!-- 4. BRIDGE & FACTORY METHOD -->
        <section class="pattern-section">
            <div class="section-header">
                <div>
                    <h2 class="section-title">Checkout</h2>
                    <div class="section-desc">
                        <strong>Bridge</strong> decouples delivery speed from the carrier.
                        <strong>Factory Method</strong> creates the correct payment processor without tight coupling.
                    </div>
                </div>
                <span class="pattern-badge">Bridge & Factory</span>
            </div>

            <div class="checkout-area">
                <h3>Shipping Configuration</h3>
                <div class="checkout-row">
                    <select id="ship-speed">
                        <option value="standard">Standard Delivery</option>
                        <option value="express">Express Delivery (+$20)</option>
                    </select>
                    <select id="ship-carrier">
                        <option value="fedex">via FedEx</option>
                        <option value="ups">via UPS</option>
                        <option value="dhl">via DHL</option>
                    </select>
                </div>

                <h3>Payment Processing</h3>
                <div class="checkout-row">
                    <select id="payment-method">
                        <option value="credit">Credit Card</option>
                        <option value="paypal">PayPal</option>
                    </select>
                    <button onclick="app.processCheckout()">Complete Order</button>
                </div>
            </div>
        </section>

        <!-- SYSTEM LOG (Hidden/Minimized by default, could be a footer) -->
        <div class="log-panel" id="sys-log">
            <div class="log-entry">> System initialized. Waiting for user actions...</div>
        </div>

    </div>

    <!-- TOAST CONTAINER -->
    <div id="toast-container"></div>

    <script src="script.js"></script>
    <script>
        // Init Lucide icons
        lucide.createIcons();
    </script>
</body>

</html>
```
</details>

### 2. `style.css`
**Description**: Defines the "Glassmorphism" and "Neon" aesthetic, ensuring a premium user experience with responsive design.

<details>
<summary>Click to view style.css</summary>

```css
:root {
    /* Base Colors */
    --bg-dark: #020617;
    /* Slate 950 */
    --bg-card: #0f172a;
    /* Slate 900 */
    --text-main: #f8fafc;
    /* Slate 50 */
    --text-muted: #94a3b8;
    /* Slate 400 */

    /* Accents (Neon) */
    --primary: #06b6d4;
    /* Cyan 500 */
    --primary-glow: rgba(6, 182, 212, 0.4);
    --secondary: #a855f7;
    /* Purple 500 */
    --secondary-glow: rgba(168, 85, 247, 0.4);
    --accent: #f43f5e;
    /* Rose 500 */

    /* Glassmorphism */
    --glass-surface: rgba(15, 23, 42, 0.6);
    --glass-border: rgba(255, 255, 255, 0.08);
    --glass-highlight: rgba(255, 255, 255, 0.05);

    /* Functional */
    --success: #10b981;
    /* Emerald 500 */
    --radius-lg: 24px;
    --radius-md: 12px;
    --radius-sm: 8px;
    --font-sans: 'Outfit', sans-serif;
}

body {
    font-family: var(--font-sans);
    background-color: var(--bg-dark);
    /* Complex Gradient Background */
    background-image:
        radial-gradient(circle at 15% 50%, rgba(168, 85, 247, 0.08), transparent 25%),
        radial-gradient(circle at 85% 30%, rgba(6, 182, 212, 0.08), transparent 25%);
    color: var(--text-main);
    margin: 0;
    min-height: 100vh;
    padding-bottom: 100px;
    overflow-x: hidden;
}

/* ================= HEADER ================= */
header {
    background: rgba(2, 6, 23, 0.85);
    /* Darker, slightly opaque */
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--glass-border);
    position: sticky;
    top: 0;
    z-index: 1000;
    padding: 1rem 0;
}

.header-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: -0.05em;
    background: linear-gradient(135deg, #fff 0%, var(--primary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: flex;
    align-items: center;
    gap: 10px;
}

.logo::before {
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    background: var(--primary);
    border-radius: 50%;
    box-shadow: 0 0 15px var(--primary);
}

.cart-summary {
    display: flex;
    align-items: center;
    gap: 20px;
    background: rgba(255, 255, 255, 0.03);
    padding: 8px 20px;
    border-radius: 99px;
    border: 1px solid var(--glass-border);
    transition: all 0.3s ease;
}

.cart-summary:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
}

.cart-icon {
    font-size: 1.2rem;
}

.cart-total {
    color: var(--primary);
    font-weight: 600;
    margin-left: 5px;
}


/* ================= HERO SECTION ================= */
.hero {
    position: relative;
    padding: 6rem 2rem 4rem;
    text-align: center;
    border-bottom: 1px solid var(--glass-border);
    background: radial-gradient(circle at center, rgba(6, 182, 212, 0.05) 0%, transparent 70%);
}

.hero h1 {
    font-size: 4rem;
    line-height: 1.1;
    margin-bottom: 1rem;
    letter-spacing: -0.03em;
}

.hero h1 span {
    display: block;
    background: linear-gradient(to right, var(--secondary), var(--primary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.hero p {
    font-size: 1.25rem;
    color: var(--text-muted);
    max-width: 600px;
    margin: 0 auto 3rem;
}


/* ================= LAYOUT & GRID ================= */
.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}


/* ================= SECTIONS ================= */
.pattern-section {
    margin-bottom: 6rem;
    position: relative;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--glass-border);
}

.section-title {
    font-size: 2rem;
    font-weight: 700;
    color: #fff;
    margin: 0;
}

.pattern-badge {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 700;
    color: var(--secondary);
    background: rgba(168, 85, 247, 0.1);
    padding: 6px 16px;
    border-radius: 99px;
    border: 1px solid rgba(168, 85, 247, 0.2);
}

.section-desc {
    color: var(--text-muted);
    max-width: 700px;
    margin-top: 1rem;
    font-size: 1.1rem;
    line-height: 1.6;
}


/* ================= CARDS ================= */
.card {
    background: var(--glass-surface);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    padding: 2rem;
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: flex;
    flex-direction: column;
}

.card:hover {
    transform: translateY(-8px);
    border-color: rgba(6, 182, 212, 0.3);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
}

.card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: radial-gradient(circle at 50% -20%, var(--glass-highlight), transparent 70%);
    opacity: 0.5;
    pointer-events: none;
}

/* Image Placeholder for Cards */
.card-image-placeholder {
    width: 100%;
    height: 160px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.06));
    border-radius: var(--radius-md);
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: rgba(255, 255, 255, 0.2);
}

.card h3 {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
}

.card .price {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-main);
    margin: auto 0 1.5rem 0;
    /* Push to bottom */
}


/* ================= BUTTONS & FORMS ================= */
button {
    background: linear-gradient(135deg, var(--primary), #0891b2);
    color: white;
    font-weight: 600;
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all 0.2s;
    font-family: inherit;
    font-size: 0.95rem;
    text-transform: none;
}

button:hover {
    box-shadow: 0 0 25px var(--primary-glow);
    transform: scale(1.02);
}

button.secondary {
    background: transparent;
    border: 1px solid var(--glass-border);
    color: var(--text-muted);
}

button.secondary:hover {
    background: rgba(255, 255, 255, 0.05);
    color: white;
    box-shadow: none;
    border-color: white;
}

.config-options {
    background: rgba(0, 0, 0, 0.2);
    padding: 1.5rem;
    border-radius: var(--radius-md);
    margin: 1rem 0;
}

/* Custom Checkbox/Radio */
input[type="radio"],
input[type="checkbox"] {
    accent-color: var(--primary);
    transform: scale(1.2);
    margin-right: 10px;
}

label {
    display: block;
    padding: 8px 0;
    color: var(--text-muted);
    cursor: pointer;
    transition: color 0.2s;
}

label:hover {
    color: white;
}


/* ================= TOAST NOTIFICATIONS ================= */
#toast-container {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.toast {
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid var(--glass-border);
    border-left: 4px solid var(--primary);
    padding: 1rem 1.5rem;
    border-radius: var(--radius-sm);
    color: white;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    min-width: 300px;
    animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.toast-msg {
    font-weight: 500;
    font-size: 0.95rem;
}

.toast-meta {
    font-size: 0.75rem;
    color: var(--text-muted);
    margin-top: 4px;
    display: block;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}


/* ================= SYSTEM LOG (DEV HUD) ================= */
.log-panel {
    border-top: 1px solid var(--glass-border);
    background: #000;
    font-family: 'Courier New', monospace;
    padding: 2rem;
    color: var(--text-muted);
    font-size: 0.85rem;
}

.log-entry {
    margin-bottom: 5px;
    opacity: 0.7;
}

.log-entry:first-child {
    opacity: 1;
    color: var(--primary);
}
```
</details>

### 3. `script.js`
**Description**: Contains the core logic implementation of all Design Patterns.

<details>
<summary>Click to view script.js</summary>

```javascript
/**
 * SYSTEM LOGGER & TOASIFICATIONS
 */
const Logger = {
    log: (message, patternName) => {
        // 1. Add to the hidden/minimized log panel
        const consoleEl = document.getElementById('sys-log');
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.innerHTML = `<span class="log-pattern">[${patternName}]</span> ${message}`;
        consoleEl.prepend(entry);

        // 2. Show a Toast Notification
        Toast.show(message, patternName);
    }
};

const Toast = {
    show: (msg, title) => {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div>
                <div class="toast-msg">${title} Action</div>
                <span class="toast-meta">${msg}</span>
            </div>
            <span>→</span>
        `;
        container.appendChild(toast);

        // Remove after 4 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }
};

/* ==========================================================================
    1. SINGLETON PATTERN (Lecture 2)
    ========================================================================== */
const Cart = (function () {
    let instance;

    function createInstance() {
        const items = [];

        return {
            addItem: function (product) {
                items.push(product);
                this.updateUI();
                Logger.log(`Added "${product.getName()}" to Cart`, "Singleton");
            },
            getItems: () => items,
            getTotal: function () {
                return items.reduce((sum, item) => sum + item.getPrice(), 0);
            },
            clear: function () {
                items.length = 0;
                this.updateUI();
            },
            updateUI: function () {
                document.getElementById('cart-count').innerText = items.length;
                document.getElementById('cart-total').innerText = this.getTotal().toFixed(2);

                // Animate cart
                const cartEl = document.getElementById('cart-status');
                cartEl.style.transform = 'scale(1.1)';
                setTimeout(() => cartEl.style.transform = 'scale(1)', 200);
            }
        };
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();


/* ==========================================================================
    CORE PRODUCT INTERFACE
    ========================================================================== */
class Product {
    getName() { throw new Error("Method 'getName()' must be implemented."); }
    getPrice() { throw new Error("Method 'getPrice()' must be implemented."); }
}


/* ==========================================================================
    2. ABSTRACT FACTORY PATTERN (Lecture 4)
    ========================================================================== */

// Concrete Products
class FruitLaptop extends Product {
    getName() { return "APPLE MacBook Pro"; }
    getPrice() { return 2000; }
}
class FruitPhone extends Product {
    getName() { return "APPLE iPhone 15"; }
    getPrice() { return 1000; }
}

class RoboLaptop extends Product {
    getName() { return "SAMSUNG ThinkPad"; }
    getPrice() { return 1500; }
}
class RoboPhone extends Product {
    getName() { return "SAMSUNG Galaxy S24"; }
    getPrice() { return 900; }
}

// The Abstract Factory Interface
class TechFactory {
    createLaptop() { }
    createPhone() { }
}

// Concrete Factory 1
class FruitFactory extends TechFactory {
    createLaptop() { return new FruitLaptop(); }
    createPhone() { return new FruitPhone(); }
}

// Concrete Factory 2
class RoboFactory extends TechFactory {
    createLaptop() { return new RoboLaptop(); }
    createPhone() { return new RoboPhone(); }
}


/* ==========================================================================
    3. BUILDER PATTERN (Lecture 5)
    ========================================================================== */
class CustomPC extends Product {
    constructor() {
        super();
        this.parts = [];
        this.cost = 0;
    }
    addPart(name, price) {
        this.parts.push(name);
        this.cost += price;
    }
    getName() { return `Custom PC (${this.parts.join(', ')})`; }
    getPrice() { return this.cost; }
}

class PCBuilder {
    constructor() {
        this.pc = new CustomPC();
    }
    addCPU(type, price) {
        this.pc.addPart(type, price);
        return this;
    }
    addGPU() {
        this.pc.addPart("RTX 4090 GPU", 500);
        return this;
    }
    addRAM() {
        this.pc.addPart("32GB RAM", 100);
        return this;
    }
    addRGB() {
        this.pc.addPart("RGB Lights", 50);
        return this;
    }
    build() {
        return this.pc;
    }
}


/* ==========================================================================
    4. COMPOSITE PATTERN (Lecture 8)
    ========================================================================== */
class ProductBundle extends Product {
    constructor(name) {
        super();
        this.name = name;
        this.children = [];
    }

    add(product) {
        this.children.push(product);
    }

    getName() {
        return `${this.name} [Contains: ${this.children.length} items]`;
    }

    getPrice() {
        let total = 0;
        this.children.forEach(child => {
            total += child.getPrice();
        });
        return total * 0.9;
    }
}


/* ==========================================================================
    5. ADAPTER PATTERN (Lecture 6)
    ========================================================================== */
class LegacyInventoryItem {
    constructor(name, costInCents) {
        this.sku = name;
        this.pennies = costInCents;
    }
    getSKU() { return this.sku; }
    getCostInCents() { return this.pennies; }
}

class LegacyAdapter extends Product {
    constructor(legacyItem) {
        super();
        this.legacyItem = legacyItem;
    }

    getName() {
        return this.legacyItem.getSKU() + " (Clearance)";
    }

    getPrice() {
        return this.legacyItem.getCostInCents() / 100;
    }
}


/* ==========================================================================
    6. BRIDGE PATTERN (Lecture 7)
    ========================================================================== */
class Carrier {
    ship(itemNames) { throw new Error("ship() undefined"); }
}

class FedEx extends Carrier {
    ship(itemNames) { return `FedEx Plane carrying: ${itemNames}`; }
}
class UPS extends Carrier {
    ship(itemNames) { return `UPS Brown Truck carrying: ${itemNames}`; }
}
class DHL extends Carrier {
    ship(itemNames) { return `DHL Cargo Ship carrying: ${itemNames}`; }
}

class Delivery {
    constructor(carrier) {
        this.carrier = carrier;
    }
    deliver(items) { }
}

class StandardDelivery extends Delivery {
    deliver(items) {
        Logger.log(`Standard: ${this.carrier.ship(items)}`, "Bridge");
        return "Arrives in 5-7 days";
    }
}
class ExpressDelivery extends Delivery {
    deliver(items) {
        Logger.log(`EXPRESS: ${this.carrier.ship(items)}`, "Bridge");
        return "Arrives Tomorrow!";
    }
}


/* ==========================================================================
    7. FACTORY METHOD PATTERN (Lecture 3)
    ========================================================================== */
class PaymentProcessor {
    pay(amount) { }
}

class CreditCardProcessor extends PaymentProcessor {
    pay(amount) { Logger.log(`Charged $${amount} to Visa/Mastercard.`, "Factory Method"); }
}

class PayPalProcessor extends PaymentProcessor {
    pay(amount) { Logger.log(`Redirected to PayPal for $${amount}.`, "Factory Method"); }
}

class PaymentFactory {
    static createProcessor(type) {
        if (type === 'credit') return new CreditCardProcessor();
        if (type === 'paypal') return new PayPalProcessor();
        throw new Error("Unknown payment type");
    }
}


/* ==========================================================================
    APPLICATION LOGIC (Controller)
    ========================================================================== */
const app = {

    // Abstract Factory Usage
    renderBrandProducts: (brandType) => {
        let factory;
        if (brandType === 'Fruit') factory = new FruitFactory();
        else factory = new RoboFactory();

        Logger.log(`Initialized ${brandType}Factory. Creating family...`, "Abstract Factory");

        const laptop = factory.createLaptop();
        const phone = factory.createPhone();

        // Helper to guess icon
        const lapIcon = brandType === 'Fruit' ? '💻' : '⚫';
        const phoneIcon = brandType === 'Fruit' ? '📱' : '📲';
        const accentColor = brandType === 'Fruit' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(6, 182, 212, 0.1)';

        const container = document.getElementById('brand-products');
        container.innerHTML = `
    <div class="card" style="border-top: 4px solid ${brandType === 'Fruit' ? '#a855f7' : '#06b6d4'}">
        <div class="card-image-placeholder" style="background: ${accentColor}">${lapIcon}</div>
        <h3>${laptop.getName()}</h3>
        <div class="price">$${laptop.getPrice()}</div>
        <button onclick="Cart.getInstance().addItem({ getName: () => '${laptop.getName()}', getPrice: () => ${laptop.getPrice()} })">Add to Cart</button>
    </div>
    <div class="card" style="border-top: 4px solid ${brandType === 'Fruit' ? '#a855f7' : '#06b6d4'}">
        <div class="card-image-placeholder" style="background: ${accentColor}">${phoneIcon}</div>
        <h3>${phone.getName()}</h3>
        <div class="price">$${phone.getPrice()}</div>
        <button onclick="Cart.getInstance().addItem({ getName: () => '${phone.getName()}', getPrice: () => ${phone.getPrice()} })">Add to Cart</button>
    </div>
`;
    },

    // Builder Usage
    buildAndAddPC: () => {
        Logger.log("Starting PC Builder...", "Builder");

        const builder = new PCBuilder();
        const cpuType = document.querySelector('input[name="cpu"]:checked').value;
        const cpuPrice = cpuType.includes("High-End") ? 300 : 150;

        builder.addCPU(cpuType, cpuPrice);

        if (document.getElementById('opt-gpu').checked) builder.addGPU();
        if (document.getElementById('opt-ram').checked) builder.addRAM();
        if (document.getElementById('opt-rgb').checked) builder.addRGB();

        const finalPC = builder.build();
        Cart.getInstance().addItem(finalPC);
    },

    // Composite Usage
    addBundle: () => {
        const laptop = new FruitLaptop();
        const phone = new FruitPhone();
        const charger = { getName: () => "Fast Charger", getPrice: () => 50 };

        const bundle = new ProductBundle("Student Starter Pack");
        bundle.add(laptop);
        bundle.add(phone);
        bundle.add(charger);

        Logger.log(`Created Composite Bundle.`, "Composite");
        Cart.getInstance().addItem(bundle);
    },

    // Adapter Usage
    addLegacyItem: () => {
        const oldItem = new LegacyInventoryItem("Floppy Disk 3.5", 500);
        const adaptedItem = new LegacyAdapter(oldItem);

        Logger.log(`Adapting legacy item...`, "Adapter");
        Cart.getInstance().addItem(adaptedItem);
    },

    // Bridge & Factory Method Usage
    processCheckout: () => {
        const cart = Cart.getInstance();
        if (cart.getItems().length === 0) {
            Toast.show("Your cart is empty!", "Checkout Failed");
            return;
        }

        // Bridge
        const speed = document.getElementById('ship-speed').value;
        const carrierName = document.getElementById('ship-carrier').value;

        let carrierImpl;
        switch (carrierName) {
            case 'fedex': carrierImpl = new FedEx(); break;
            case 'ups': carrierImpl = new UPS(); break;
            case 'dhl': carrierImpl = new DHL(); break;
        }

        let deliveryRefined;
        if (speed === 'standard') deliveryRefined = new StandardDelivery(carrierImpl);
        else deliveryRefined = new ExpressDelivery(carrierImpl);

        const itemsList = cart.getItems().map(i => i.getName()).join(", ");
        const deliveryStatus = deliveryRefined.deliver(itemsList);

        // Factory Method
        const payMethod = document.getElementById('payment-method').value;
        const processor = PaymentFactory.createProcessor(payMethod);
        processor.pay(cart.getTotal());

        alert(`Order Placed!\n\nShipping: ${deliveryStatus}\nVia: ${carrierName.toUpperCase()}\n\nThank you for shopping at TechPattern!`);
        cart.clear();
    }
};

// Initialize
app.renderBrandProducts('Fruit');
```
</details>
