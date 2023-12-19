using System;
using DDDSample1.Domain.Roles;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace DDDSample1.Domain.Users
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string Username { get;  set; }
        public string Password { get;  set; }
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