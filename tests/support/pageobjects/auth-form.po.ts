import { Locator, Page } from '@playwright/test';

export class AuthForm {
    readonly signInHeader: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly errorMessageList: Locator;

    constructor(page: Page) {
        this.signInHeader = page.getByTestId('header');
        this.emailInput = page.getByTestId('email-input');
        this.passwordInput = page.getByTestId('password-input');
        this.submitButton = page.getByTestId('submit-button');
        this.errorMessageList = page.getByTestId('error-message-list');
    }
}
