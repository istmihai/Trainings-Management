import { firestore } from 'firebase';

export interface Employee{
    Id:string;
    Username: string;
    Email: string;
    Firstname:string;
    Lastname:string;
    Birthdate:firestore.Timestamp;
    PhotoUrl:string;
    Role:string;
    Status:string;
}