describe('login page test',() =>{
  beforeEach(() => {
  cy.visit('http://localhost:3000/')
  });
    it('Update Task', () => {
      cy.get('[id="email"]').type('gestor@email.com');
      cy.get('[id="password"]').type('pass');
      cy.get('[id="login"]').click();
      cy.contains('Reject/Accept Task').click();
  
      // Hacer clic en el dropdown y seleccionar "Aceptada"
      cy.get('[id="status-dropdown2"]').click();
      cy.contains(/.[0-9]+./).click();
      cy.get('[id="status"]').type('reject');
      cy.get('[id="Update"]').click();
      cy.on('window:alert', (text) => {
      expect(text).to.equal('task updated'); 
      });
    });
    });