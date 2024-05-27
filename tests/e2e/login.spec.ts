import { test, expect } from '@playwright/test';
import RegisterAPI from 'tests/support/api/register';
import { GenerateUser } from 'tests/support/generateUser';
import { LoginPage } from 'tests/support/pageobjects/login.po';
import { Email } from 'tests/support/typings/Email.t';

test.describe.parallel('Test the login functionality', () => {
    let loginPage: LoginPage;

    let defaultUsername: string;
    let defaultEmail: Email;

    test.beforeEach(async ({ page }) => {
        await test.step('Go to login page', async () => {
            loginPage = new LoginPage(page);
            loginPage.visit();
        });

        defaultUsername = GenerateUser.genUsername();
        defaultEmail = `${defaultUsername}@mail.com`;

        await test.step('Register a new user using API', async () => {
            RegisterAPI.register(
                defaultUsername,
                defaultEmail,
                GenerateUser.defaultPassword
            );
        });
    });

    test('Log in with valid username', async ({ page }) => {
        await test.step('Log in with the new user', async () => {
            await loginPage.login({
                email: defaultEmail,
                password: GenerateUser.defaultPassword,
            });
        });

        await test.step('New Article button should be visible', async () => {
            await expect(
                // Create signed in header page object and add article button testid locator
                page.getByRole('link', { name: ' New Article' })
            ).toBeVisible();
        });
    });

    test('Fails to log in with partially invalid credentials', async () => {
        await test.step('Log in with invalid password', async () => {
            await loginPage.login({ email: defaultEmail, password: '123123' });
        });

        await test.step('Error message should be visible', async () => {
            await expect(loginPage.authForm.errorMessageList).toContainText(
                /email or password is invalid/i
            );
        });
    });

    test('Fail to log in with invalid credentials', async () => {
        await test.step('Attempt logging in with unregistered email', async () => {
            await loginPage.login({
                email: 'unregistered@email.com',
                password: '12121212',
            });
        });

        await test.step('Error message should be visible', async () => {
            await expect(loginPage.authForm.errorMessageList).toContainText(
                /email or password is invalid/i
            );
        });
    });
});
