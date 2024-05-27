import { test, expect } from '@playwright/test';
import RegisterAPI from '../support/api/register';
import { GenerateUser } from '../support/generateUser';
import { RegisterPage } from 'tests/support/pageobjects/register.po';
import { Email } from 'tests/support/typings/Email.t';

test.describe.parallel('Test the registration functionality', () => {
    let registerPage: RegisterPage;

    test.beforeEach(async ({ page }) => {
        await test.step('Go to registration page', async () => {
            registerPage = new RegisterPage(page);
            registerPage.visit();
        });
    });

    test('registers in with valid credentials', async ({ page }) => {
        await test.step('Register with valid credentials', async () => {
            await registerPage.register();
        });

        await test.step('New Article button should be visible', async () => {
            await expect(
                // Create signed in header page object and add article button testid locator
                page.getByRole('link', { name: ' New Article' })
            ).toBeVisible();
        });
    });

    test('Fails to register with invalid credentials', async () => {
        await test.step('Register with invalid credentials', async () => {
            await registerPage.register({ password: ' ' });
        });

        await test.step('Error message should be visible', async () => {
            await expect(registerPage.authForm.errorMessageList).toHaveText(
                /password can't be blank/i
            );
        });
    });

    test('Fails to register with invalid email', async () => {
        await test.step('Register with invalid email', async () => {
            await registerPage.register({ email: ' ' });
        });

        await test.step('Error message should be visible', async () => {
            await expect(registerPage.authForm.errorMessageList).toHaveText(
                /email can't be blank/i
            );
        });
    });

    test('Fails to register with invalid username', async () => {
        await test.step('Register with invalid username', async () => {
            await registerPage.register({ username: ' ' });
        });

        await test.step('Error message should be visible', async () => {
            await expect(registerPage.authForm.errorMessageList).toHaveText(
                /username can't be blank/i
            );
        });
    });

    test('Fails to register with already taken email', async () => {
        const defaultUsername: string = GenerateUser.genUsername();
        const defaultEmail: Email = `${defaultUsername}@mail.com`;

        await test.step('Register a new user using API', async () => {
            RegisterAPI.register(
                defaultUsername,
                defaultEmail,
                GenerateUser.defaultPassword
            );
        });

        await test.step('Register with already taken email', async () => {
            await registerPage.register({ email: defaultEmail });
        });

        await test.step('Error message should be visible', async () => {
            await expect(registerPage.authForm.errorMessageList).toHaveText(
                /email has already been taken/i
            );
        });
    });

    test('Fails to register with already taken username', async () => {
        const defaultUsername: string = GenerateUser.genUsername();
        const defaultEmail: Email = `${defaultUsername}@mail.com`;

        await test.step('Register a new user using API', async () => {
            RegisterAPI.register(
                defaultUsername,
                defaultEmail,
                GenerateUser.defaultPassword
            );
        });

        await test.step('Register with already taken username', async () => {
            await registerPage.register({ username: defaultUsername });
        });

        await test.step('Error message should be visible', async () => {
            await expect(registerPage.authForm.errorMessageList).toHaveText(
                /username has already been taken/i
            );
        });
    });
});
