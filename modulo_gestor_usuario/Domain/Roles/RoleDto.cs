using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DDDSample1.Domain.Roles
{
    [BsonIgnoreExtraElements]
    public class RoleDto
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]

        public Guid Id { get; set; }
        [BsonElement("Description")]
        [BsonRepresentation(BsonType.String)]
        
        public string Description { get; set; }
    }
}