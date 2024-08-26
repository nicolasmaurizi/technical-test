import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{ Router } from'@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../services/data.service';
import { EmployeeService } from '../../services/employee.service';
import { environment } from '../../../environments/environment'; 

interface PositionResponse {
  positions: string[];
}

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html'
})

export class EmployeeFormComponent implements OnInit {
  @Input() employeeData: any; 
  // for show and enabled inputs
  @Input() isEditMode: boolean = false; 
  @Input() isEditOwner: boolean = false; 
  //
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();
  
  showToast: boolean = false;
  toastType: string = 'success';
  messageToast : string = '';
  positions: string[] = [];
  element: [] = [];
  
  employeeForm: FormGroup = this.fb.group({});
  loading: boolean = true;
  constructor(private fb: FormBuilder, private router: Router
    ,private http: HttpClient,private dataService: DataService
    ,private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loading = true; 
    this.http.get<PositionResponse>(environment.apiUrlPositions)
    .subscribe(
       (data: any) => {
        this.positions = data.positions;  
        this.loading = false;
       },
       (error: any) => {
        this.loading = false;
        window.alert('Error al cargar posiciones, detalle: '+error);
       }
     );

     this.dataService.data$.subscribe(data => {
      if (data) {
        this.isEditMode = data.isEditMode;
        this.isEditOwner = data.isEditOwn;
         
        if (this.isEditMode) {
          this.employeeData = data.e; 
          this.employeeForm.get('name')?.setValue(data.name);
          this.employeeForm.get('lastname')?.setValue(data.lastname);
          this.employeeForm.get('position')?.setValue(data.position);
        }
        
        }
    });

    this.employeeForm = this.fb.group({
      name: [{ value: this.employeeData?.name || '', disabled: this.isEditOwner&&!this.isEditMode}, Validators.required],
      lastname: [{ value: this.employeeData?.lastname || '', disabled: this.isEditOwner&&!this.isEditMode }, Validators.required],
      email: [{ value: this.employeeData?.email || '', disabled: this.isEditMode }, [Validators.required, Validators.email]],
      password: [{ value: this.employeeData?.password || '', disabled: this.isEditMode  }, [Validators.required, Validators.minLength(8)]],
      birthday: [{ value: this.employeeData?.birthday || '', disabled: this.isEditMode }, [Validators.required]],
      position: [{ value: this.employeeData?.position || '', disabled: this.isEditMode&&!this.isEditOwner}, [Validators.required]],
    });

  }

 onSubmit(): void { 
     if (this.employeeForm.valid) {
      this.formSubmit.emit(this.employeeForm.value);

      if (this.isEditMode) {
        this.employeeService.updateEmployee(this.employeeData._id,this.employeeForm.value).subscribe(
          (response) => {
            const dataToPass = { toastMessage: 'Usuario MODIFICADO correctamente.',showMessage: true,toastType:"success"}; 
            this.dataService.setData(dataToPass);
            this.router.navigate(['/employees']);
          },
          (error) => {
            this.messageToast = 'Verifique Datos';
            this.showToast = true;
            this.toastType ='success';
          }
        );
      } else {
        this.employeeService.addEmployee(this.employeeForm.value).subscribe(
          () => {
            const dataToPass = { toastMessage: 'Usuario CREADO correctamente.',showMessage: true,toastType:"success"}; 
            this.dataService.setData(dataToPass);
            this.router.navigate(['/employees']);
          },
          (error) => {
            this.messageToast = 'Verifique Datos';
            this.showToast = true;
            this.toastType ='success';
          }
        );
      }

    }
    else {
      this.messageToast = 'Datos incompletos';
      this.showToast = true;
      this.toastType ='success';
    }
  }

  onCancel(): void {
    this.router.navigate(['/employees']);
  }
}

