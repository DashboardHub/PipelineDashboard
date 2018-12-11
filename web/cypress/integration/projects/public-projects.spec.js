describe('Public Projects', () => {

    it('Homepage has a heading', () => {
        cy.get('mat-card-header').should('contain', 'Public Projects');
    });

    it('Side nav should not have logged in links', () => {
        cy.get('mat-sidenav').should('contain', 'Public Projects');
        cy.get('mat-sidenav').not('contain', 'My Projects');
    });
});
