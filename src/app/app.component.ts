import { Component } from '@angular/core';
import { HomeComponent } from './components/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HomeComponent],
})
export class AppComponent {}
