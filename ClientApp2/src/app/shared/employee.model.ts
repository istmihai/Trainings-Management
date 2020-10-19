import { firestore } from 'firebase';

export interface Employee{
    [x: string]: any;
    Id:string;
    Username: string;
    Email: string;
    Firstname:string;
    Lastname:string;
    Departament:string;
    Birthdate:firestore.Timestamp;
    PhotoUrl:string;
    Role:string;
    Status:string;
}