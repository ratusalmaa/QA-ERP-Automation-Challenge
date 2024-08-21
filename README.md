# QA-ERP-Automation-Challenge

Code ada di Folder cypress > e2e > spec.cy.js

Archived Code :
before(() => {
// Login
cy.visit('/') // Untuk mengakses web phoenix-dev tanpa harus mengetikkan ulang url webnya (baseUrl dimasukkan di file cypress.config.js)
cy.get('#login').type('ratu.salma@mceasy.co.id') // Input email
cy.get('#password').type('Queen1212*{enter}') // Input password dan langsung klik enter
//cy.get('.btn').click(); -- cara lainnya apabila benar-benar ingin mengklik button Log in
cy.get('.o_home_menu').should('be.visible'); // Memastikan halaman home sudah ditampilkan sebelum lanjut ke action berikutnya
});

// Kalau mau pake cookies
beforeEach(() => {
Cypress.Cookies.preserveOnce('session_id', 'remember_token'); // Menyimpan cookies yang relevan
});

cy.get('#partner_id_0').should('be.visible').type('Rosalia Indah Transport, PT{enter}').should('have.value', 'Rosalia Indah Transport, PT'); -- tidak jadi dipakai, tapi tujuannya untuk menginputkan nama customer -> enter -> memastikan filed telah terisi

//Kalau mau menemukan elemen di dalam elemen
.find('span.o_dropdown_button')
        .should('be.visible')
        .click();

// Menambahkan assertion untuk memastikan bahwa file sudah terupload (opsional)
   cy.get('iframe.o_pdfview_iframe')
     .should('have.value'); // Sesuaikan selector dan teks sesuai elemen Anda