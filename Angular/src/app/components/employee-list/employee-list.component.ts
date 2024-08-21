import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from '../../services/employee.service';
import{ Router} from'@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],

})
export class EmployeeListComponent implements OnInit {
  constructor(private employeeService: EmployeeService, private router: Router,private dataService: DataService) {}
  listTitle: string = 'Listado de Empleados';
  loading = false;
  toastMessage: string = '';
  showToast: boolean = false;
  employeeId: string | null = null;

  data: any[] = [];
  filteredData: Employee[] = [];
  searchTerm: string = '';
  selectedEmployeeId: string = '';
  //
  showToastError : boolean = false;
  // Inputs employee-form  
  showForm: boolean = false;
  showTable: boolean = true;
  employeeData: any = []; 

  disableEmailEdit: boolean = false;
  //disableNameEdit: boolean = false; disableLastNameEdit: boolean = false;
  
  isEditOwn: boolean = false;

  showError() {
    this.showToastError = true;
  }

  onToastHiddenError() {
    this.showToastError = false;
  }

  onButtonEditClick(e:any): void {
    if (e._id === this.employeeId) {
      const dataToPass = { e: e,isEditMode: true ,disableEmailEdit: true ,isEditOwn: true}; 
      this.dataService.setData(dataToPass);
      this.router.navigate(['/new']);
    } 
    else {
      const dataToPass = { e: e,isEditMode: true ,disableEmailEdit: true,  disableLastNameEdit: false,disableNameEdit: false ,isEditOwn: false}; 
      this.dataService.setData(dataToPass);
      this.router.navigate(['/new']);
    }
  }

  onButtonNewClick() {
    const dataToPass = { isEditMode: false ,disableEmailEdit: true}; 
    this.dataService.setData(dataToPass);
    this.router.navigate(['/new']);
  }

  onButtonDeleteClick(e:any): void {
// TODO: Implementar la lógica para eliminar un empleado 
  }

  showModal: boolean = false;
  showModal2: boolean = false;
  
  onCancel() {
    this.closeModal();
  }
  openModal(e:any) {
    this.showToast = false;
    this.selectedEmployeeId = e._id;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.showTable = true;
  }

  onOk() {
    this.employeeService.deleteEmployee(this.selectedEmployeeId).subscribe({
      next: () => {
        this.loadEmployees(); // Recargar la lista de empleados
        this.closeModal();
        //this.show();
        this.toastMessage = 'Eliminado Correctamente';
        this.showToast = true;
      },
      error: (error) => {
        this.showError()
      },
    });
  }

 logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {   
    this.loadEmployees();
      // message to User when login
    //  if (this.employeeId !== null) {
        this.employeeId = sessionStorage.getItem('id');
        // parar por parametro si deebo mostrar este mensaje
      setTimeout(() => {
        this.toastMessage = `¡Bienvenido, ${sessionStorage.getItem('username')}!`;
        this.showToast = true;
      }, 1250);
   // }; 
  }

    loadEmployees() {
      this.employeeService.getEmployees().subscribe({
        next: (data) => {
          this.data = data;
          this.filterData();
        },
        error: (error) => {
          console.error('Error al cargar los empleados', error);
        },
      });
    }

    filterData(): void {
      const term = this.searchTerm.toLowerCase();
      this.filteredData = this.data.filter(item => 
        {const name = item.name ? item.name.toLowerCase() : '';
        return name.includes(term)}
      );

    }

  }

