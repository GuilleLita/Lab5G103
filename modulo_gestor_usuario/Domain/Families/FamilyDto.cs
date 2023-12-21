using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DDDSample1.Domain.Families
{
    [BsonIgnoreExtraElements]
    public class FamilyDto
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public Guid Id { get; set; }
        [BsonElement("Description")]
        [BsonRepresentation(BsonType.String)]
        public string Description { get; set; }
    }
}