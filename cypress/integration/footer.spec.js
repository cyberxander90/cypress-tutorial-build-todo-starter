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

    it('Handle active/complete/all filtes', () => {
      const filters = [
        {link: 'Active', requiredLength: 3},
        {link: 'Completed', requiredLength: 1},
        {link: 'All', requiredLength: 4}
      ]
      cy.wrap(filters)
        .each((filter) => {
          cy.contains(filter.link)
            .click()

          cy.get('.todo-list li')
            .should('have.length', filter.requiredLength)
        })
    })
  })
})