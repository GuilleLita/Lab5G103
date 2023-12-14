using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Roles
{
    public class Role : Entity<RoleId>, IAggregateRoot
    {
     
        public string Description { get;  private set; }

        public bool Active{ get;  private set; }

        private Role()
        {
            this.Active = true;
        }

        public Role(string description)
        {
            this.Id = new RoleId(Guid.NewGuid());
            this.Description = description;
            this.Active = true;
        }

        public void ChangeDescription(string description)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the description to an inactive role.");
            this.Description = description;
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}