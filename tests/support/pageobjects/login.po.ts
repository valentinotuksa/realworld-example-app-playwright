import { Page } from '@playwright/test';
import { GotoResponse } from '../typings/GotoResponse.t';
import { GenerateUser } from '../generateUser';
import { Header } from './header.po';
import { AuthForm } from './auth-form.po';
import { Pages } from '../typings/Pages';

export class LoginPage {
    private page: Page;

    readonly header: Header;
    readonly authForm: AuthForm;

    constructor(page: Page) {
        this.page = page;
        this.header = new Header(page);
        this.authForm = new AuthForm(page);
    }

    visit(): Promise<GotoResponse> {
        return this.page.goto(Pages.Login, { waitUntil: 'domcontentloaded' });
    }

    async login(
        args: { email?: string; password?: string } = {}
    ): Promise<void> {
        await this.authForm.emailInput.fill(args.email ?? 'testacc12@mail.com');
        await this.authForm.passwordInput.fill(
            args.password ?? GenerateUser.defaultPassword
        );
        await this.authForm.submitButton.click();
    }
}
