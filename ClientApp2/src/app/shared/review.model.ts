import { firestore } from 'firebase';
import { Employee } from './employee.model';

export interface Review {
    trainingId:string;
    employeeId:string;
    reviewMessage:string;
    rating:number;
    timeStamp?:firestore.Timestamp;
    employee ?:Employee;
}