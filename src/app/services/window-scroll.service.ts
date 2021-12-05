import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowScrollService {
  scrollY = new BehaviorSubject(0);
  scrollY$ = this.scrollY.asObservable();
}
