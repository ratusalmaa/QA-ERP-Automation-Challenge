it('Login Phoenix & Create Quotation', () => {
    //Login
    cy.visit('/') // Untuk mengakses web phoenix-dev tanpa harus mengetikkan ulang url webnya (baseUrl dimasukkan di file cypress.config.js)
    cy.get('#login').type('ratu.salma@mceasy.co.id') // Input email
    cy.get('#password').type('Queen1212*{enter}') // Input password dan langsung klik enter
    //cy.get('.btn').click(); -- cara lainnya apabila benar-benar ingin mengklik button Log in

    //Create Quotation
    cy.get('.o_home_menu').should('be.visible'); // Memastikan halaman home sudah ditampilkan sebelum lanjut ke action berikutnya
    cy.get('#result_app_6').should('be.visible').click(); // Mengklik icon Sales
    cy.get('div.d-xl-inline-flex').find('button').should('be.visible').click(); // Mengklik Button New untuk Create Quotation
    cy.get('#title_0').type('Quotation Testing Automation Ratu'); // Menginputkan Nama Quotation
    cy.get('#partner_id_0').click(); // Mengklik field Nama Customer
    cy.get('li.o-autocomplete--dropdown-item.ui-menu-item.d-block')
    .should('be.visible') // Memastikan pilihan dropdown sudah terlihat/ditampilkan
    .first() // Memilih Customer teratas/pertama di list dropdown
    .click(); // Mengklik customer yang sudah dipilih
})