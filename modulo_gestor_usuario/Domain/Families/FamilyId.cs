using System;
using DDDSample1.Domain.Shared;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace DDDSample1.Domain.Families
{
    public class FamilyId : EntityId
    {

        public FamilyId(String value):base(value)
        {

        }

        override
        protected  Object createFromString(String text){
            return text;
        }
        override
        public String AsString(){
            return (String) base.Value;
        }
    }
}