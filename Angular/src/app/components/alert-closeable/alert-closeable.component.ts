import { Component, OnInit } from '@angular/core';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-alert-closeable',
  standalone: true,
  templateUrl: './alert-closeable.component.html',
	imports: [NgbAlertModule],
})
export class AlertCloseableComponent implements OnInit {
	constructor() {}
  type : string = '';
  message: string = '';

	ngOnInit(): void {
	}

}
