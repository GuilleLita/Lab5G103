using System;
using DDDSample1.Domain.Shared;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DDDSample1.Domain.Roles
{[BsonIgnoreExtraElements]
    public class Role : Entity<RoleId>, IAggregateRoot
    {
     [BsonElement("Description")]
        [BsonRepresentation(BsonType.String)]
        
        public string Description { get;  private set; }

        public bool Active{ get;  private set; }

        private Role()
        {
            this.Active = true;
        }

        public Role(string description)
        {
            this.Id = new RoleId(Guid.NewGuid());
            this.Description = description;
            this.Active = true;
        }

        public void ChangeDescription(string description)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the description to an inactive role.");
            this.Description = description;
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}