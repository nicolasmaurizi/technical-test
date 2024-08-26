import { Injectable , NotFoundException, InternalServerErrorException , UnauthorizedException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from './schemas/employee.schema';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';

import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeesService {
  constructor(private readonly jwtService: JwtService,
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
  ) {}

  private readonly saltRounds = 12;

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<{ statusCode: number; message: string }> {
    try {
      const hashedPassword = await this.hashPassword(
        createEmployeeDto.password,
      );
      const employeeData = {
        ...createEmployeeDto,
        password: hashedPassword,
      };

      const createdEmployee = new this.employeeModel(employeeData);
      await createdEmployee.save();
      return {
        statusCode: 200,
        message: 'Employee created successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException('Error creating employee');
    }
  }

  async update(_id: string,updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    try {
      const updatedEmployee = await this.employeeModel.findByIdAndUpdate(
        _id,
        { $set: updateEmployeeDto },
        { new: false },  // updated document is returned
      );
  
      if (!updatedEmployee) {
        throw new NotFoundException(`Employee with ID "${_id}" not found`);
      }
  
      return updatedEmployee;
   
    } catch (error) {
      console.log(error);
    }
  }

  async updatePass(token: string,updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    try {
      const decodedToken = this.jwtService.verify(token);
      const employeeId  = decodedToken?.id;

      const updatedEmployee = await this.employeeModel.findByIdAndUpdate(
        employeeId ,
        { $set: updateEmployeeDto },
        { new: false },  // updated document is returned
      );
  
      if (!updatedEmployee) {
        throw new NotFoundException(`Error`);
      }
  
      return updatedEmployee;
   
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException('Invalid or expired token');
    }
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
  }
}
