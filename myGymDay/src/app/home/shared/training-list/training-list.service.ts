import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  query,
  orderBy,
  doc,
  docData,
} from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Training } from 'src/app/shared/interfaces/training.interface';

@Injectable({
  providedIn: 'root',
})
export class TrainingListService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  getUserTrainings(): Observable<Training[]> {
    return user(this.auth).pipe(
      switchMap((firebaseUser) => {
        if (!firebaseUser) return of([] as Training[]);

        const ref = query(
          collection(this.firestore, `users/${firebaseUser.uid}/trainings`),
          orderBy('fecha', 'desc')
        );

        return collectionData(ref, { idField: 'id' }) as Observable<Training[]>;
      }),
      map((trainings) =>
        trainings.map((t) => ({
          ...t,
          fecha:
            t.fecha instanceof Date
              ? t.fecha
              : new Date((t as any).fecha?.toDate?.() || t.fecha),
        }))
      )
    );
  }

  getTrainingById(trainingId: string): Observable<Training | undefined> {
    return user(this.auth).pipe(
      switchMap((firebaseUser) => {
        if (!firebaseUser) return of(undefined);

        const docRef = doc(
          this.firestore,
          `users/${firebaseUser.uid}/trainings/${trainingId}`
        );

        return docData(docRef, { idField: 'id' }).pipe(
          map((t) => {
            if (!t) return undefined;

            const training = t as Training;
            return {
              id: training.id,
              fecha:
                training.fecha instanceof Date
                  ? training.fecha
                  : new Date(
                      (training.fecha as any)?.toDate?.() || training.fecha
                    ),
              musculos: training.musculos || [],
            };
          })
        );
      })
    );
  }
}
