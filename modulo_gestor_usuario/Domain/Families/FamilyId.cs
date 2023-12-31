using System;
using Newtonsoft.Json;
using DDDSample1.Domain.Shared;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace DDDSample1.Domain.Families
{
    public class FamilyId : EntityId
    {
        [JsonConstructor]
        public FamilyId(Guid value) : base(value)
        {
        }
        public FamilyId(String value):base(value)
        {

        }

        override
        protected  Object createFromString(String text){
            return new Guid(text);
        }
        override
        public String AsString(){
            Guid obj = (Guid) base.ObjValue;
            return obj.ToString();
            }
        public Guid AsGuid(){
            return (Guid) base.ObjValue;
        }
    }
}