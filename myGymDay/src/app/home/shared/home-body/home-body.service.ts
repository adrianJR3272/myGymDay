// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { Auth, user, signOut, UserProfile } from '@angular/fire/auth';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable, switchMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeBodyService {
  constructor(private auth: Auth, private firestore: Firestore) {}
}
