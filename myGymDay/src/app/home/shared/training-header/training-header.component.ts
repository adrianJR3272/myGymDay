import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
} from '@ionic/angular/standalone';
import { Location } from '@angular/common';

@Component({
  selector: 'app-training-header',
  templateUrl: './training-header.component.html',
  imports: [
    IonButton,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonTitle,
    IonHeader,
    IonToolbar,
    IonButtons,
  ],
  styleUrls: ['./training-header.component.scss'],
})
export class TrainingHeaderComponent implements OnInit {
  constructor(private router: Router, private location: Location) {}

  ngOnInit() {}

  goBack() {
    this.location.back();
  }

  goToHome() {
    this.router.navigateByUrl('/home');
  }
}
