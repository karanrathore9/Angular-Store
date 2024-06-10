import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { ORDER_STATUS } from '../order.constants';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Order, OrdersService } from '@angular-monorepo/products';
import { FormsModule } from '@angular/forms';

const UI_MODULES = [CardModule, ToastModule, DropdownModule, FieldsetModule];

@Component({
  selector: 'admin-orders-detail',
  standalone: true,
  imports: [CommonModule, ...UI_MODULES, FormsModule],
  templateUrl: './orders-detail.component.html',
  styleUrl: './orders-detail.component.css',
})
export class OrdersDetailComponent implements OnInit {
  order: Order;
  orderStatuses = [];
  selectedStatus: any;

  constructor(
    private orderService: OrdersService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label,
      };
    });
  }

  private _getOrder() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.orderService.getOrderById(params['id']).subscribe((order:any) => {
          console.log(order, "🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶");
          this.order = order.data;
          this.selectedStatus = order.data.status;
        });
      }
    });
  }

  onStatusChange(event) {
    this.orderService
      .updateOrder({ status: event.value }, this.order.id)
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Order is updated!',
          });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Order is not updated!',
          });
        }
      );
  }
}
