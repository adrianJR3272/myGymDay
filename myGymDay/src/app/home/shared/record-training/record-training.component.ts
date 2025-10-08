import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RecordTrainingService } from './record-training.service';
import { AppService } from 'src/app/shared/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-record-training',
  templateUrl: './record-training.component.html',
  styleUrls: ['./record-training.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
})
export class RecordTrainingComponent implements OnInit {
  trainingForm!: FormGroup;
  private apiService = inject(RecordTrainingService);
  private router = inject(Router);

  musculosDisponibles = [
    { id: 1, nombre: 'Pecho' },
    { id: 2, nombre: 'Espalda' },
    { id: 3, nombre: 'Piernas' },
    { id: 4, nombre: 'Bíceps' },
    { id: 5, nombre: 'Tríceps' },
    { id: 6, nombre: 'Hombros' },
    { id: 7, nombre: 'Antebrazos' },
    { id: 8, nombre: 'Abdominales' },
    { id: 9, nombre: 'Lumbares' },
  ];

  get musculos(): FormArray {
    return this.trainingForm.get('musculos') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.trainingForm = this.fb.group({
      fecha: [new Date(), Validators.required],
      musculos: this.fb.array(
        [this.fb.control(null, Validators.required)],
        [this.musculosUnicosValidator]
      ),
    });
  }

  agregarMusculo() {
    this.musculos.push(this.fb.control(null, Validators.required));
  }

  eliminarMusculo(index: number) {
    this.musculos.removeAt(index);
    this.musculos.updateValueAndValidity();
  }

  musculosUnicosValidator(control: AbstractControl): ValidationErrors | null {
    const musculos = (control as FormArray).value;

    if (!musculos || musculos.length === 0) return null;

    const ids = musculos.filter((m: any) => m && m.id).map((m: any) => m.id);

    const idsUnicos = new Set(ids);

    if (ids.length !== idsUnicos.size) {
      return { musculosDuplicados: true };
    }

    return null;
  }

  async registerTraining() {
    if (this.trainingForm.valid) {
      try {
        await this.apiService.guardarEntrenamiento(this.trainingForm.value);

        this.trainingForm.reset({
          fecha: new Date(),
          musculos: [null],
        });
        this.router.navigateByUrl('/home');
      } catch (error: any) {
        return;
      }
    } else {
      this.trainingForm.markAllAsTouched();

      if (this.musculos.errors?.['musculosDuplicados']) {
        return;
      }
    }
  }
}
