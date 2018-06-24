describe('List items', () => {
  beforeEach(() => {
    cy.seedAndVisit()
  })

  it('properly displays completed items', () => {
    cy.get('.todo-list li')
      .filter('.completed')
      .should('have.length', 1)
      .and('contain', 'Buy Eggs')
      .find('.toggle')
        .should('be.checked')
  })

  it('show remaining todos in the footer', () => {
    cy.get('.todo-count strong')
      .should('have.text', '3')
  })

  it('remove a todo', () => {
    cy.route({
      url: '/api/todos/1',
      method: 'DELETE',
      status: 200,
      response: {}
    })

    cy.get('.todo-list li')
      .as('todo-list')
      .first()
      .find('.destroy')
      .invoke('show')
      .click()

    cy.get('@todo-list')
      .should('have.length', 3)
      .and('not.contain', 'Buy Milk')

    cy.get('@todo-list')
      .first()
      .should('contain', 'Buy Eggs')

  })

  it.only('toggle a todo', () => {
    cy.fixture("todos")
      .then(todos => {
        const firstTodo = Cypress._.head(todos)
        cy.route({
          url: `/api/todos/${firstTodo.id}`,
          method: 'PUT',
          response: Cypress._.merge(firstTodo, {isComplete: true})
        })
      })

    cy.get('.todo-list li')
      .first()
      .as('first-todo')

    cy.get('@first-todo')
      .find('.toggle')
      .click()
      .should('be.checked')
      

    cy.get('@first-todo')
      .should('have.class', 'completed')
      
    cy.get('.todo-count strong')
      .should('have.text', '2')
  })
})