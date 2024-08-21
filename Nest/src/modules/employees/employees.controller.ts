import { Controller, Get, Post, Body, Param, Put, Delete , NotFoundException, InternalServerErrorException ,  HttpCode,HttpStatus} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './schemas/employee.schema';

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) {}
  
    @Post()
    async create(@Body() createEmployeeDto: Employee) {
        try {
            return this.employeesService.create(createEmployeeDto);
            
        } catch (error) {
        console.log(error)            
        }
    }
  
    @Get()
    findAll() {
      return this.employeesService.findAll();
    }
  /*
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.employeesService.findOne(id);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateItemDto: Employee) {
      return this.employeesService.update(id, updateItemDto);
    }
  */
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Employee[]> {
      try {
        await this.employeesService.delete(id);   
        return await this.employeesService.findAll();
      } catch (error) {
        console.error('Error en el controlador al eliminar el empleado:', error);
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException('Could not delete employee');
      }
    }
   
  }