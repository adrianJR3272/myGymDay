import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Training } from 'src/app/shared/interfaces/training.interface';
import { TrainingListService } from '../training-list/training-list.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TrainingHeaderComponent } from '../training-header/training-header.component';

@Component({
  selector: 'app-training-list-details',
  templateUrl: './training-list-details.component.html',
  styleUrls: ['./training-list-details.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    TrainingHeaderComponent,
  ],
})
export class TrainingListDetailsComponent implements OnInit {
  constructor() {}

  training?: Training;
  apiService = inject(TrainingListService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const trainingId = this.route.snapshot.paramMap.get('id');
    if (trainingId) {
      this.apiService.getTrainingById(trainingId).subscribe((t) => {
        this.training = t;
      });
    }
  }
}
