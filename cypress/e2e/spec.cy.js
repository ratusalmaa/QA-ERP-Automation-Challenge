it('Login Phoenix & Create Quotation', () => {
    //Login
    cy.visit('/')
    cy.get('#login').type('ratu.salma@mceasy.co.id')
    cy.get('#password').type('Queen1212*{enter}')
    //cy.get('.btn').click();

    //Create Quotation
    cy.get('.o_home_menu').should('be.visible');
    cy.get('#result_app_6').should('be.visible').click();
    cy.get('div.d-xl-inline-flex').find('button').should('be.visible').click();
    cy.get('#title_0').type('Quotation Testing Automation Ratu');
    cy.get('#partner_id_0').click();
    cy.get('li.o-autocomplete--dropdown-item.ui-menu-item.d-block')
    .should('be.visible')
    .first()
    .click();
    //cy.get('#partner_id_0').should('be.visible').type('Rosalia Indah Transport, PT{enter}').should('have.value', 'Rosalia Indah Transport, PT');
    cy.get('#responsible_partner_id_0').click();
    cy.get('ul.o-autocomplete--dropdown-menu.ui-widget.show.dropdown-menu.ui-autocomplete').should('be.visible').first();
})