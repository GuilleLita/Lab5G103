using DDDSample1.Domain.Shared;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace DDDSample1.Domain.Users
{
    public interface IUserRepository: IRepository<User,UserId>
    {
    }
}