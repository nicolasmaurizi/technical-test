import { Component , Input } from'@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {

  @Input() messageToast: string = '';  
  @Input() showToast: boolean = false;  
  @Input() toastType = 'success'; // o 'danger'

  onToastHidden() {
    this.showToast = false;
  }


}