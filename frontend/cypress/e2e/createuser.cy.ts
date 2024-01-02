
describe('Create user from admin test',() =>{
  beforeEach(() => {
  cy.visit('http://localhost:3000/')
  });
    it('Update Task', () => {

      cy.get('[id="email"]').type('admin@email.com');
      cy.get('[id="password"]').type('pass');
      cy.get('[id="login"]').click();
      cy.contains('Create new User').click();
  
      // Hacer clic en el dropdown y seleccionar "Aceptada"
      let user = 'User'+ Math.floor(Math.random() * 1000);
      cy.get('[id="firstName"]').type(user);
      cy.get('[id="lastName"]').type(user);
      cy.get('[id="email"]').type(user+'@email.com');
      cy.get('[id="password"]').type('pass');
      cy.get('[id="roleSelect"]').click();
      cy.contains(/[^ ](User)/).click();
      cy.get('[id="subButton"]').click();
      cy.on('window:alert', (text) => {
      expect(text).to.equal('User created'); 
      });
    });
    });