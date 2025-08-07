import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sproducts } from '../../services/sproducts';
import { Iproductsdata } from '../../interfaces/iproductsdata';

interface CheckoutItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

@Component({
    selector: 'app-checkout',
    imports: [RouterLink, CommonModule, FormsModule],
    templateUrl: './checkout.html',
    styleUrl: './checkout.css'
})
export class Checkout implements OnInit {
    private readonly sproducts = inject(Sproducts);

    checkoutItems: CheckoutItem[] = [];

    // Form data
    formData = {
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        apartment: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
        phone: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: '',
        saveInfo: false,
        newsletter: false
    };

    currentStep = 1;
    totalSteps = 3;
    isProcessing = false;

    ngOnInit() {
        // Load products from service and convert to checkout items
        this.sproducts.getProducts().subscribe({
            next: (data) => {
                // Convert first 3 products to checkout items with quantity
                this.checkoutItems = data.slice(0, 3).map((product: Iproductsdata) => ({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    quantity: 1,
                    image: product.image
                }));
            },
            error: (error) => {
                console.error('Error fetching checkout items:', error);
            }
        });
    }

    get subtotal(): number {
        return this.checkoutItems.reduce((total, item) => total + (item.price * item.quantity), 0);
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

    nextStep(): void {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
        }
    }

    prevStep(): void {
        if (this.currentStep > 1) {
            this.currentStep--;
        }
    }

    processPayment(): void {
        this.isProcessing = true;

        // Simulate payment processing
        setTimeout(() => {
            this.isProcessing = false;
            alert('Order placed successfully! Thank you for your purchase.');
            // In real app, redirect to success page
        }, 3000);
    }

    isStepValid(): boolean {
        switch (this.currentStep) {
            case 1:
                return !!(this.formData.email && this.formData.firstName && this.formData.lastName);
            case 2:
                return !!(this.formData.address && this.formData.city && this.formData.state && this.formData.zipCode);
            case 3:
                return !!(this.formData.cardNumber && this.formData.expiryDate && this.formData.cvv && this.formData.cardName);
            default:
                return false;
        }
    }
}
