export class CreateEmployeeDto {
    _id?: string;
    name?: string;
    lastname?: string;
    email: string;
    password?:  string;
    entrydate?: Date;
    position?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    deleted?: boolean;
    birthday?: Date;
}
