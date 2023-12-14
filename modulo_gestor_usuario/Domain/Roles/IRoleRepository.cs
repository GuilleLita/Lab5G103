
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Roles
{
    public interface IRoleRepository: IRepository<Role, RoleId>
    {
    }
}