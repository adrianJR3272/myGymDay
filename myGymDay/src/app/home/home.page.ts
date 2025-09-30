import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { HomeBodyComponent } from './shared/home-body/home-body.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, HomeBodyComponent],
})
export class HomePage {
  constructor(private router: Router) {}

  goToHome() {
    this.router.navigateByUrl('/home');
  }
}
