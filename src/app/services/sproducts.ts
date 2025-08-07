import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Sproducts {
  private readonly httpClient = inject(HttpClient);

  getProducts(): Observable<any> {
    return this.httpClient.get('https://fakestoreapi.com/products');
  }
}
