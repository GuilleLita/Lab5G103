using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using DDDSample1.Interfaces;
using DDDSample1.Implementations;
using MongoDB.Driver;
namespace DDDSample1.Domain.Roles
{
    public class RoleService
    {
        //private readonly IUnitOfWork _unitOfWork;
        //private readonly IRoleRepository _repo;
private readonly IMongoCollection<RoleDto> _role;
        public RoleService(iMongoDBSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DB);
            _role = database.GetCollection<RoleDto>("roles");
        }

        public async Task<List<RoleDto>> GetAllAsync()
        {
            var roles = await _role.Find(f => true).ToListAsync();

            return roles;
        }

        public async Task<RoleDto> GetByIdAsync(RoleId id)
        {
            var filter = Builders<RoleDto>.Filter.Eq("_id", id); // Suponiendo que el ID es una cadena

            var role = await _role.Find(filter).FirstOrDefaultAsync();

            if (role == null)
                return null;

            return role;
        }

        public async Task<RoleDto> AddAsync(CreatingRoleDto dto)
{
    var role = new Role(dto.Description);

    var convertion=new RoleDto {Description = role.Description };

    await _role.InsertOneAsync(convertion);

    return new RoleDto { Id = role.Id.AsGuid(), Description = role.Description };
}

/*
        public async Task<RoleDto> GetByIdAsync(RoleId id)
        {
            var cat = await this._repo.GetByIdAsync(id);
            
            if(cat == null)
                return null;

            return new RoleDto{Id = cat.Id.AsGuid(), Description = cat.Description};
        }

        public async Task<RoleDto> AddAsync(CreatingRoleDto dto)
        {
            var role = new Role(dto.Description);

            await this._repo.AddAsync(role);

            await this._unitOfWork.CommitAsync();

            return new RoleDto { Id = role.Id.AsGuid(), Description = role.Description };
        }

        public async Task<RoleDto> UpdateAsync(RoleDto dto)
        {
            var role = await this._repo.GetByIdAsync(new RoleId(dto.Id)); 

            if (role == null)
                return null;   

            // change all field
            role.ChangeDescription(dto.Description);
            
            await this._unitOfWork.CommitAsync();

            return new RoleDto { Id = role.Id.AsGuid(), Description = role.Description };
        }

        public async Task<RoleDto> InactivateAsync(RoleId id)
        {
            var role = await this._repo.GetByIdAsync(id); 

            if (role == null)
                return null;   

            // change all fields
            role.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return new RoleDto { Id = role.Id.AsGuid(), Description = role.Description };
        }

         public async Task<RoleDto> DeleteAsync(RoleId id)
        {
            var role = await this._repo.GetByIdAsync(id); 

            if (role == null)
                return null;   

            if (role.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active role.");
            
            this._repo.Remove(role);
            await this._unitOfWork.CommitAsync();

            return new RoleDto { Id = role.Id.AsGuid(), Description = role.Description };
        }*/
    }
}