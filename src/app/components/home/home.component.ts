import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  userProfile: any;
  clientId = '0fd90352eaec42a2ab279f443599e844';

  constructor(private http: HttpClient, private authService: AuthService) {}

  async ngOnInit() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (!code) {
      this.authService.redirectToAuthCodeFlow(this.clientId);
    } else {
      const accessToken = await this.authService.getAccessToken(
        this.clientId,
        code
      );
      this.userProfile = await this.getUserProfile(accessToken);
    }
  }

  async getUserProfile(accessToken: string) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );

    this.http.get('https://api.spotify.com/v1/me', { headers }).subscribe({
      next: (response: any) => {
        this.userProfile = response;
      },
      error: (error: any) => {
        console.error('Error retrieving user profile:', error);
      },
    });
  }
}
