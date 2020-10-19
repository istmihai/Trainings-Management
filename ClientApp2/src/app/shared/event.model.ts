import { firestore } from 'firebase';

export interface LogEvent {
    TimeStamp: firestore.Timestamp;
    Message: string;
    Action:string;
    Objects: string[];
    UserId:string;
}