import { Component , Input , OnChanges, SimpleChanges} from'@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {

  @Input() message: string = 'Operación exitosa';  

   @Input() showToast: boolean = false;  

  onToastHidden() {
    this.showToast = false;
  }


}