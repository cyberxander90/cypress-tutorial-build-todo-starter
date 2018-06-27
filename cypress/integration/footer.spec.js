describe('Footer', () => {
  context('with a single todo', () => {
    it('displays a singular todo in count', () => {
      cy.seedAndVisit([{id: 1, name: 'Buy Milk', isComplete: false}])
      cy.get('.todo-count')
        .should('contain', '1 todo left')
    })
  })

  context('with multiples todos', () => {
    it.only('display a plural todo in count', () => {
      cy.seedAndVisit();
      cy.get('.todo-count')
        .should('contain', '3 todos left')
    })
  })
})