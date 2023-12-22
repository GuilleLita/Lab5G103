using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Roles;
using DDDSample1.Interfaces;
using DDDSample1.Implementations;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace DDDSample1.Domain.Users
{
    public class UserService
    {
        //private readonly IUnitOfWork _unitOfWork;
        //private readonly IUserRepository _repo;

        //private readonly IRoleRepository _repoCat;
private readonly IMongoCollection<UserDto> _user;
        public UserService(iMongoDBSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DB);
            _user = database.GetCollection<UserDto>("users");
        }

        public async Task<List<UserDto>> GetAllAsync()
        {
            var users = await _user.Find(f => true).ToListAsync();

            return users;
        }

        public async Task<UserDto> GetByIdAsync(UserId id)
{
    var filter = Builders<UserDto>.Filter.Eq("_id", id); // Suponiendo que el ID es una cadena

    var user = await _user.Find(filter).FirstOrDefaultAsync();

    if (user == null)
        return null;

    return user;
}

 public async Task<UserDto> AddAsync(CreatingUserDto dto)
{
    var user = new User(dto.Username, dto.Password, dto.RoleId);

    var convertion=new UserDto (user.Id.AsGuid(),user.Username,user.Password,user.RoleId);

    await _user.InsertOneAsync(convertion);

    return new UserDto (user.Id.AsGuid(),user.Username,user.Password,user.RoleId);
}
/*
        public async Task<UserDto> AddAsync(CreatingUserDto dto)
        {
            await checkRoleIdAsync(dto.RoleId);
            var user = new User(dto.Username,dto.Password,dto.RoleId);

            await this._repo.AddAsync(user);

            await this._unitOfWork.CommitAsync();

            return new UserDto(user.Id.AsGuid(),user.Username,user.Password,user.RoleId);
        }

        public async Task<UserDto> UpdateAsync(UserDto dto)
        {
            await checkRoleIdAsync(dto.RoleId);
            var user = await this._repo.GetByIdAsync(new UserId(dto.Id)); 

            if (user == null)
                return null;   

            // change all fields
            user.ChangeUsername(dto.Username);
            user.ChangePassword(dto.Password);
            user.ChangeRoleId(dto.RoleId);
            
            await this._unitOfWork.CommitAsync();

            return new UserDto(user.Id.AsGuid(),user.Username,user.Password,user.RoleId);
        }

        public async Task<UserDto> InactivateAsync(UserId id)
        {
            var user = await this._repo.GetByIdAsync(id); 

            if (user == null)
                return null;   

            user.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return new UserDto(user.Id.AsGuid(),user.Username,user.Password,user.RoleId);
        }

        public async Task<UserDto> DeleteAsync(UserId id)
        {
            var user = await this._repo.GetByIdAsync(id); 

            if (user == null)
                return null;   

            if (user.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active user.");
            
            this._repo.Remove(user);
            await this._unitOfWork.CommitAsync();

            return new UserDto(user.Id.AsGuid(),user.Username,user.Password,user.RoleId);
        }

        private async Task checkRoleIdAsync(RoleId roleId)
        {
           var role = await _repoCat.GetByIdAsync(roleId);
           if (role == null)
                throw new BusinessRuleValidationException("Invalid Role Id.");
        }*/
    }
}