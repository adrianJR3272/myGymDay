import { Component, inject, OnInit } from '@angular/core';
import { TrainingListService } from './training-list.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Training } from 'src/app/shared/interfaces/training.interface';
import { TrainingHeaderComponent } from '../training-header/training-header.component';
@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    TrainingHeaderComponent,
  ],
})
export class TrainingListComponent implements OnInit {
  trainings: Training[] = [];
  loading = true;
  error = '';
  apiService = inject(TrainingListService);
  private router = inject(Router);

  constructor() {}

  ngOnInit() {
    this.apiService.getUserTrainings().subscribe({
      next: (data) => {
        this.trainings = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar los entrenamientos.';
        this.loading = false;
      },
    });
  }
  goToDetails(training?: Training) {
    if (training?.id) {
      this.router.navigate(['/registros', training.id]);
    }
  }
}
