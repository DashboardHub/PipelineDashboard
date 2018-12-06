describe('Projects', () => {

    it('Homepage has a heading', () => {
        cy.get('h1').should('contain', 'Projects');
    });

});
