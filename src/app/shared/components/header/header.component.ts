import {Component} from '@angular/core';
import { Router } from '@angular/router';
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  query = '';
  isCollapsed = true;
  constructor(public searchService: SearchService, private router: Router) {}


  onSearch(): void {
    this.searchService.setSearch(this.query);
    this.router.navigate(['/products']);
  }

  onClear(): void {
    this.query = '';
    this.searchService.clearSearch();
    this.router.navigate(['/products']);
  }

  onClearHome(): void {
    this.query = '';
    this.searchService.clearSearch();
  }
}
