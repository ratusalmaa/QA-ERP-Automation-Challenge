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
    cy.get('#title_0').type('Quotation Testing Automation Ratu'); 
    
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