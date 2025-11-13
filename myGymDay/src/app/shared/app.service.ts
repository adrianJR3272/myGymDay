import { Injectable } from '@angular/core';
import { Auth, user, signOut } from '@angular/fire/auth';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  docData,
  serverTimestamp,
} from '@angular/fire/firestore';
import { Observable, switchMap, of } from 'rxjs';
import { UserProfile } from './interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  userLogged: UserProfile | undefined;
  constructor(private auth: Auth, private firestore: Firestore) {}

  getUserProfile(): Observable<UserProfile | undefined> {
    return user(this.auth).pipe(
      switchMap((firebaseUser) => {
        if (firebaseUser) {
          const userDocRef = doc(this.firestore, `users/${firebaseUser.uid}`);
          return docData(userDocRef).pipe(
            switchMap((data: any) => {
              if (!data) return of(undefined);

              const profile: UserProfile = {
                uid: firebaseUser.uid,
                nombre: data.nombre,
                sexo: data.sexo,
                edad: this.calcularEdad(data.Edad),
              };
              this.userLogged = profile;
              return of(profile);
            })
          );
        } else {
          return of(undefined);
        }
      })
    );
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  private calcularEdad(timestamp: any): number {
    if (!timestamp?.seconds) return 0;

    const birthDate = new Date(timestamp.seconds * 1000);
    const today = new Date();

    let edad = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      edad--;
    }

    return edad;
  }
}
