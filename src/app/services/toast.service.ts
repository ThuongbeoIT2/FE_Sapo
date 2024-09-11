import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  duration: number;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _toasts = new BehaviorSubject<Toast[]>([]);
  toasts = this._toasts.asObservable();

  private icons = {
    success: 'fas fa-check-circle',
    info: 'fas fa-info-circle',
    warning: 'fas fa-exclamation-circle',
    error: 'fas fa-exclamation-circle'
  };

  showToast(toast: Partial<Toast>) {
    const newToast: Toast = {
      title: toast.title || '',
      message: toast.message || '',
      type: toast.type || 'info',
      duration: toast.duration || 3000,
      icon: this.icons[toast.type || 'info']
    };
    this._toasts.next([...this._toasts.getValue(), newToast]);
    setTimeout(() => this.removeToast(newToast), newToast.duration + 1000);
  }

  removeToast(toast: Toast) {
    const toasts = this._toasts.getValue().filter(t => t !== toast);
    this._toasts.next(toasts);
  }
}
