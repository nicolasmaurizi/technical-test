import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() showModal: boolean = false;
  @Input() title: string = '';
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() okEvent = new EventEmitter<void>();
  @Output() cancelEvent = new EventEmitter<void>();
  @Input() itemId: string = ''; // ID del elemento a eliminar

   closeModal() {
    this.closeModalEvent.emit();
  }

  ok() {
    if (this.itemId) {
      this.okEvent.emit();
      this.closeModal();    }
  }

  cancel() {
    this.cancelEvent.emit();
    this.closeModal();
  }
}
