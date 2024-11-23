describe('Home Page E2E Tests', () => {
    beforeEach(() => {
        // Intercept the API call and mock the response
        cy.intercept('GET', '**/restaurant', {
            statusCode: 200,
            body: [
                {
                    _id: '1',
                    name: 'Restaurant A',
                    rating: 4.8,
                    description: 'Cozy place with great food',
                    image: 'image-a.jpg',
                },
                {
                    _id: '2',
                    name: 'Restaurant B',
                    rating: 4.5,
                    description: 'Modern vibes with excellent service',
                    image: 'image-b.jpg',
                },
            ],
        }).as('getRestaurants');

        // Visit the Home page
        cy.visit('/home');
    });

    it('should display the page title', () => {
        cy.get('h1').should('contain.text', 'Trending'); // Verify the title
    });

    it('should display a list of restaurants', () => {
        // Wait for the mock API to load
        cy.wait('@getRestaurants');

        // Check that restaurant cards (mat-card) are rendered
        cy.get('mat-card').should('have.length', 2);

        // Verify content of the first restaurant
        cy.get('mat-card').first().within(() => {
            cy.get('img').should('have.attr', 'src', 'image-a.jpg');
            cy.contains('Restaurant A');
        });
    });

    it('should display the top#10 title', () => {
        cy.get('h1').should('contain.text', 'Top 10'); // Verify the title
    });

    it('should display the Top 10 list', () => {
        // Wait for the mock API to load
        cy.wait('@getRestaurants');

        // Check that Top 10 list items are rendered
        cy.get('mat-list .list-item-container').should('have.length', 2); // Adjust the length based on the mocked data

        // Verify content of the first restaurant
        cy.get('mat-list .list-item-container').first().within(() => {
            cy.contains('#1'); // Verify the rank
            cy.contains('Restaurant A'); // Verify the restaurant name
        });

        // Verify content of the second restaurant
        cy.get('mat-list .list-item-container').eq(1).within(() => {
            cy.contains('#2');
            cy.contains('Restaurant B');
        });
    });

});
