import { firestore } from 'firebase';

export interface LogEvent {
    TimeStamp: firestore.Timestamp;
    Message: string;
    Action:string;
    ObjectId:Objects;
    UserId:string;
}

interface Objects{
    adminId:string;
    employeeId:string;
    trainingId:string;
}