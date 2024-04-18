// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    }) 

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')       
    })
      
    it('preenche os campos obrigatórios e envia o formulário', function() {
       const longText = 'TESTAOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO'
       
        cy.get('#firstName').type('Pohren')
        cy.get('#lastName').type('Cypress')
        cy.get('#email').type('teste@cypress.com')
        cy.get('#open-text-area').type(longText, {delay:0})
        cy.get('button[type="submit"]').click()
    }) 

    it('email formatação inválida', function() {
       
         cy.get('#firstName').type('Pohren')
         cy.get('#lastName').type('Cypress')
         cy.get('#email').type('teste@cypress,com')
         cy.get('#open-text-area').type('Texto')
         cy.get('button[type="submit"]').click()

         cy.get('.error').should('be.visible')
     }) 

     it('campo telefone vazio após informar strings', function() {
       
        cy.get('#phone')
           .type('testestestes')
           .should('have.value', '')
                
    }) 

    it('valida obrigatoriedade de campos', function() {
       
        cy.get('#firstName').type('Pohren')
        cy.get('#lastName').type('Cypress')
        cy.get('#email').type('teste@cypress.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Texto')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
     })

    it('prenche e limpa os campos', function() {
        cy.get('#firstName')
         .type('Pohren')
         .should('have.value','Pohren')
         .clear()
         .should('have.value','')
    })

    it('exibe mensagem de erro ao submeter formulário com campos fazios', function() {
        cy.get('button[type="submit"]').click()
                 
        cy.get('.error').should('be.visible')
    })

    it('envia formulário com comando customizado', function() {
        cy.fillMandatoryFieldsandSubmit()
                 
        cy.get('.error').should('be.visible')
    })

    it('seleciona um produto da opção select por texto', function() {
        cy.get('#product')
           .select('YouTube')              
           .should('have.value','youtube')
    })

    it('seleciona um produto da opção select por seu valor', function() {
        cy.get('#product')
           .select('mentoria')              
           .should('have.value','mentoria')
    })

    it('seleciona um produto da opção select por seu indice', function() {
        cy.get('#product')
           .select(1)              
           .should('have.value','blog')
    })

    it('marca o checkbox tipo de atendimento "FeedBack', function() {
        cy.get('input[type="radio"][value="feedback"]')
           .check()              
           .should('have.value','feedback')
    })

    it('marca o checkbox todos os tipo de atendimento', function() {
        cy.get('input[type="radio"]')
           .should('have.length',3)
           .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
           })
        })

    it('marca os checkbox, e desmarca o último', function() {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
        })

    it('seleciona arquivo no diretório', function() {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
               expect($input[0].files[0].name).to.equal('example.json')
            })                
        })
    
    it('seleciona arquivo drag and drop', function() {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' } ) 
            .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
            })                
        })

    it('seleciona arquivo drag and drop', function() {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' } ) 
            .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
            })                
        })
    
    it('usa fixture para seleção da imagem', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile') 
            .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
            })                
        })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
                           
        })
    it.only('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('#privacy a')
          .invoke('removeAttr', 'target')
          .click()
          
        cy.contains('Talking About Testing').should('be.visible')  
        })

    })



