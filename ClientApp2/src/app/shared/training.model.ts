import { firestore } from 'firebase';
import { Employee } from './employee.model';

export interface Training{
    Id:string;
    Title:string;
    Description:string;
    StartDate:firestore.Timestamp;
    EndDate:firestore.Timestamp;
    Location:string;
    Status:string;
    rating:number;
    price:number;
    Document:string;
    CreateDataTime:Date;
    Employees:Employee[];
}

