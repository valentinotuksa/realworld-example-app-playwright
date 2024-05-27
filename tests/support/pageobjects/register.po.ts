import { Locator, Page } from '@playwright/test';
import { GotoResponse } from '../typings/GotoResponse.t';
import { Header } from './header.po';
import { AuthForm } from './auth-form.po';
import { GenerateUser } from '../generateUser';
import { Pages } from '../typings/Pages';

export class RegisterPage {
    private page: Page;

    readonly header: Header;
    readonly authForm: AuthForm;
    readonly usernameInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new Header(page);
        this.authForm = new AuthForm(page);
        this.usernameInput = page.getByTestId('username-input');
    }

    visit(): Promise<GotoResponse> {
        return this.page.goto(Pages.Register, {
            waitUntil: 'domcontentloaded',
        });
    }

    async register(
        args: {
            username?: string;
            email?: string;
            password?: string;
        } = {}
    ): Promise<void> {
        await this.usernameInput.fill(
            args.username ?? GenerateUser.genUsername()
        );
        await this.authForm.emailInput.fill(
            args.email ?? GenerateUser.genEmail()
        );
        await this.authForm.passwordInput.fill(
            args.password ?? GenerateUser.defaultPassword
        );
        await this.authForm.submitButton.click();
    }
}
