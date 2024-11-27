describe('Not Found Page', () => {
    beforeEach(() => {
      cy.visit('/non-existent-route', { failOnStatusCode: false });
    });
  
    it('should display the "NOT FOUND" message', () => {
      cy.contains('Not found').should('be.visible');
    });
  });