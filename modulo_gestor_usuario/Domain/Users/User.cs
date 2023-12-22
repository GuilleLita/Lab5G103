using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Roles;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace DDDSample1.Domain.Users
{[BsonIgnoreExtraElements]
    public class User : Entity<UserId>, IAggregateRoot
    { [BsonElement("Username")]
        [BsonRepresentation(BsonType.String)]
       
        public string Username { get;  private set; }
        [BsonElement("Password")]
        [BsonRepresentation(BsonType.String)]
        public string Password { get;  private set; }
        [BsonElement("RoleId")]
        //[BsonRepresentation(BsonType.String)]
        
        public RoleId RoleId { get;  private set; }
        public bool Active{ get;  private set; }

        private User()
        {
            this.Active = true;
        }

        public User(string username, string password, RoleId catId)
        {
            if (catId == null)
                throw new BusinessRuleValidationException("Every User requires a Role.");
            this.Id = new UserId(Guid.NewGuid());
            this.Username = username;
            this.Password = password;
            this.RoleId = catId;
            this.Active = true;
        }

        public void ChangeUsername(string username)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the description to an inactive User.");
            this.Username = username;
        }
        public void ChangePassword(string password)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the description to an inactive User.");
            this.Password = password;
        }
        public void ChangeRoleId(RoleId catId)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the Role of an inactive User.");
            if (catId == null)
                throw new BusinessRuleValidationException("Every User requires a Role.");
            this.RoleId = catId;;
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}