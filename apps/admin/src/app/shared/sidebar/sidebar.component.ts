import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AuthService, LocalstorageService } from '@angular-monorepo/auth';

@Component({
  selector: 'admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(private router: Router, private token: LocalstorageService) {}

  logoutUser() {
    console.log('logout');
    this.token.removeToken();
    this.router.navigate(['/loginUser']);
  }
}
