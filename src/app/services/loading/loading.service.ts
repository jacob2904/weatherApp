import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoadingSubject: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(false);
  public isLoading$: Observable<boolean | null> = this.isLoadingSubject.asObservable();

  startLoading() {
    this.isLoadingSubject.next(true);
  }

  stopLoading() {
    this.isLoadingSubject.next(null);
  }
}
