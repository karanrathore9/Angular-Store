import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

@Component({
  selector: 'admin-shell',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterModule, DashboardComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css',
})
export class ShellComponent {}
