import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {OrderRequest} from "../../../../types/order-request";
import {environment} from "../../../../environments/environment";

interface OrderResponse {
  success: 1 | 0;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit {
  orderForm!: FormGroup;
  submitted = false;
  success = false;
  loading = false;
  showError = false;
  productName = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.productName = history.state.product || '';

    this.orderForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[А-Яа-яЁёA-Za-z]+$/)]],
      last_name: ['', [Validators.required, Validators.pattern(/^[А-Яа-яЁёA-Za-z]+$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{11}$/)]],
      country: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      address: ['', [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-яЁё0-9\s\-\/]+$/)]],
      product: [{ value: '', disabled: true }, Validators.required],
      comment: ['']
    });
  }

  get formControls() {
    return this.orderForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.showError = false;

    if (this.orderForm.invalid) {
      return;
    }

    this.loading = true;
    const formValue = this.orderForm.getRawValue();
    const body: OrderRequest = {
      ...formValue,
      product: this.productName || 'no product'
    };

    this.http.post<OrderResponse>(environment.apiURL +'order-tea', body).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success === 1) {
          this.success = true;
          this.orderForm.reset();
        } else {
          this.showError = true;
          setTimeout(() => (this.showError = false), 3000);
        }
      },
      error: () => {
        this.loading = false;
        this.showError = true;
        setTimeout(() => (this.showError = false), 3000);
      }
    });
  }
}
