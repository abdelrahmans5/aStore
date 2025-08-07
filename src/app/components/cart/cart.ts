import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sproducts } from '../../services/sproducts';
import { Iproductsdata } from '../../interfaces/iproductsdata';

// Extended interface for cart items with quantity
interface CartItem extends Iproductsdata {
    quantity: number;
}

@Component({
    selector: 'app-cart',
    imports: [RouterLink],
    templateUrl: './cart.html',
    styleUrl: './cart.css'
})
export class Cart implements OnInit {
    private readonly sproducts = inject(Sproducts);

    cartItems: CartItem[] = [];
    recommendedItems: Iproductsdata[] = [];

    ngOnInit() {
        this.getProducts();
    }

    getProducts() {
        this.sproducts.getProducts().subscribe(
            {
                next: (data) => {
                    this.cartItems = data.slice(0, 3).map((product: Iproductsdata) => ({
                        ...product,
                        quantity: 1
                    }));
                    this.recommendedItems = data.slice(3, 6);
                },
                error: (error) => {
                    console.error('Error fetching cart items:', error);
                },
                complete: () => {
                    console.log('Cart items fetching completed');
                }
            }
        );
    }

    get subtotal(): number {
        return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    get tax(): number {
        return this.subtotal * 0.08; // 8% tax
    }

    get shipping(): number {
        return this.subtotal > 100 ? 0 : 15.99;
    }

    get total(): number {
        return this.subtotal + this.tax + this.shipping;
    }

    updateQuantity(itemId: number, change: number): void {
        const item = this.cartItems.find(item => item.id === itemId);
        if (item) {
            item.quantity = Math.max(1, item.quantity + change);
        }
    }

    removeItem(itemId: number): void {
        this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    }
}
