
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DDDSample1.Domain.Roles
{[BsonIgnoreExtraElements]
    public class CreatingRoleDto
    {
        [BsonElement("Description")]
        [BsonRepresentation(BsonType.String)]
        
        public string Description { get; set; }


        public CreatingRoleDto(string description)
        {
            this.Description = description;
        }
    }
}