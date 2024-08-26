import { Controller, Get, Post, Body, Param, Patch, Delete , NotFoundException, InternalServerErrorException , UseGuards} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './schemas/employee.schema';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { JwtAuthGuard } from '../auth/JwtAuthGuard';

@Controller('employees')
//@UseGuards(JwtAuthGuard) for controller
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
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
      return this.employeesService.findAll();
    }
  /*
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.employeesService.findOne(id);
    }
    */
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() UpdateEmployeeDto: UpdateEmployeeDto) {
      return this.employeesService.update(id,UpdateEmployeeDto);
    }
    @Patch('pass/:token')
    async updatePass(@Param('token') token: string, @Body() UpdateEmployeeDto: UpdateEmployeeDto) {
      return this.employeesService.updatePass(token,UpdateEmployeeDto);
    }

    @UseGuards(JwtAuthGuard)
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