using Google.Cloud.Firestore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrainingManagement.Models
{
    [FirestoreData]
    public class TrainingStats
    {
        [FirestoreProperty]
        public int Finished { get; set; }

        [FirestoreProperty]
        public int Canceled { get; set; }

        [FirestoreProperty]
        public int  InProgress { get; set; }

        [FirestoreProperty]
        public int Postponed { get; set; }

        [FirestoreProperty]
        public int NotStarted { get; set; }

        public override string ToString()
        {
            return $"Finshed,{Finished} {Environment.NewLine}"+$"Canceled,{Canceled}{Environment.NewLine}"+$"In Progress,{InProgress}{Environment.NewLine}" +$"Postponed,{Postponed}{Environment.NewLine}"
                +$"Not Started,{NotStarted}{Environment.NewLine}";
        }
    }
}
