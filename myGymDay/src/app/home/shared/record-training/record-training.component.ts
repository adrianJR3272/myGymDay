import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { Component, inject, OnInit, LOCALE_ID } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import {
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { TrainingHeaderComponent } from '../training-header/training-header.component';
import { RecordTrainingService } from './record-training.service';

registerLocaleData(localeEs);

export const MY_DATE_FORMATS = {
  parse: { dateInput: 'YYYY-MM-DD' },
  display: {
    dateInput: 'yyyy-MM-dd',
    monthYearLabel: 'MMMM yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

@Component({
  selector: 'app-record-training',
  standalone: true,
  templateUrl: './record-training.component.html',
  styleUrls: ['./record-training.component.css'],
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
    TrainingHeaderComponent,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: LOCALE_ID, useValue: 'es-ES' },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class RecordTrainingComponent implements OnInit {
  private apiService = inject(RecordTrainingService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  trainingForm!: FormGroup;

  musculosDisponibles = [
    { id: 1, nombre: 'Pecho' },
    { id: 2, nombre: 'Espalda' },
    { id: 3, nombre: 'Biceps' },
    { id: 4, nombre: 'Triceps' },
    { id: 5, nombre: 'Piernas' },
    { id: 6, nombre: 'Hombros' },
    { id: 7, nombre: 'Abdominales' },
  ];

  ejerciciosPorMusculo: Record<string, string[]> = {
    Pecho: [
      'Press banca',
      'Press inclinado',
      'Press banca (máquina)',
      'Press inclinado con mancuernas',
      'Otros',
    ],
    Biceps: ['Curl Biceps', 'Martillo', 'Otros'],
    Triceps: ['Polea', 'Polea unilateral', 'Otros'],
    Espalda: ['Jalón al pecho', 'Remo', 'Dominadas', 'Otros'],
    Piernas: [
      'Extensión de cuádriceps',
      'Prensa',
      'Sentadillas',
      'Abductores',
      'Hip thrust',
      'Gemelos',
      'Otros',
    ],
    Hombros: [
      'Elevaciones laterales',
      'Press militar con mancuernas',
      'Press militar (máquina)',
      'Otros',
    ],
    Abdominales: ['Crunch', 'Elevaciones de piernas', 'Plancha', 'Otros'],
  };

  ngOnInit() {
    this.trainingForm = this.fb.group({
      fecha: [new Date(), Validators.required],
      musculos: this.fb.array(
        [this.crearMusculoGroup()],
        [this.musculosUnicosValidator]
      ),
    });
  }

  get musculos(): FormArray {
    return this.trainingForm.get('musculos') as FormArray;
  }

  crearMusculoGroup(): FormGroup {
    return this.fb.group({
      musculo: [null, Validators.required],
      ejercicios: this.fb.array([]),
    });
  }

  crearEjercicioGroup(): FormGroup {
    return this.fb.group({
      ejercicio: [null, Validators.required],
    });
  }

  getEjercicios(i: number): FormArray {
    return this.musculos.at(i).get('ejercicios') as FormArray;
  }

  agregarMusculo() {
    this.musculos.push(this.crearMusculoGroup());
  }

  eliminarMusculo(index: number) {
    this.musculos.removeAt(index);
    this.musculos.updateValueAndValidity();
  }

  agregarEjercicio(indexMusculo: number) {
    const musculoGroup = this.musculos.at(indexMusculo) as FormGroup;
    const ejerciciosArray = musculoGroup.get('ejercicios') as FormArray;
    ejerciciosArray.push(this.crearEjercicioGroup());
  }

  eliminarEjercicio(indexMusculo: number, indexEjercicio: number) {
    const musculoGroup = this.musculos.at(indexMusculo) as FormGroup;
    const ejerciciosArray = musculoGroup.get('ejercicios') as FormArray;
    ejerciciosArray.removeAt(indexEjercicio);
  }

  onMusculoSeleccionado(index: number) {
    const musculoGroup = this.musculos.at(index) as FormGroup;
    const ejerciciosArray = musculoGroup.get('ejercicios') as FormArray;
    ejerciciosArray.clear();
  }

  musculosUnicosValidator(control: AbstractControl): ValidationErrors | null {
    const musculos = (control as FormArray).value;
    if (!musculos || musculos.length === 0) return null;
    const ids = musculos.map((m: any) => m?.musculo?.id).filter(Boolean);
    const idsUnicos = new Set(ids);
    return ids.length !== idsUnicos.size ? { musculosDuplicados: true } : null;
  }

  async registerTraining() {
    if (this.trainingForm.valid) {
      try {
        await this.apiService.guardarEntrenamiento(this.trainingForm.value);
        this.trainingForm.reset({
          fecha: new Date(),
          musculos: [this.crearMusculoGroup()],
        });
        this.router.navigateByUrl('/home');
      } catch (error: any) {
        console.error(error);
      }
    } else {
      this.trainingForm.markAllAsTouched();
    }
  }
}
