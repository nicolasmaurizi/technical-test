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
  @Input() employeeData: any; // Datos del empleado para editar
  @Input() isEditMode: boolean = true; // Modo de edición o alta
  @Input() isEditOwn: boolean = true; // Modo de edición o alta
  @Input() disableNameEdit: boolean = false; // Controla si se puede editar el nombre en el modo de edición
  @Input() disableLastNameEdit: boolean = false; // Controla si se puede editar el nombre en el modo de edición
  @Input() disableEmailEdit: boolean = true; // Controla si se puede editar el email en el modo de edición
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();
 
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
        this.isEditOwn = data.isEditOwn;
        this.disableEmailEdit = data.disableEmailEdit;
        this.employeeData = data.e; 
        this.employeeForm.get('name')?.setValue(data.name);
        this.employeeForm.get('lastname')?.setValue(data.lastname);
        }
    });

    this.employeeForm = this.fb.group({
      name: [{ value: this.employeeData?.name || '', disabled: this.isEditMode  && this.isEditOwn}, Validators.required],
      lastname: [{ value: this.employeeData?.lastname || '', disabled: this.isEditMode && this.isEditOwn }, Validators.required],
      email: [{ value: this.employeeData?.email || '', disabled: this.isEditMode && this.disableEmailEdit }, [Validators.required, Validators.email]],
      password: [{ value: this.employeeData?.password || '', disabled: this.isEditMode  }, [Validators.required, Validators.minLength(8)]],
      birthday: [{ value: this.employeeData?.birthday || '', disabled: this.isEditMode }, [Validators.required]],
      position: [{value: this.employeeData?.position || '', disabled:   this.isEditMode}, Validators.required]
    });

  }

 onSubmit(): void { 
     if (this.employeeForm.valid) {
      this.formSubmit.emit(this.employeeForm.value);
      this.employeeService.addEmployee(this.employeeForm.value).subscribe(
        (response) => {
          window.alert('Usuario Creado');
          this.router.navigate(['/employees']);
        },
        (error) => {
          window.alert('Verifique Datos');
        }
      );
    }
    else {
      window.alert('Datos erróneos');
    }
  }

  onCancel(): void {
    //this.cancel.emit(true); 
    this.router.navigate(['/employees']);
  }
}

