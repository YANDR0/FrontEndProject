describe('Register Component', () => {

    beforeEach(() => {
        // Visita la página de registro
        cy.visit('/register'); // Ajusta la URL a la ruta correcta si es necesario
    });

    it('should display the register form', () => {
        // Verifica que el formulario exista
        cy.get('form').should('exist');

        // Verifica que los campos de input sean interactuables
        cy.get('input[name="email"]').should('be.visible').type('test@example.com');
        cy.get('input[name="username"]').should('be.visible').type('testuser');
        cy.get('input[name="password"]').should('be.visible').type('password123');
        // Maneja el campo de confirmación de contraseña, asegurándose de que sea visible antes de escribir
        cy.get('input[name="confirmPassword"]').should('be.visible')
            .click({ force: true })   // Forzar el click si es necesario
            .type('password123');

        // Verifica que el formulario sea válido (lo que habilitará el botón)
        cy.get('form').should('have.class', 'ng-valid');

        // Verifica que el botón de submit esté habilitado
        cy.get('button[type="submit"]').should('be.visible').and('not.be.disabled');
    });

    it('should show error when email is invalid', () => {
        cy.get('input[name="email"]').type('invalid-email');
        cy.get('input[name="username"]').type('testuser');
        cy.get('input[name="password"]').type('password123');
        cy.get('input[name="confirmPassword"]').should('be.visible')
            .click({ force: true })   // Forzar el click si es necesario
            .type('password123');
        cy.get('button[type="submit"]').click({ force: true });

        // Verifica el error del email
        cy.get('mat-error').contains('Must be a valid Email');
    });

    it('should show error when username is less than 3 characters', () => {
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="username"]').type('us');
        cy.get('input[name="password"]').type('password123');
        cy.get('input[name="confirmPassword"]').should('be.visible')
            .click({ force: true })   // Forzar el click si es necesario
            .type('password123');
        cy.get('button[type="submit"]').click({ force: true });


        // Verifica el error del username
        cy.get('mat-error').contains('Username must be at least 3 characters long');
    });

    it('should show error when password is less than 8 characters', () => {
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="username"]').type('testuser');
        cy.get('input[name="password"]').type('short');  // Contraseña corta
        cy.get('input[name="confirmPassword"]').should('be.visible')
            .click({ force: true })   // Forzar el click si es necesario
            .type('short');  // Confirmar contraseña
    
        // Espera explícitamente a que el mensaje de error aparezca
        cy.get('input[name="password"]'); // Hace que el campo pierda el foco, lo cual suele disparar la validación
    
        // Verifica si el botón está deshabilitado
        cy.get('button[type="submit"]').should('be.disabled');
    });
    

    it('should show error when passwords do not match', () => {
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="username"]').type('testuser');
        cy.get('input[name="password"]').type('password123');
        cy.get('input[name="confirmPassword"]').should('be.visible')
            .click({ force: true })   // Forzar el click si es necesario
            .type('password321');
        cy.get('button[type="submit"]').click({ force: true });

        // Verifica el mensaje de contraseñas no coinciden
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Passwords do not match');
        });
    });

    it('should submit the form when all fields are valid', () => {
        const userData = {
            email: 'test@example.com',
            username: 'testuser',
            password: 'password123',
            confirmPassword: 'password123'
        };
    
        // Llena los campos del formulario
        cy.get('input[name="email"]').type(userData.email);
        cy.get('input[name="username"]').type(userData.username);
        cy.get('input[name="password"]').type(userData.password);
        cy.get('input[name="confirmPassword"]').should('be.visible')
            .click({ force: true })   // Forzar el click si es necesario
            .type(userData.password);
    
        // Espera a que el formulario esté validado (opcional, pero puede ayudar)
        cy.get('form').should('have.class', 'ng-valid');
    
        // Verifica que el botón de submit esté habilitado
        cy.get('button[type="submit"]').should('not.be.disabled');
    
        // Si el botón aún está deshabilitado, espera un poco más
        cy.get('button[type="submit"]').should('not.be.disabled', { timeout: 10000 });
    
        // Intercepta la solicitud sin enviarla realmente
        cy.intercept('POST', '/register').as('register');
    
        // Simula el click en el botón de submit
        cy.get('button[type="submit"]').click();
    });
    

    it('should redirect to login page when clicking the "Log in" link', () => {
        cy.get('a').contains('Log in').click();

        // Verifica que la URL cambie a la página de login
        cy.url().should('include', '/login');
    });
});
