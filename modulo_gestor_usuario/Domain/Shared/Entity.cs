using System;
using DDDSample1.Domain.Shared;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DDDSample1.Domain.Shared
{
    [BsonIgnoreExtraElements]
    /// <summary>
    /// Base class for entities.
    /// </summary>
    public abstract class Entity<TEntityId>
    where TEntityId: EntityId
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]

        public TEntityId Id { get;  protected set; }
    }
}