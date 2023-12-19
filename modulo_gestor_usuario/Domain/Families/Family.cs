using DDDSample1.Domain.Shared;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace DDDSample1.Domain.Families
{
    [BsonIgnoreExtraElements]
    public class Family : Entity<FamilyId>, IAggregateRoot
    {
        [BsonElement("Description")]
        [BsonRepresentation(BsonType.String)]
        public string Description { get;  private set; }

        public bool Active{ get;  private set; }

        private Family()
        {
            this.Active = true;
        }

        public Family(string code, string description)
        {
            this.Id = new FamilyId(code);
            this.Description = description;
            this.Active = true;
        }

        public void ChangeDescription(string description)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the description to an inactive family.");
            this.Description = description;
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}