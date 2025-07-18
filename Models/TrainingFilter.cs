﻿using Org.BouncyCastle.Asn1.Cmp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrainingManagement.Models
{
    public class TrainingFilter
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public string Location { get; set; }
        public DateTime Date { get; set; }
        public string Departament { get; set; }
    }
}
