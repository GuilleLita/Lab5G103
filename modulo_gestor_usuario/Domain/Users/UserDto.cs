using System;
using DDDSample1.Domain.Roles;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace DDDSample1.Domain.Users
{
    [BsonIgnoreExtraElements]
    public class UserDto
    {   
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public Guid Id { get; set; }
        [BsonElement("Username")]
        [BsonRepresentation(BsonType.String)]
        public string Username { get;  set; }
        [BsonElement("Password")]
        [BsonRepresentation(BsonType.String)]
        public string Password { get;  set; }
        [BsonElement("RoleId")]
        //[BsonRepresentation(BsonType.String)]
        public RoleId RoleId { get;  set; }

        public UserDto(Guid Id, string username, string password, RoleId catId)
        {
            this.Id = Id;
            this.Username = username;
            this.Password = password;
            this.RoleId = catId;
        }
    }
}