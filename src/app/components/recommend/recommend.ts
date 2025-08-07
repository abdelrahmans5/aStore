import { Component, inject, OnInit } from '@angular/core';
import { Sproducts } from '../../services/sproducts';
import { Iproductsdata } from '../../interfaces/iproductsdata';

@Component({
  selector: 'app-recommend',
  imports: [],
  templateUrl: './recommend.html',
  styleUrl: './recommend.css'
})
export class Recommend implements OnInit {
  private readonly sproducts = inject(Sproducts);

  recommendedProducts: Iproductsdata[] = [];

  ngOnInit() {
    this.getRecommendedProducts();
  }

  getRecommendedProducts() {
    this.sproducts.getProducts().subscribe({
      next: (data) => {
        console.log('Recommended products data:', data);
        this.recommendedProducts = data
          .sort((a: Iproductsdata, b: Iproductsdata) => b.rating.rate - a.rating.rate)
          .slice(0, 4);
      },
      error: (error) => {
        console.error('Error fetching recommended products:', error);
      },
      complete: () => {
        console.log('Recommended products fetching completed');
      }
    });
  }

}
