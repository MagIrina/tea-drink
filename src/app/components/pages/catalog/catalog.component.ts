import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import {Product} from "../../../types/product.type";


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error = false;
  search: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.searchService.search$.subscribe((query) => {
      this.search = query;
      this.loadProducts(query);
    });
  }

  loadProducts(query: string): void {
    this.loading = true;
    this.error = false;

    this.http.get<Product[]>('https://testologia.ru/tea').subscribe({
      next: (data) => {
        if (query) {
          const normalized = query.trim().toLowerCase();
          const regex = new RegExp(normalized, 'i');

          this.products = data.filter(product =>
            product.title.toLowerCase().includes(normalized) ||
            regex.test(product.description.toLowerCase())
          );
        } else {
          this.products = data;
        }

        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      }
    });
  }

  goToProduct(id: number): void {
    this.router.navigate(['/product', id]);
  }
}
