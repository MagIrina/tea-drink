import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {SearchService} from "../../../services/search.service";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  query = '';

  constructor(private searchService: SearchService, private router: Router) {}

  onSearch(): void {
    this.searchService.setSearch(this.query.trim());
    this.router.navigate(['/catalog']);
  }

  onClear(): void {
    this.query = '';
    this.searchService.clearSearch();
    this.router.navigate(['/catalog']);
  }
}
