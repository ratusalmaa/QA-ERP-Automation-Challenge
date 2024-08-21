it('Login Phoenix', () => {
    //Login
    cy.visit('/') // Untuk mengakses web phoenix-dev tanpa harus mengetikkan ulang url webnya (baseUrl dimasukkan di file cypress.config.js)
    cy.get('#login').type('ratu.salma@mceasy.co.id') // Input email
    cy.get('#password').type('Queen1212*{enter}') // Input password dan langsung klik enter
    //cy.get('.btn').click(); -- cara lainnya apabila benar-benar ingin mengklik button Log in
    cy.get('.o_home_menu').should('be.visible'); // Memastikan halaman home sudah ditampilkan sebelum lanjut ke action berikutnya
})
it('Create Quotation', () => {
    //Create Quotation
    cy.get('#result_app_6').should('be.visible').click(); // Mengklik icon Sales
    cy.get('div.d-xl-inline-flex').find('button').should('be.visible').click(); // Mengklik Button New untuk Create Quotation
    cy.get('#title_0').type('Quotation Testing Automation Ratu'); // Menginputkan Nama Quotation
    cy.get('#partner_id_0').click(); // Mengklik field Nama Customer
    cy.get('li.o-autocomplete--dropdown-item.ui-menu-item.d-block')
    .should('be.visible') // Memastikan pilihan dropdown sudah terlihat/ditampilkan
    .first() // Memilih Customer teratas/pertama di list dropdown
    .click(); // Mengklik customer yang sudah dipilih

    //cy.get('#partner_id_0').should('be.visible').type('Rosalia Indah Transport, PT{enter}').should('have.value', 'Rosalia Indah Transport, PT'); -- tidak jadi dipakai, tapi tujuannya untuk menginputkan nama customer -> enter -> memastikan filed telah terisi
    cy.get('#responsible_partner_id_0').click();
    cy.get('ul.o-autocomplete--dropdown-menu.ui-widget.show.dropdown-menu.ui-autocomplete').should('be.visible').first();
})