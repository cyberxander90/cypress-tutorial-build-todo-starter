describe('Input form', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('focuses input on load', () => {
    cy.focused()
      .should('have.class', 'new-todo')
  })

  it('inputs texts', () => {
    const typedText = 'Buy Milk'

    cy.get('.new-todo')
      .type(typedText)
      .should('have.value', typedText)
  })

  context('Form submission', () => {
    beforeEach(() => {
      cy.server()
    })

    it('Adds a new todo on submit', () => {
      const typedText = 'Buy eggs'
      cy.route('POST', '/api/todos', {
        name: typedText,
        isComplete: false
      })

      cy.get('.new-todo')
        .type(typedText)
        .type('{enter}')
        .should('have.value', '')

      cy.get('.todo-list li')
        .should('have.length', 1)
        .and('contain', typedText)
    })

    it('Show an error message on a failed submission', () => {
      cy.route({
        url: '/api/todos',
        method: 'POST',
        response: {
          error: 'Failed to save todo'
        },
        status: 500,
      })

      cy.get('.new-todo')
        .type('test{enter}')

      cy.get('.todo-list li')
        .should('not.exist')

      cy.get('.error')
        .should('be.visible')
    })
  })
})