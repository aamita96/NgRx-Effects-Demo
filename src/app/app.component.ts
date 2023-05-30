import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'estore';
  loading = false;
  constructor(private loaderService: LoaderService, private cdr: ChangeDetectorRef, private router: Router) {
  }
  ngOnInit() {
    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart:
          this.loading = true;
          break;

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError:
          this.loading = false;
          break;

        default:
          break;
      }
    })
    // this.loaderService.loading$.subscribe(value => this.loading = value);
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
}
