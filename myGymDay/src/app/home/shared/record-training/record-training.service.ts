import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  serverTimestamp,
} from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RecordTrainingService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private snackBar = inject(MatSnackBar);

  async guardarEntrenamiento(entrenamiento: {
    fecha: Date;
    musculos: { id: number; nombre: string }[];
  }): Promise<void> {
    const currentUser = this.auth.currentUser;
    if (!currentUser) {
      this.showError('Usuario no autenticado');
      throw new Error('Usuario no autenticado');
    }

    const trainingsCollection = collection(
      this.firestore,
      `users/${currentUser.uid}/trainings`
    );

    try {
      await addDoc(trainingsCollection, {
        fecha: entrenamiento.fecha,
        musculos: entrenamiento.musculos,
        createdAt: serverTimestamp(),
      });
      this.showSuccess('Entrenamiento guardado correctamente');
    } catch (error) {
      this.showError('Error al guardar el entrenamiento');
      throw error;
    }
  }

  private showSuccess(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      panelClass: ['snackbar-success'],
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }

  private showError(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      panelClass: ['snackbar-error'],
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
}
