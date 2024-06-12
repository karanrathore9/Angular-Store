import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User, UsersService } from '@angular-monorepo/products';

const UI_MODULES = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
  ToastModule,
  ConfirmDialogModule,
  TagModule,
];

@Component({
  selector: 'admin-users-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ...UI_MODULES],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this._getUsers();
  }

  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this User?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(userId);
       
        this.usersService.deleteUser(userId).subscribe(
          () => {
             console.log("DELETE________");
            this._getUsers();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User is deleted!',
            });
          },
          () => {
            console.log("ERROR________",userId );
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'User is not deleted!',
            });
          }
        );
      },
    });
  }

  updateUser(userid: string) {
    this.router.navigateByUrl(`users/form/${userid}`);
  }

  private _getUsers() {
    this.usersService.getUsers().subscribe((users:any) => {
      console.log(users.data)
      this.users = users.data;
    });
  }
}
