using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using DDDSample1.Interfaces;
using DDDSample1.Implementations;
using MongoDB.Driver;
namespace DDDSample1.Domain.Families
{
    public class FamilyService
    {
       // private readonly IUnitOfWork _unitOfWork;
        //private readonly IFamilyRepository _repo;
  
        private readonly IMongoCollection<FamilyDto> _family;
        public FamilyService(iMongoDBSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DB);
        }

        public async Task<List<FamilyDto>> GetAllAsync()
        {
            var families = await _family.Find(f => true).ToListAsync();

            return families;
        }
/*
        public async Task<FamilyDto> GetByIdAsync(FamilyId id)
        {
            var fam = await this._repo.GetByIdAsync(id);
            
            if(fam == null)
                return null;

            return new FamilyDto{Id = fam.Id.AsString(), Description = fam.Description};
        }

        public async Task<FamilyDto> AddAsync(FamilyDto dto)
        {
            var family = new Family(dto.Id, dto.Description);

            await this._repo.AddAsync(family);

            await this._unitOfWork.CommitAsync();

            return new FamilyDto { Id = family.Id.AsString(), Description = family.Description };
        }

        public async Task<FamilyDto> UpdateAsync(FamilyDto dto)
        {
            var family = await this._repo.GetByIdAsync(new FamilyId(dto.Id)); 

            if (family == null)
                return null;   

            // change all field
            family.ChangeDescription(dto.Description);
            
            await this._unitOfWork.CommitAsync();

            return new FamilyDto { Id = family.Id.AsString(), Description = family.Description };
        }

        public async Task<FamilyDto> InactivateAsync(FamilyId id)
        {
            var family = await this._repo.GetByIdAsync(id); 

            if (family == null)
                return null;   

            // change all fields
            family.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return new FamilyDto { Id = family.Id.AsString(), Description = family.Description };
        }

         public async Task<FamilyDto> DeleteAsync(FamilyId id)
        {
            var family = await this._repo.GetByIdAsync(id); 

            if (family == null)
                return null;   

            if (family.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active family.");
            
            this._repo.Remove(family);
            await this._unitOfWork.CommitAsync();

            return new FamilyDto { Id = family.Id.AsString(), Description = family.Description };
        }*/
    }
}