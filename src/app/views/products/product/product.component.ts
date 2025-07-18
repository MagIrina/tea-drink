import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Product} from "../../../../types/product.type";
import {environment} from "../../../../environments/environment";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.http.get<Product[]>(environment.apiURL +`tea`).subscribe({
      next: (products) => {
        this.product = products.find(p => p.id === Number(id)) || null;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      }
    });
  }

  buy(): void {
    if (this.product) {
      this.router.navigate(['/order'], { state: { product: this.product.title } });
    }
  }
}
