using DDDSample1.Domain.Roles;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace DDDSample1.Domain.Users
{[BsonIgnoreExtraElements]
    public class CreatingUserDto
    {
        [BsonElement("Username")]
        [BsonRepresentation(BsonType.String)]
        public string Username { get;  set; }
         [BsonElement("Password")]
        [BsonRepresentation(BsonType.String)]
       
        public string Password { get;  set; }
        [BsonElement("RoleId")]
        //[BsonRepresentation(BsonType.String)]
        
        public RoleId RoleId { get;   set; }


        public CreatingUserDto(string username, string password, RoleId catId)
        {
            this.Username = username;
            this.Password = password;
            this.RoleId = catId;
        }
    }
}