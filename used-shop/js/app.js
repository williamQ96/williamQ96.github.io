// src/js/app.js
import { CONFIG } from './config.js';

const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            products: [],
            loading: true,
            error: null,
            selectedCategory: 'All',
            cart: [],
            isCartOpen: false,
            contactInfo: '',
            orderNote: '',
            isCheckingOut: false
        }
    },
    // ... computed ...
    computed: {
        // ... existing computed ...
        categories() {
            const cats = new Set(this.products.map(p => p.category));
            return ['All', ...cats];
        },
        filteredProducts() {
            if (this.selectedCategory === 'All') {
                return this.products;
            }
            return this.products.filter(p => p.category === this.selectedCategory);
        },
        cartTotal() {
            return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        },
        cartCount() {
            return this.cart.reduce((sum, item) => sum + item.quantity, 0);
        }
    },
    methods: {
        // ... existing methods ...
        addToCart(product) {
            const existing = this.cart.find(item => item.id === product.id);
            if (existing) {
                existing.quantity++;
            } else {
                this.cart.push({ ...product, quantity: 1 });
            }
        },
        removeFromCart(productId) {
            const idx = this.cart.findIndex(item => item.id === productId);
            if (idx > -1) {
                this.cart.splice(idx, 1);
            }
        },
        toggleCart() {
            this.isCartOpen = !this.isCartOpen;
        },
        async checkout() {
            if (!this.contactInfo) {
                alert('Please enter your contact info.');
                return;
            }

            this.isCheckingOut = true;

            // Construct HTML Table for Order Items
            const itemsHtml = this.cart.map(item => `
                <tr style="vertical-align: top">
                    <td style="padding: 12px 8px 0 4px; width: 64px;">
                        <img style="height: 64px; width: 64px; object-fit: cover; border-radius: 4px;" src="https://williamq96.github.io/used-shop/${item.image}" alt="${item.name}" />
                    </td>
                    <td style="padding: 12px 8px 0 8px;">
                        <div style="font-weight: bold;">${item.name}</div>
                        <div style="font-size: 14px; color: #666; padding-top: 4px;">Qty: ${item.quantity}</div>
                    </td>
                    <td style="padding: 12px 4px 0 0; white-space: nowrap; font-weight: bold; text-align: right;">
                        $${(item.price * item.quantity).toFixed(2)}
                    </td>
                </tr>
            `).join('');

            const orderPayload = {
                to_name: 'Owner',
                from_name: this.contactInfo, // Just the contact info now
                order_note: this.orderNote || 'No notes',
                order_items: `<table style="width: 100%; border-collapse: collapse;">${itemsHtml}</table>`,
                total: this.cartTotal.toFixed(2),
                order_id: `ORD-${Date.now().toString().slice(-6)}`
            };

            try {
                // Initialize EmailJS (should be done once, but ensuring here or in mounted)
                // emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY); // Assuming init is done or using send with Key

                await emailjs.send(
                    CONFIG.EMAILJS_SERVICE_ID,
                    CONFIG.EMAILJS_TEMPLATE_ID,
                    orderPayload,
                    CONFIG.EMAILJS_PUBLIC_KEY
                );

                alert('Thank you! We will contact you shortly.');
                this.cart = [];
                this.contactInfo = '';
                this.orderNote = '';
                this.isCartOpen = false;
            } catch (err) {
                console.error('Checkout failed', err);
                // Show more detailed error to help debugging
                const msg = err.text || err.message || JSON.stringify(err);
                alert(`Failed to place order. Error: ${msg}`);
            } finally {
                this.isCheckingOut = false;
            }
        }
    },
    // ... watch and created ...
    watch: {
        cart: {
            handler(newCart) {
                localStorage.setItem('svshop_cart', JSON.stringify(newCart));
            },
            deep: true
        }
    },
    async created() {
        // Load cart from storage
        const storedCart = localStorage.getItem('svshop_cart');
        if (storedCart) {
            try {
                this.cart = JSON.parse(storedCart);
            } catch (e) {
                console.error('Failed to parse cart', e);
            }
        }

        try {
            const response = await fetch('assets/products.json');
            if (!response.ok) throw new Error('Failed to load products');
            this.products = await response.json();
        } catch (err) {
            this.error = err.message;
            console.error(err);
        } finally {
            this.loading = false;
        }
    },
    mounted() {
        console.log('Vue App Mounted');
    }
});

app.mount('#app');
