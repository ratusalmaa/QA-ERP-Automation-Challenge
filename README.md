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


Kodingan terbaru
//Command function untuk melakukan login
Cypress.Commands.add('login', () => {
    cy.visit('/');
    cy.get('#login').type('ratu.salma@mceasy.co.id');
    cy.get('#password').type('Queen1212*{enter}');
    cy.get('.o_home_menu').should('be.visible');
});

// Menggunakan cy.session() untuk menyimpan dan memulihkan session
beforeEach(() => {
    cy.session('loginSession', () => {
        cy.login();
    });
});

//Test Case : Create Quotation
it('Create Quotation', () => {
    //Memastikan halaman home phoenix-dev telah ditampilkan
    cy.visit('/');
    cy.get('.o_home_menu').should('be.visible');

    // Mengklik icon Sales
    cy.get('#result_app_6').should('be.visible').click(); 

    // Mengklik Button New untuk Create Quotation
    cy.get('div.d-xl-inline-flex').find('button').should('be.visible').click(); 
    
    // Menginputkan Nama Quotation
    // cy.get('#title_0').type('Quotation Testing Automation Ratu'); 

    // Import faker
    const faker = require('faker');

    describe('Dynamic Input Test', () => {
        it('should input a dynamic name', () => {
          // Membuat nama dinamis menggunakan timestamp
          const timestamp = new Date().getTime();
          const dynamicName = `Quotation Testing Automation ${timestamp}`;
      
          // Menggunakan nama dinamis sebagai input
          cy.get('#title_0').type(dynamicName);
        });
      });
      

    // Mengklik field Nama Customer
    cy.get('#partner_id_0').click(); 
    
    // Memastikan pilihan dropdown Nama Customer sudah terlihat/ditampilkan
    cy.get('li.o-autocomplete--dropdown-item.ui-menu-item.d-block')
        .should('be.visible') 
        .first() // Memilih Customer teratas/pertama di list dropdown
        .click(); // Mengklik customer yang sudah dipilih
    
    //Mengklik Field Customer PIC
    cy.get('#responsible_partner_id_0').click();
    
    // Memastikan pilihan dropdown Customer PIC sudah terlihat/ditampilkan
    cy.get('ul.o-autocomplete--dropdown-menu.ui-widget.show.dropdown-menu.ui-autocomplete')
        .should('be.visible')
        .first();
    
    //Menginputkan Customer PIC 
    cy.get('input#responsible_partner_id_0.o-autocomplete--input.o_input')
        .should('be.visible')
        .type('Yadhi Aristianto{enter}');
    
    //Menginputkan field Promotion dengan jenis Promo Normal Monthly (3 Month)
    cy.get('input#sale_promotion_id_0.o-autocomplete--input.o_input').click()
        .should('be.visible')
        .type('Normal Monthly (3 Month){enter}')
    
        // .then(() => {
        //     // Tunggu hingga elemen lain (misalnya, elemen hasil pencarian) muncul atau status menyimpan selesai
        //     cy.get('#sale_promotion_id_0', { timeout: 10000 }).should('be.visible');
        // });

    //Menambahkan produk pertama yaitu VSMS GPS Rental - Full Package B
    cy.contains('Add a line').click();
    cy.get('td.o_data_cell.cursor-pointer.o_field_cell.o_list_many2one:not(.o_readonly_modifier.text-muted)')
        .should('be.visible')
        .click()
        .type('VSMS GPS Rental - Full Package B{enter}');

    //Menambahkan produk kedua yaitu GPS Installation Cost
    cy.contains('Add a line').click();
    cy.get('td.o_data_cell.cursor-pointer.o_field_cell.o_list_many2one:not(.o_readonly_modifier.text-muted)')
        .eq(2)    
        .should('be.visible')
        .click()
        .type('GPS Installation Cost{enter}')
        cy.wait(1000);

    // Save Manually    
    cy.get('i.fa.fa-cloud-upload.fa-fw').click();

    //Request Quotation
    cy.contains('Request').click();
    cy.wait(5000);

    //Memastikan status Quotation sudah Request
    cy.contains('Set to Draft').should('contain.text', 'Set to Draft');
    cy.wait(1000);
});

//First Approval menggunakan akun Jeanette
it('First Approval', () => {
    //Logout Sales Account (Ratu Salma)
    cy.visit('/');
    cy.get('img.o_avatar.o_user_avatar.rounded')
    .should('be.visible')
    .click();

    cy.contains('Log out').click();

    //Login Akun First Approval
    cy.get('#login').type('jeanette.grace@mceasy.co.id') // Input email
        cy.get('#password').type('jeanette.grace@mceasy.co.id{enter}')
        cy.get('.o_home_menu').should('be.visible');

    //Mengklik icon Approval
    cy.get('#result_app_1').should('be.visible').click();

    //Memilih jenis approval untuk Quotation
    cy.get('.btn.btn-primary.oe_kanban_action.oe_kanban_action_button')
        .eq(1)  
        .should('be.visible')
        .click()
        
    cy.wait(2000);

    //Mencari Quotation yang akan diapprove berdasarkan nama sales : Ratu Salma
    cy.get('[role="searchbox"]').click().type('Ratu Salma');

    cy.get('ul.o-dropdown--menu.dropdown-menu.o_searchview_autocomplete.show')
        .find('li.o_menu_item.dropdown-item')
        .eq(2)
        .click();
    cy.wait(1000);  

    //Memilih Quotation yang akan diapprove berdasarkan list quotation yang paling atas
    cy.get('tr.o_data_row').first().click();

    //Melakukan Approve Quotation
    cy.contains('Approve').click();
    cy.wait(1000);
    });

//Second Approval menggunakan akun Yenny Widjojo
it('Second Approval', () => {
    //Login menggunakan akun Second Approval
    cy.visit('/');
    cy.get('#login').type('yenny.widjojo@mceasy.co.id') // Input email
    cy.get('#password').type('yenny.widjojo@mceasy.co.id{enter}')
    cy.get('.o_home_menu').should('be.visible');

    //Mengklik icon Approval
    cy.get('#result_app_1').should('be.visible').click();

    //Memilih jenis approval untuk Quotation
    cy.get('.btn.btn-primary.oe_kanban_action.oe_kanban_action_button')
        .eq(1)  
        .should('be.visible')
        .click()
        
    cy.wait(2000);
    //Mencari Quotation yang akan diapprove berdasarkan nama sales : Ratu Salma
    cy.get('[role="searchbox"]').click().type('Ratu Salma');

    cy.get('ul.o-dropdown--menu.dropdown-menu.o_searchview_autocomplete.show')
        .find('li.o_menu_item.dropdown-item')
        .eq(2)
        .click();
    cy.wait(1000);

    //Memilih Quotation yang akan diapprove berdasarkan list quotation yang paling atas
    cy.get('tr.o_data_row').first().click();

    //Melakukan Approve Quotation
    cy.contains('Approve').click();
    cy.wait(1000);

    //Mengupload File Signed Quotation
    cy.contains('Upload your file').click();
    
    // Mencari dan memilih file yang akan diupload
    cy.get('input[type="file"]').attachFile('SQ_Ratu.pdf');
    cy.wait(1000);
    
    //Klik button Signed
    cy.contains('Signed').click();
    cy.wait(1000);

    //Quotation Signed!
});


LAST TERBARU
//Command function untuk melakukan login
Cypress.Commands.add('login', () => {
    cy.visit('/');
    cy.get('#login').type('ratu.salma@mceasy.co.id');
    cy.get('#password').type('Queen1212*{enter}');
    cy.get('.o_home_menu').should('be.visible');
});

// Menggunakan cy.session() untuk menyimpan dan memulihkan session
beforeEach(() => {
    cy.session('loginSession', () => {
        cy.login();
    });
});

//Test Case : Create Quotation
it('Create Quotation', () => {
    //Memastikan halaman home phoenix-dev telah ditampilkan
    cy.visit('/');
    cy.get('.o_home_menu').should('be.visible');

    // Mengklik icon Sales
    cy.get('#result_app_6').should('be.visible').click(); 

    // Mengklik Button New untuk Create Quotation
    cy.get('div.d-xl-inline-flex').find('button').should('be.visible').click(); 
    
    // Menginputkan Nama Quotation
    // cy.get('#title_0').type('Quotation Testing Automation Ratu'); 
    const timestamp = new Date().getTime();
    const uniqueName = `Quotation Automation Ratu - ${timestamp}`;
    cy.get('#title_0').type(uniqueName);

    // Mengklik field Nama Customer
    cy.get('#partner_id_0').click(); 
    
    // Memastikan pilihan dropdown Nama Customer sudah terlihat/ditampilkan
    cy.get('li.o-autocomplete--dropdown-item.ui-menu-item.d-block')
        .should('be.visible') 
        .first() // Memilih Customer teratas/pertama di list dropdown
        .click(); // Mengklik customer yang sudah dipilih
    
    //Mengklik Field Customer PIC
    cy.get('#responsible_partner_id_0').click();
    
    // Memastikan pilihan dropdown Customer PIC sudah terlihat/ditampilkan
    cy.get('ul.o-autocomplete--dropdown-menu.ui-widget.show.dropdown-menu.ui-autocomplete')
        .should('be.visible')
        .first();
    
    //Menginputkan Customer PIC 
    cy.get('input#responsible_partner_id_0.o-autocomplete--input.o_input')
        .should('be.visible')
        .type('Yadhi Aristianto{enter}');
    
    //Menginputkan field Promotion dengan jenis Promo Normal Monthly (3 Month)
    cy.get('input#sale_promotion_id_0.o-autocomplete--input.o_input').click()
        .should('be.visible')
        .type('Normal Monthly (3 Month){enter}')
    cy.wait(1000);
    
        // .then(() => {
        //     // Tunggu hingga elemen lain (misalnya, elemen hasil pencarian) muncul atau status menyimpan selesai
        //     cy.get('#sale_promotion_id_0', { timeout: 10000 }).should('be.visible');
        // });

    //Menambahkan produk pertama yaitu VSMS GPS Rental - Full Package B
    cy.contains('Add a line').click();
    cy.get('td.o_data_cell.cursor-pointer.o_field_cell.o_list_many2one:not(.o_readonly_modifier.text-muted)')
        .should('be.visible')
        .click()
        .type('VSMS GPS Rental - Full Package B{enter}');

    //Menambahkan produk kedua yaitu GPS Installation Cost
    cy.contains('Add a line').click();
    cy.get('td.o_data_cell.cursor-pointer.o_field_cell.o_list_many2one:not(.o_readonly_modifier.text-muted)')
        .eq(2)    
        .should('be.visible')
        .click()
        .type('GPS Installation Cost{enter}')
        cy.wait(1000);

    // Save Manually    
    cy.get('i.fa.fa-cloud-upload.fa-fw').click();

    //Request Quotation
    cy.contains('Request').click();
    cy.wait(5000);

    //Memastikan status Quotation sudah Request
    cy.contains('Set to Draft').should('contain.text', 'Set to Draft');
    cy.wait(1000);
});

//First Approval menggunakan akun Jeanette
it('First Approval', () => {
    //Logout Sales Account (Ratu Salma)
    cy.visit('/');
    cy.get('img.o_avatar.o_user_avatar.rounded')
    .should('be.visible')
    .click();

    cy.contains('Log out').click();

    //Login Akun First Approval
    cy.get('#login').type('jeanette.grace@mceasy.co.id') // Input email
        cy.get('#password').type('jeanette.grace@mceasy.co.id{enter}')
        cy.get('.o_home_menu').should('be.visible');

    //Mengklik icon Approval
    cy.get('#result_app_1').should('be.visible').click();

    //Memilih jenis approval untuk Quotation
    cy.get('.btn.btn-primary.oe_kanban_action.oe_kanban_action_button')
        .eq(1)  
        .should('be.visible')
        .click()
        
    cy.wait(2000);

    //Mencari Quotation yang akan diapprove berdasarkan nama sales : Ratu Salma
    cy.get('[role="searchbox"]').click().type('Ratu Salma');

    cy.get('ul.o-dropdown--menu.dropdown-menu.o_searchview_autocomplete.show')
        .find('li.o_menu_item.dropdown-item')
        .eq(2)
        .click();
    cy.wait(1000);

    //Memilih Quotation yang akan diapprove berdasarkan list quotation yang paling atas
    cy.get('tr.o_data_row').first().click();

    //Melakukan Approve Quotation
    cy.contains('Approve').click();
    cy.wait(1000);
    });

//Second Approval menggunakan akun Yenny Widjojo
it('Second Approval', () => {
    //Login menggunakan akun Second Approval
    cy.visit('/');
    cy.get('#login').type('yenny.widjojo@mceasy.co.id') // Input email
    cy.get('#password').type('yenny.widjojo@mceasy.co.id{enter}'); //abis login kelempar ke halaman login lagi itu kenapa?
    cy.get('.o_home_menu').should('be.visible');

    //Mengklik icon Approval
    cy.get('#result_app_1').should('be.visible').click();

    //Memilih jenis approval untuk Quotation
    cy.get('.btn.btn-primary.oe_kanban_action.oe_kanban_action_button')
        .eq(1)  
        .should('be.visible')
        .click()
        
    cy.wait(2000);
    //Mencari Quotation yang akan diapprove berdasarkan nama sales : Ratu Salma
    cy.get('[role="searchbox"]').click().type('Ratu Salma');

    cy.get('ul.o-dropdown--menu.dropdown-menu.o_searchview_autocomplete.show')
        .find('li.o_menu_item.dropdown-item')
        .eq(2)
        .click();
    cy.wait(1000);

    //Memilih Quotation yang akan diapprove berdasarkan list quotation yang paling atas
    cy.get('tr.o_data_row').first().click();

    //Melakukan Approve Quotation
    cy.contains('Approve').click();
    cy.wait(1000);

    //Mengupload File Signed Quotation
    cy.contains('Upload your file').click();
    
    // Mencari dan memilih file yang akan diupload
    cy.get('input[type="file"]').attachFile('SQ_Ratu.pdf');
    cy.wait(1000);
    
    //Klik button Signed
    cy.contains('Signed').click();
    cy.wait(1000);

    //Quotation Signed!
});