export class UpdateEmployeeDto {
    _id?: string;
    name?: string;
    lastname?: string;
    email: string;
    password?:  string;
    position?: string;
    updatedAt?: Date;
    birthday?: Date;
}
