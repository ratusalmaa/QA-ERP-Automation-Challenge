// //Command function untuk melakukan login
// Cypress.Commands.add('login', () => {
//     cy.visit('/');
//     cy.get('#login').type('ratu.salma@mceasy.co.id');
//     cy.get('#password').type('Queen1212*{enter}');
//     cy.get('.o_home_menu').should('be.visible');
// });

// // Menggunakan cy.session() untuk menyimpan dan memulihkan session
// beforeEach(() => {
//     cy.session('loginSession', () => {
//         cy.login();
//     });
// });

//Create Quotation
it('Create Quotation', () => {

    //Login akun sales untuk Create Quotation
    cy.log('Mengunjungi halaman login');
    cy.visit('/') // Untuk mengakses web phoenix-dev tanpa harus mengetikkan ulang url webnya (baseUrl dimasukkan di file cypress.config.js)
    cy.log('Mengisi email untuk login');
    cy.get('#login').type('ratu.salma@mceasy.co.id')
    cy.log('Mengisi password dan melakukan login');
    cy.get('#password').type('Queen1212*{enter}') 
    // Memastikan halaman home sudah ditampilkan sebelum lanjut ke action berikutnya
    cy.log('Memastikan halaman home ditampilkan');
    cy.get('.o_home_menu').should('be.visible'); 

    // Mengklik icon Sales
    cy.log('Mengklik icon Sales');
    cy.get('#result_app_6').should('be.visible').click(); 

    // Mengklik Button New untuk Create Quotation
    cy.log('Mengklik tombol New untuk membuat Quotation');
    cy.get('div.d-xl-inline-flex').find('button').should('be.visible').click(); 
    
    // Menginputkan Nama Quotation secara unik dengan tambahan timestamp
    const timestamp = new Date().getTime();
    const uniqueName = `Quotation Automation Ratu - ${timestamp}`;
    cy.log('Menginputkan nama Quotation unik');
    cy.get('#title_0').type(uniqueName);

    // Mengklik field Nama Customer
    cy.log('Mengklik field Nama Customer');
    cy.get('#partner_id_0').click(); 
    
    // Memastikan pilihan dropdown Nama Customer sudah terlihat/ditampilkan
    cy.log('Memastikan dropdown Nama Customer ditampilkan');
    cy.get('li.o-autocomplete--dropdown-item.ui-menu-item.d-block')
        .should('be.visible') 
        .first() // Memilih Customer teratas/pertama di list dropdown
        .click(); // Mengklik customer yang sudah dipilih
    
    //Mengklik Field Customer PIC
    cy.log('Mengklik field Customer PIC');
    cy.get('#responsible_partner_id_0').click();
    
    // Memastikan pilihan dropdown Customer PIC sudah terlihat/ditampilkan
    cy.log('Memastikan dropdown Customer PIC ditampilkan');
    cy.get('ul.o-autocomplete--dropdown-menu.ui-widget.show.dropdown-menu.ui-autocomplete')
        .should('be.visible')
        .first();
    
    //Menginputkan Customer PIC 
    cy.log('Menginputkan nama Customer PIC');
    cy.get('input#responsible_partner_id_0.o-autocomplete--input.o_input')
        .should('be.visible')
        .type('Yadhi Aristianto{enter}');
    
    //Menginputkan field Promotion dengan jenis Promo Normal Monthly (3 Month)
    cy.log('Menginputkan field Promotion dengan promo Normal Monthly (3 Month)');
    cy.get('input#sale_promotion_id_0.o-autocomplete--input.o_input').click()
        .should('be.visible')
        .type('Normal Monthly (3 Month){enter}')
        cy.get('#sale_promotion_id_0').should('have.value', 'Normal Monthly (3 Month)');
    
    //Memastikan field First Recurring Plan muncul sebelum menambahkan produk
    cy.log('Memastikan field First Recurring Plan muncul');
    cy.get('#first_recurring_plan_id_0').should('be.visible');
    
    //Menambahkan produk pertama yaitu VSMS GPS Rental - Full Package B
    cy.log('Menambahkan produk pertama: VSMS GPS Rental - Full Package B');
    cy.contains('Add a line').click();
    cy.get('td.o_data_cell.cursor-pointer.o_field_cell.o_list_many2one:not(.o_readonly_modifier.text-muted)')
        .should('be.visible')
        .click()
        .type('VSMS GPS Rental - Full Package B{enter}');

    //Menambahkan produk kedua yaitu GPS Installation Cost
    cy.log('Menambahkan produk kedua: GPS Installation Cost');
    cy.contains('Add a line').click();
    cy.get('td.o_data_cell.cursor-pointer.o_field_cell.o_list_many2one:not(.o_readonly_modifier.text-muted)')
        .eq(2)    
        .should('be.visible')
        .click()
        .type('GPS Installation Cost{enter}')
    
    //Memastikan harga produk terisi sebelum melakukan Save Quotation
    cy.log('Memastikan harga produk terisi dengan benar');
    cy.get('input.o_input.flex-grow-1.flex-shrink-1')
        .invoke('val')
        .should('not.equal', '0.00');
    
    // Save Manually    
    cy.log('Menyimpan Quotation secara manual');
    cy.get('i.fa.fa-cloud-upload.fa-fw').click();

    //Request Quotation
    cy.log('Melakukan Request Quotation');
    cy.contains('Request').click();

    //Memastikan status Quotation sudah Request
    cy.log('Memastikan status Quotation berubah menjadi Request');
    cy.contains('Set to Draft').should('contain.text', 'Set to Draft');

});

//First Approval menggunakan akun Jeanette
it('First Approval', () => {
    // //Logout Sales Account (Ratu Salma)
    cy.log('Mengunjungi halaman login untuk logout dan login sebagai Jeanette');
    cy.visit('/');
    // cy.get('img.o_avatar.o_user_avatar.rounded')
    // .should('be.visible')
    // .click();

    // cy.contains('Log out').click();

    //Login Akun First Approval
    cy.log('Login sebagai Jeanette untuk First Approval');
    cy.get('#login').type('jeanette.grace@mceasy.co.id') // Input email
        cy.get('#password').type('jeanette.grace@mceasy.co.id{enter}')
        cy.get('.o_home_menu').should('be.visible');

    //Mengklik icon Approval
    cy.log('Mengklik icon Approval');
    cy.get('#result_app_1').should('be.visible').click();

    //Memilih jenis approval untuk Quotation
    cy.log('Memilih jenis approval untuk Quotation');
    cy.get('.btn.btn-primary.oe_kanban_action.oe_kanban_action_button')
        .eq(1)  
        .should('be.visible')
        .click()

    //Memastikan button 'New' terlihat sebelum search nama sales
    cy.log('Memastikan tombol New terlihat sebelum pencarian nama sales');
    cy.get('button.btn.btn-primary.o_list_button_add').should('be.visible');

    //Mencari Quotation yang akan diapprove berdasarkan nama sales : Ratu Salma
    cy.log('Mencari Quotation berdasarkan nama sales: Ratu Salma');
    cy.get('[role="searchbox"]').click().type('Ratu Salma');

    cy.get('ul.o-dropdown--menu.dropdown-menu.o_searchview_autocomplete.show')
        .find('li.o_menu_item.dropdown-item')
        .eq(2)
        .click();

    //Memilih Quotation yang akan diapprove berdasarkan list quotation yang paling atas
    cy.log('Memilih Quotation yang paling atas untuk di-approve');
    cy.get('tr.o_data_row').first().click();

    //Melakukan Approve Quotation
    cy.log('Melakukan Approve Quotation');
    cy.contains('Approve').click();

    //Memastikan status Quotation sudah Request
    cy.log('Memastikan status Quotation berubah setelah Approval pertama');
    cy.contains('Approve').should('not.exist');
    });

//Second Approval menggunakan akun Yenny Widjojo
it('Second Approval', () => {

    //Login menggunakan akun Second Approval
    cy.log('Mengunjungi halaman login untuk logout dan login sebagai Yenny Widjojo');
    cy.visit('/');
    cy.log('Login sebagai Yenny Widjojo untuk Second Approval');
    cy.get('#login').type('yenny.widjojo@mceasy.co.id') // Input email
    cy.get('#password').type('yenny.widjojo@mceasy.co.id{enter}'); //abis login kelempar ke halaman login lagi itu kenapa?
    cy.get('.o_home_menu').should('be.visible');

    //Mengklik icon Approval
    cy.log('Mengklik icon Approval');
    cy.get('#result_app_1').should('be.visible').click();

    //Memilih jenis approval untuk Quotation
    cy.log('Memilih jenis approval untuk Quotation');
    cy.get('.btn.btn-primary.oe_kanban_action.oe_kanban_action_button')
        .eq(1)  
        .should('be.visible')
        .click()

    //Memastikan button 'New' terlihat sebelum search nama sales
    cy.log('Memastikan tombol New terlihat sebelum pencarian nama sales');
    cy.get('button.btn.btn-primary.o_list_button_add').should('be.visible');
        
    //Mencari Quotation yang akan diapprove berdasarkan nama sales : Ratu Salma
    cy.log('Mencari Quotation berdasarkan nama sales: Ratu Salma');
    cy.get('[role="searchbox"]').click().type('Ratu Salma');

    cy.get('ul.o-dropdown--menu.dropdown-menu.o_searchview_autocomplete.show')
        .find('li.o_menu_item.dropdown-item')
        .eq(2)
        .click();

    //Memilih Quotation yang akan diapprove berdasarkan list quotation yang paling atas
    cy.log('Memilih Quotation yang paling atas untuk di-approve');
    cy.get('tr.o_data_row').first().click();

    //Melakukan Approve Quotation
    cy.log('Melakukan Approve Quotation');
    cy.contains('Approve').click();

        //Memastikan status Quotation sudah Approved
    cy.log('Memastikan status Quotation sudah Approved');
    cy.contains('Approve').should('not.exist');

    //Mengupload File Signed Quotation
    cy.log('Mengklik tombol Upload Your File');
    cy.contains('Upload your file').click();
    
    // Mencari dan memilih file yang akan diupload
    cy.log('Mengupload file Signed Quotation');
    cy.get('input[type="file"]').attachFile('SQ_Ratu.pdf');
    
    //Memastikan button 'Upload Your File' tidak ada sebelum klik button Signed
    cy.log('Memastikan button Upload Your File sudah tidak ada');
    cy.get('label.o_select_file_button.btn.btn-primary').should('not.exist');

    //Klik button Signed
    cy.log('Mengklik tombol Signed');
    cy.contains('Signed').click();

    //Memastikan status Quotation sudah Signed
    cy.log('Memastikan status Quotation sudah Signed');
    cy.contains('Repeat Order').should('exist'); 

    //Quotation Signed!
    cy.log('Quotation Signed!');

});
