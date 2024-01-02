
describe('login page test',() =>{
  beforeEach(() => {
  cy.visit('http://localhost:3000/')
  });
    it('Update Task', () => {

      cy.get('[id="email"]').type('user@email.com');
      cy.get('[id="password"]').type('pas');
      cy.get('[id="login"]').click();
      cy.contains('Add Task').click();
  
      // Hacer clic en el dropdown y seleccionar "Aceptada"
      
      cy.get('[id="taskName"]').type('nuevaTarea');
      cy.get('[id="building1"]').click();
      cy.contains('test5').click();
      cy.get('[id="building2"]').click();
      cy.contains('test6').click();
      cy.get('[id="floor1"]').click();
      cy.contains('a2').click();
      cy.get('[id="floor2"]').click();
      cy.contains('b2').click();
      cy.get('[id="initialPoint1"]').type('3');
      cy.get('[id="initialPoint2"]').type('3');
      cy.get('[id="destinationPoint1"]').type('3');
      cy.get('[id="destinationPoint2"]').type('3');
      cy.get('[id="status"]').type('pending');
      cy.get('[id="Create"]').click();
      cy.on('window:alert', (text) => {
      expect(text).to.equal('Task added'); 
      });
    });
    });