import { Injectable, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class TrainingListService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
}
