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
    it.only('Adds a new todo on submit', () => {
      const typedText = 'Buy eggs'
      cy.server()
      cy.route('POST', '/api/todos', {
        name: typedText,
        isComplte: false
      })

      cy.get('.new-todo')
        .type(typedText)
        .type('{enter}')
        .should('have.value', '')

      cy.get('.todo-list li')
        .should('have.length', 1)
        .and('contain', typedText)
    })
  })
})