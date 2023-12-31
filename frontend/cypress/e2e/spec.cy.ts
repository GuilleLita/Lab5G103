describe('login page test',() =>{
  beforeEach(() => {
  cy.visit('http://localhost:3000/')
  });
    it('Update Task', () => {
  
      cy.contains('Reject/Accept Task').click();
  
      // Hacer clic en el dropdown y seleccionar "Aceptada"
      cy.get('[id="status-dropdown2"]').click();
      cy.contains('8d5e29bc-4642-4a52-b202-a7bc1a40bb91').click();
      cy.get('[id="status"]').type('reject');
      cy.get('[id="Update"]').click();
      cy.on('window:alert', (text) => {
      expect(text).to.equal('task updated'); 
      });
    });
    });