import { Locator, Page } from "@playwright/test";
import { Header } from "tests/components/header";

export class SignUpPage {
  readonly page: Page;
  readonly header: Header;

  readonly signUpTitle: Locator;
  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;

  constructor(page: Page) {
    this.header = new Header(page);
    this.page = page;
    this.signUpTitle = page.getByRole("heading", { name: "Sign up" });
    this.usernameInput = page.getByPlaceholder("Username");
    this.emailInput = page.getByPlaceholder("Email");
    this.passwordInput = page.getByPlaceholder("Password");
  }

  goto() {
    return this.page.goto("http://localhost:4200/register");
  }
}
