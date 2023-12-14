using DDDSample1.Domain.Roles;
using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.Roles
{
    public class RoleRepository : BaseRepository<Role, RoleId>, IRoleRepository
    {
    
        public RoleRepository(DDDSample1DbContext context):base(context.Roles)
        {
           
        }


    }
}