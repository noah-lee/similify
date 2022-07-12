describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/');
    cy.get('header').get('button').click();
    cy.origin('accounts.spotify.com', () => {
      // window.alert('hey');
      cy.get('#login-button').click();
      cy.get('div[role="alert"]').should('contain', 'Oops!');
    });
  });
});
