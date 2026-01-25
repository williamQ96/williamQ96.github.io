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
            
            const orderPayload = {
                to_name: 'Owner',
                from_name: this.contactInfo,
                message: JSON.stringify(this.cart, null, 2),
                total: this.cartTotal.toFixed(2)
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
                this.isCartOpen = false;
            } catch (err) {
                console.error('Checkout failed', err);
                alert('Failed to place order. Please try again.');
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
