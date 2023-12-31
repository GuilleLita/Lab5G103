describe('login page test',() =>{
  beforeEach(() => {
  cy.visit('http://localhost:3000/')
  });
  it('List Task', () => {
  
    cy.contains('List Task').click();

    // Hacer clic en el dropdown y seleccionar "Aceptada"
    cy.get('[id="status-dropdown"]').click();
    cy.contains('aceptada').click();
    cy.contains('Task 1');
  });/*
  it('Update Task', () => {
  
    cy.contains('Reject/Accept Task').click();

    // Hacer clic en el dropdown y seleccionar "Aceptada"
    cy.get('[id="status-dropdown"]').click();
    cy.contains('8d5e29bc-4642-4a52-b202-a7bc1a40bb91').click();
    cy.get('id=status').type('reject');
  });*/
  });