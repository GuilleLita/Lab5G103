using DDDSample1.Domain.Roles;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace DDDSample1.Domain.Users
{
    public class CreatingUserDto
    {
        public string Username { get;  set; }
        public string Password { get;  set; }
        public RoleId RoleId { get;   set; }


        public CreatingUserDto(string username, string password, RoleId catId)
        {
            this.Username = username;
            this.Password = password;
            this.RoleId = catId;
        }
    }
}