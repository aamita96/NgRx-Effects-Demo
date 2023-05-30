import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loading$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  startLoading() {
    this.loading$.next(true);
  }
  stopLoading() {
    this.loading$.next(false);
  }
}
