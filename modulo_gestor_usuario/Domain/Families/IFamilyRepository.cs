using DDDSample1.Domain.Shared;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DDDSample1.Domain.Families
{
    public interface IFamilyRepository:IRepository<Family,FamilyId>
    {

    }
}