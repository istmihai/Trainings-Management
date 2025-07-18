const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { firestore } = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();
const decrement = admin.firestore.FieldValue.increment(-1);
const increment =admin.firestore.FieldValue.increment(1);


exports.Trainings=functions.region('europe-west3').firestore
    .document('Trainings/{trainingId}/Employee_Trainings/{employeeId}')
    .onWrite(async (change,context)=>{
      const newStatus= change.after.exists ? change.after.data().status : null;
      const oldStatus = change.before.exists ? change.before.data().status : null;

      const employeeRef=  db.collection('Employees').doc(context.params.employeeId);
      const trainingref=  db.collection('Trainings').doc(context.params.trainingId);

      let employee=  (await employeeRef.get()).data()
      let training= (await trainingref.get()).data()
     const month = training.StartDate.toDate().getMonth()+1;
     const year = training.StartDate.toDate().getFullYear();
     const employeeStats=db.collection('Employees').doc(`${context.params.employeeId}/Statistics/${year}`);
     const trainingStats= db.collection('Trainings').doc(`${context.params.trainingId}/Stats/Stats`);
     const departamentStats=db.collection("Departaments").doc(employee.Departament).collection('Statistics').doc(`${year}`);
     const departamentsSpendings = db.collection("Departaments").doc(employee.Departament).collection("Spendings").doc(`${year}`);
 
     if(!change.after.exists)
    {
      trainingStats.update(oldStatus,admin.firestore.FieldValue.increment(-1));
      employeeStats.update(`${month}.${oldStatus}`,admin.firestore.FieldValue.increment(-1))
     departamentStats.update(`${month}.${oldStatus}`,admin.firestore.FieldValue.increment(-1));
     departamentsSpendings.update(`${context.params.trainingId}`,admin.firestore.FieldValue.increment(-1))
    }
   else if(change.before.exists){
      trainingStats.update(newStatus,admin.firestore.FieldValue.increment(1));
      trainingStats.update(oldStatus,admin.firestore.FieldValue.increment(-1));
      employeeStats.update(`${month}.${newStatus}`,admin.firestore.FieldValue.increment(1))
      employeeStats.update(`${month}.${oldStatus}`,admin.firestore.FieldValue.increment(-1))
      departamentStats.update(`${month}.${newStatus}`,admin.firestore.FieldValue.increment(1));
      departamentStats.update(`${month}.${oldStatus}`,admin.firestore.FieldValue.increment(-1));
    }
    else {
      trainingStats.update(newStatus,admin.firestore.FieldValue.increment(1));
      employeeStats.update(`${month}.${newStatus}`,admin.firestore.FieldValue.increment(1))
      departamentStats.update(`${month}.${newStatus}`,admin.firestore.FieldValue.increment(1));
      departamentsSpendings.update(`${context.params.trainingId}`,admin.firestore.FieldValue.increment(1))

    }
return null;
    })

    /*
exports.updateTraining = functions.region('europe-west3').firestore
    .document('Trainings/{trainingId}/Employee_Trainings/{employeeId}')
    .onUpdate( async(change, context) => {
         const newStatus = change.after.data().status
         const oldStatus =  change.before.data().status;
        
         const employeeRef=  db.collection('Employees').doc(context.params.employeeId);
         const trainingref=  db.collection('Trainings').doc(context.params.trainingId);
         let employee=   (await employeeRef.get()).data()
         let training=  (await trainingref.get()).data()
        const month = training.StartDate.toDate().getMonth()+1;
        const year = training.StartDate.toDate().getFullYear();
        
         const employeeStats=db.collection('Employees').doc(`${context.params.employeeId}/Statistics/${year}`);
         const trainingStats= db.collection('Trainings').doc(`${context.params.trainingId}/Stats/Stats`);
        const departamentStats=db.collection("Departaments").doc(employee.Departament).collection('Statistics').doc(`${year}`);
        
        trainingStats.update(newStatus,admin.firestore.FieldValue.increment(1));
        trainingStats.update(oldStatus,admin.firestore.FieldValue.increment(-1));
        employeeStats.update(`${month}.${newStatus}`,admin.firestore.FieldValue.increment(1))
        employeeStats.update(`${month}.${oldStatus}`,admin.firestore.FieldValue.increment(-1))
       departamentStats.update(`${month}.${newStatus}`,admin.firestore.FieldValue.increment(1));
     departamentStats.update(`${month}.${oldStatus}`,admin.firestore.FieldValue.increment(-1));

return null;
    });

    exports.deleteTraining = functions.region('europe-west3').firestore
    .document('Trainings/{trainingId}/Employee_Trainings/{employeeId}')
    .onDelete( async(change, context) => {
         const Status = change.data().status
         const employeeRef=  db.collection('Employees').doc(context.params.employeeId);
         const trainingref=  db.collection('Trainings').doc(context.params.trainingId);
         let employee=   (await employeeRef.get()).data()
         let training=  (await trainingref.get()).data()
         functions.logger.log(employee);
        const month = training.StartDate.toDate().getMonth()+1;
        const year = training.StartDate.toDate().getFullYear();
        
         const employeeStats=db.collection('Employees').doc(`${context.params.employeeId}/Statistics/${year}`);
        
         const trainingStats= db.collection('Trainings').doc(`${context.params.trainingId}/Stats/Stats`);
        const departamentStats=db.collection("Departaments").doc(employee.Departament).collection('Statistics').doc(`${year}`);
        
         trainingStats.update(Status,admin.firestore.FieldValue.increment(-1));
         employeeStats.update(`${month}.${Status}`,admin.firestore.FieldValue.increment(-1))
        departamentStats.update(`${month}.${Status}`,admin.firestore.FieldValue.increment(-1));


return null;
    });

    exports.addTraining = functions.region('europe-west3').firestore
    .document('Trainings/{trainingId}/Employee_Trainings/{employeeId}')
    .onCreate( async(change, context) => {
         const Status = change.data().status
        
         const employeeRef=  db.collection('Employees').doc(context.params.employeeId);
         const trainingref=  db.collection('Trainings').doc(context.params.trainingId);
         let employee=   (await employeeRef.get()).data()
         let training=  (await trainingref.get()).data()
        let month = training.StartDate.toDate().getMonth()+1;
        month.Status=Status;
        const year = training.StartDate.toDate().getFullYear();
        functions.logger.log(employee);

         const employeeStats=db.collection('Employees').doc(`${context.params.employeeId}/Statistics/${year}`);
         const trainingStats= db.collection('Trainings').doc(`${context.params.trainingId}/Stats/Stats`);
        const departamentStats=db.collection("Departaments").doc(employee.Departament).collection('Statistics').doc(`${year}`);
     
        const batch=db.batch();
        const statusDate=`${month}.${Status}`;
        
        const xyz = new firestore.FieldValue(statusDate);
        
        trainingStats.update(Status,admin.firestore.FieldValue.increment(1));
        employeeStats.update(`${month}.${Status}`,admin.firestore.FieldValue.increment(1))
       departamentStats.update(`${month}.${Status}`,admin.firestore.FieldValue.increment(1));

      return null;
    });

    */
    exports.addTraining2 = functions.region('europe-west3').firestore
    .document('Trainings/{trainingId}')
    .onCreate( async(change, context) => {
        const Status = change.data().Status
        const trainingref=  db.collection('Trainings').doc(context.params.trainingId);
        let training=  (await trainingref.get()).data()
        let month = training.StartDate.toDate().getMonth()+1;
        month.Status=Status;
        const year = training.StartDate.toDate().getFullYear();
        const statusDate=`${month}.${Status}`;
        const Stats=db.collection('TrainingStatistics').doc(`${year}`);        
        Stats.update(statusDate,admin.firestore.FieldValue.increment(1));
      return null;
    });
    
    exports.updateTraining2 = functions.region('europe-west3').firestore
    .document('Trainings/{trainingId}')
    .onUpdate( async(change, context) => {
       const newStatus = change.after.data().Status
       const trainingref=  db.collection('Trainings').doc(context.params.trainingId);
       let training=  (await trainingref.get()).data()
        const oldStatus =  change.before.data().Status;
        let month = training.StartDate.toDate().getMonth()+1;
        const year = training.StartDate.toDate().getFullYear();
        const statusDate=`${month}.${newStatus}`;
        const statusDate2=`${month}.${oldStatus}`;
        console.log(statusDate);
        const Stats=db.collection('TrainingStatistics').doc(`${year}`);   
        console.log(year);     
        Stats.update(statusDate,admin.firestore.FieldValue.increment(1));
        Stats.update(statusDate2,admin.firestore.FieldValue.increment(-1));

        console.log("test");
      return null;
    });

    exports.deleteTraining2 = functions.region('europe-west3').firestore
    .document('Trainings/{trainingId}')
    .onDelete( async(change, context) => {
        const Status = change.data().Status;
        const trainingref=  db.collection('Trainings').doc(context.params.trainingId);
        let month = change.data().StartDate.toDate().getMonth()+1;
        month.Status=Status;
        const year = change.data().StartDate.toDate().getFullYear();
        const statusDate=`${month}.${Status}`;
        const Stats=db.collection('TrainingStatistics').doc(`${year}`);        
        Stats.update(statusDate,admin.firestore.FieldValue.increment(-1));
      return null;
    });

    exports.FcmMessaging = functions.region('europe-west3').firestore
    .document('Employees/{employeeId}/Messages/{messageId}')
    .onCreate( async(snap, context) => {
       const employeeRef = db.doc(`Employees/${context.params.employeeId}`)
    

       let fcmToken=  (await employeeRef.get()).data().fcmToken
    //   console.log(fcmToken);
       const payload={
        notification:{
          title:"Training Matrix",
          body: snap.data().message,
          clickAction: "localhost:44319"
              }
          };
      admin.messaging().sendToDevice(fcmToken,payload);
return null;
    });

    exports.Ratings = functions.region('europe-west3').firestore
    .document('Trainings/{trainingId}/Reviews/{employeeId}')
    .onWrite(async(change,context)=>
    {
      let ratingSum =0;
      let count=0;
      console.log(`Trainings/${context.params.trainingId}/Reviews`)
      const reviewsRef= db.collection(`Trainings/${context.params.trainingId}/Reviews`);
      const reviewsSnapshot = await reviewsRef.get();
     reviewsSnapshot.forEach(doc => {
        ratingSum+= parseFloat(doc.data().rating);
        console.log(doc.data.rating)
        count++;
     });
     const newRating = ratingSum/count;
     console.log(ratingSum,count);
     await db.doc(`Trainings/${context.params.trainingId}`).update({"rating":newRating});
     return null;
    }
    )