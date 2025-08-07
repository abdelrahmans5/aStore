import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },

    { path: 'home', loadComponent: () => import('./components/home/home').then(m => m.Home), title: 'Home' },
    { path: 'products', loadComponent: () => import('./components/products/products').then(m => m.Products), title: 'Products' },
    { path: 'contact', loadComponent: () => import('./components/contact/contact').then(m => m.Contact), title: 'Contact' },
    { path: 'login', loadComponent: () => import('./components/login/login').then(m => m.Login), title: 'Login' },
    { path: 'signup', loadComponent: () => import('./components/signup/signup').then(m => m.Signup), title: 'Signup' },
    { path: 'cart', loadComponent: () => import('./components/cart/cart').then(m => m.Cart), title: 'Shopping Cart' },
    { path: 'checkout', loadComponent: () => import('./components/checkout/checkout').then(m => m.Checkout), title: 'Checkout' },
    { path: 'card', loadComponent: () => import('./components/card/card').then(m => m.Card), title: 'Card' },

    { path: '**', loadComponent: () => import('./components/error/error').then(m => m.Error), title: 'Error' }
];
