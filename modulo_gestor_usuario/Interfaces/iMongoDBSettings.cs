using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DDDSample1.Interfaces
{
    public  interface iMongoDBSettings
    {
        public string DB { get; set; }
        public string ConnectionString { get; set; }
        
    }
}