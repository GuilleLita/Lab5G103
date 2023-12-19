using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDSample1.Interfaces;
namespace DDDSample1.Implementations
{
    public class MongoDBSettings : iMongoDBSettings
    {
        public string DB { get; set; }
        public string ConnectionString { get; set; }
        
    }
}