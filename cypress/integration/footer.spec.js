describe('Footer', () => {
  context('with a single todo', () => {
    it('displays a singular todo in count', () => {
      cy.seedAndVisit([{id: 1, name: 'Buy Milk', isComplete: false}])
      cy.get('.todo-count')
        .should('contain', '1 todo left')
    })
  })

  context('with multiples todos', () => {
    beforeEach(() => {
      cy.seedAndVisit();
    })

    it('display a plural todo in count', () => {
      cy.get('.todo-count')
        .should('contain', '3 todos left')
    })

    it('Filter to active todos', () => {
      cy.contains('Active')
        .click()

      cy.get('.todo-list li')
        .should('have.length', 3)
    })

    it.only('Filter to completed todos', () => {
      cy.contains('Completed')
        .click()

      cy.get('.todo-list li')
        .should('have.length', 1)
    })
  })
})