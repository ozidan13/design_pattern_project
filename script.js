/**
 * SYSTEM LOGGER
 * Helper to visualize patterns in action for the user.
 */
const Logger = {
    log: (message, patternName) => {
        const consoleEl = document.getElementById('sys-log');
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.innerHTML = `<span class="log-pattern">[${patternName}]</span> ${message}`;
        consoleEl.prepend(entry);
    }
};

/* ==========================================================================
    1. SINGLETON PATTERN (Lecture 2)
    Why? We need exactly one Shopping Cart for the entire session. 
    Multiple carts would confuse the state (items/total).
    ========================================================================== */
const Cart = (function () {
    let instance;

    function createInstance() {
        const items = [];

        return {
            addItem: function (product) {
                items.push(product);
                this.updateUI();
                Logger.log(`Added "${product.getName()}" to global cart instance.`, "Singleton");
            },
            getItems: () => items,
            getTotal: function () {
                // Using reduce to sum prices. 
                // Note: Polimorphism allows getPrice() to work on Simple Products, Bundles (Composite), and Adapted Legacy items.
                return items.reduce((sum, item) => sum + item.getPrice(), 0);
            },
            clear: function () {
                items.length = 0;
                this.updateUI();
            },
            updateUI: function () {
                document.getElementById('cart-count').innerText = items.length;
                document.getElementById('cart-total').innerText = this.getTotal().toFixed(2);
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
    All items in the store (Simple, Composite, Adapted) must implement this.
    ========================================================================== */
class Product {
    getName() { throw new Error("Method 'getName()' must be implemented."); }
    getPrice() { throw new Error("Method 'getPrice()' must be implemented."); }
}


/* ==========================================================================
    2. ABSTRACT FACTORY PATTERN (Lecture 4)
    Why? We have families of products (Fruit vs Robo) that must match.
    This prevents a user from getting a 'Fruit OS' laptop with a 'Robo' charger.
    ========================================================================== */

// Concrete Products
class FruitLaptop extends Product {
    getName() { return "Fruit MacBook Pro"; }
    getPrice() { return 2000; }
}
class FruitPhone extends Product {
    getName() { return "Fruit iPhone 15"; }
    getPrice() { return 1000; }
}

class RoboLaptop extends Product {
    getName() { return "Robo ThinkPad"; }
    getPrice() { return 1500; }
}
class RoboPhone extends Product {
    getName() { return "Robo Galaxy S24"; }
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
    Why? A Custom PC has too many optional parameters (GPU, RAM, RGB).
    A single constructor with 10 nulls would be messy (Telescoping Constructor Problem).
    ========================================================================== */

// The Complex Product
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

// The Builder
class PCBuilder {
    constructor() {
        this.pc = new CustomPC();
    }

    // Steps
    addCPU(type, price) {
        this.pc.addPart(type, price);
        return this; // Method chaining
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
    Why? We want to sell "Bundles" that contain items.
    The Bundle should behave exactly like a Product (have a price, have a name).
    Recursive calculation makes getPrice() easy even for nested bundles.
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
        // Recursive calculation
        let total = 0;
        this.children.forEach(child => {
            total += child.getPrice();
        });
        return total * 0.9; // 10% discount for bundles!
    }
}


/* ==========================================================================
    5. ADAPTER PATTERN (Lecture 6)
    Why? We have a "LegacyInventoryItem" from an old system.
    It has incompatible methods (getCostInCents vs getPrice).
    We wrap it so the Cart can treat it like a normal Product.
    ========================================================================== */

// The Incompatible Class (Adaptee)
class LegacyInventoryItem {
    constructor(name, costInCents) {
        this.sku = name;
        this.pennies = costInCents;
    }
    getSKU() { return this.sku; }
    getCostInCents() { return this.pennies; }
}

// The Adapter
class LegacyAdapter extends Product {
    constructor(legacyItem) {
        super();
        this.legacyItem = legacyItem;
    }

    getName() {
        return this.legacyItem.getSKU() + " (Clearance)";
    }

    getPrice() {
        // Translate cents to dollars (Interface translation)
        return this.legacyItem.getCostInCents() / 100;
    }
}


/* ==========================================================================
    6. BRIDGE PATTERN (Lecture 7)
    Why? Shipping has two dimensions: "Speed" and "Carrier".
    Inheritance would cause class explosion (FedExExpress, FedExStandard, UPSExpress...).
    We separate Abstraction (DeliveryType) from Implementation (Carrier).
    ========================================================================== */

// Implementor Interface
class Carrier {
    ship(itemNames) { throw new Error("ship() undefined"); }
}

// Concrete Implementors
class FedEx extends Carrier {
    ship(itemNames) { return `FedEx Plane carrying: ${itemNames}`; }
}
class UPS extends Carrier {
    ship(itemNames) { return `UPS Brown Truck carrying: ${itemNames}`; }
}
class DHL extends Carrier {
    ship(itemNames) { return `DHL Cargo Ship carrying: ${itemNames}`; }
}

// Abstraction
class Delivery {
    constructor(carrier) {
        this.carrier = carrier; // Bridge happens here!
    }
    deliver(items) { }
}

// Refined Abstractions
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
    Why? To process payments, we don't want the checkout button to know exact API details.
    It just asks the Factory for a "Processor".
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
    Connecting UI to Patterns
    ========================================================================== */
const app = {

    // Abstract Factory Usage
    renderBrandProducts: (brandType) => {
        let factory;
        if (brandType === 'Fruit') factory = new FruitFactory();
        else factory = new RoboFactory();

        Logger.log(`Initialized ${brandType}Factory. Creating product family...`, "Abstract Factory");

        const laptop = factory.createLaptop();
        const phone = factory.createPhone();

        const container = document.getElementById('brand-products');
        container.innerHTML = `
    <div class="card">
        <h3>${laptop.getName()}</h3>
        <div class="price">$${laptop.getPrice()}</div>
        <button onclick="Cart.getInstance().addItem({ getName: () => '${laptop.getName()}', getPrice: () => ${laptop.getPrice()} })">Add to Cart</button>
    </div>
    <div class="card">
        <h3>${phone.getName()}</h3>
        <div class="price">$${phone.getPrice()}</div>
        <button onclick="Cart.getInstance().addItem({ getName: () => '${phone.getName()}', getPrice: () => ${phone.getPrice()} })">Add to Cart</button>
    </div>
`;
    },

    // Builder Usage
    buildAndAddPC: () => {
        Logger.log("Starting PC Builder sequence...", "Builder");

        const builder = new PCBuilder();

        // 1. Get Form Values
        const cpuType = document.querySelector('input[name="cpu"]:checked').value;
        const cpuPrice = cpuType.includes("High-End") ? 300 : 150;

        // 2. Step-by-step construction
        builder.addCPU(cpuType, cpuPrice);

        if (document.getElementById('opt-gpu').checked) builder.addGPU();
        if (document.getElementById('opt-ram').checked) builder.addRAM();
        if (document.getElementById('opt-rgb').checked) builder.addRGB();

        // 3. Get Result
        const finalPC = builder.build();

        Cart.getInstance().addItem(finalPC);
    },

    // Composite Usage
    addBundle: () => {
        // Create Leaf Nodes
        const laptop = new FruitLaptop();
        const phone = new FruitPhone();
        // Simple ad-hoc product
        const charger = { getName: () => "Fast Charger", getPrice: () => 50 };

        // Create Composite
        const bundle = new ProductBundle("Student Starter Pack");
        bundle.add(laptop);
        bundle.add(phone);
        bundle.add(charger);

        Logger.log(`Created Composite Bundle with 3 items. Total calculated recursively.`, "Composite");
        Cart.getInstance().addItem(bundle);
    },

    // Adapter Usage
    addLegacyItem: () => {
        const oldItem = new LegacyInventoryItem("Floppy Disk 3.5", 500); // 500 cents
        const adaptedItem = new LegacyAdapter(oldItem);

        Logger.log(`Adapting legacy item (500 cents) to system standard ($5.00).`, "Adapter");
        Cart.getInstance().addItem(adaptedItem);
    },

    // Bridge & Factory Method Usage
    processCheckout: () => {
        const cart = Cart.getInstance();
        if (cart.getItems().length === 0) {
            alert("Cart is empty!");
            return;
        }

        // 1. Handle Shipping (Bridge)
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

        // 2. Handle Payment (Factory Method)
        const payMethod = document.getElementById('payment-method').value;
        const processor = PaymentFactory.createProcessor(payMethod);
        processor.pay(cart.getTotal());

        alert(`Order Placed!\n\nShipping: ${deliveryStatus}\nVia: ${carrierName.toUpperCase()}\n\nCheck console log for design pattern details.`);
        cart.clear();
    }
};

// Initialize Default View
app.renderBrandProducts('Fruit');

