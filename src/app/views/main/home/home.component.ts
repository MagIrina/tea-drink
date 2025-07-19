import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription, timer} from "rxjs";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SearchService} from "../../../shared/services/search.service";

declare var $: any;


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private popupSub!: Subscription;
  @ViewChild('popup') popupTemplate: any;

  constructor(private router: Router, private modalService: NgbModal, private searchService: SearchService) {}

  ngOnInit(): void {


    $('.single-item').slick({
      dots: true,
      slidesToShow: 1,
      infinite: true,
      speed: 1500,
      fade: true,
      slide: "div",
      cssEase: "linear",
      autoplay: true,
    });

    this.popupSub = timer(10000).subscribe(() => {
      this.modalService.open(this.popupTemplate);
    });

    $('.accordion').accordion({
      heightStyle: 'content',
      header: '> .accordion-item > .accordion-header'
    });

    $('.parent-container').magnificPopup({
      delegate: 'a',
      type: 'image'

    });
  }

  goToCatalog(): void {
    this.router.navigate(['/products']);
  }

  ngOnDestroy(): void {
    if (this.popupSub) {
      this.popupSub.unsubscribe();
    }
  }
}
