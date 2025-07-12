import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, timer} from "rxjs";
import {Router} from "@angular/router";

declare var $: any;

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  showPopup = false;
  private popupSub!: Subscription;

  constructor(private router: Router) {}

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
      $('#popupModal').modal('show');
      this.showPopup = true;
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
    $('#popupModal').modal('hide');
    this.router.navigate(['/catalog']);
  }

  ngOnDestroy(): void {
    if (this.popupSub) {
      this.popupSub.unsubscribe();
    }
  }
}
