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


    //Para usar a funcionalidade da biblioteca loadash .times, bastou apenas encapsular a função como abaixo
    Cypress._.times(5, () => {
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('#privacy a')
          .invoke('removeAttr', 'target')
          .click()
       
        cy.contains('Talking About Testing').should('be.visible')  
        })
    })
    
    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

    it('preenche a area de texto usando o comando invoke', () => {
        const longText = Cypress._.repeat('Teste', 50)
        
        cy.get('#open-text-area')
        .invoke('val', longText) 
        .should('have.value', longText)

    })

    it('faz uma requisição HTTP', () => {
        cy.request({
          method: 'GET',
          url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
        }).then((response) => {
            expect(response.status).to.eq(200);
            // Verifica se o statusText da resposta é 'OK'
            expect(response.statusText).to.eq('OK');
            // Verifica se o corpo da resposta inclui a string 'CAC TAT'
            expect(response.body).to.include('CAC TAT');
        })
      })
  
      // 2 possibilidade desestruturando o objeto response em JS

      it.only('faz uma requisição HTTP', ( ) => {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should((response) => {
            const { status, statusText, body} = response
            
            expect(status).to.eq(200);
            // Verifica se o statusText da resposta é 'OK'
            expect(statusText).to.eq('OK');
            // Verifica se o corpo da resposta inclui a string 'CAC TAT'
            expect(body).to.include('CAC TAT');
        })
  })
})


  
