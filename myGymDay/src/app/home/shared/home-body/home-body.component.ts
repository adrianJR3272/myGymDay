import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { AppService } from 'src/app/shared/app.service';
import { UserProfile } from 'src/app/shared/interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-body',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.scss'],
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
  ],
})
export class HomeBodyComponent implements OnInit {
  private appService = inject(AppService);

  userProfile?: UserProfile;
  selectedDate?: Date;

  constructor(private router: Router) {}

  ngOnInit() {
    this.appService.getUserProfile().subscribe((profile) => {
      this.userProfile = profile;
      console.log('Perfil del usuario en HomeBodyComponent:', this.userProfile);
    });
  }

  goToRegisterDay() {
    this.router.navigateByUrl('/registrarEntrenamiento');
  }

  goToRegisters() {
    this.router.navigateByUrl('/registros');
  }
}
