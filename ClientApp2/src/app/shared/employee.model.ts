import { firestore } from 'firebase';

export interface Employee{
    
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
    metaData:EmployeeMetaData;
}
interface EmployeeMetaData{
    lastSignInTime:firestore.Timestamp;
    creationTime:firestore.Timestamp;
}