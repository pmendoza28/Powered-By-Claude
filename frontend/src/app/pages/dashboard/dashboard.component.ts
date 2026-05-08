import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  username = this.auth.getUsername();
  token = this.auth.getToken() ?? '';
  tokenPreview = this.token.length > 60
    ? this.token.slice(0, 30) + '…' + this.token.slice(-20)
    : this.token;

  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
