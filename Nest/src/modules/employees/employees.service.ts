import { Injectable ,NotFoundException ,InternalServerErrorException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from './schemas/employee.schema';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeesService  {
  constructor(@InjectModel(Employee.name) private employeeModel: Model<Employee>) {}
  
  private readonly saltRounds = 12;

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

      async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        try {
            const hashedPassword = await this.hashPassword(createEmployeeDto.password);
            const employeeData = {
              ...createEmployeeDto,
              password: hashedPassword
          };

            const createdEmployee = new this.employeeModel(employeeData); 
            return createdEmployee.save();  
        } catch (error) {
            console.log(error)
        }
    }

    async delete(id: string) {
        const deletedEmployee = await this.employeeModel
          .findByIdAndDelete({ _id: id })
          .exec();
        return deletedEmployee;
      }

    async findAll(): Promise<Employee[]> {
      return this.employeeModel.find().exec();
    }

    async findOne(email: string): Promise<Employee | null> {
  return this.employeeModel.findOne({ email }).exec();
}  }
  