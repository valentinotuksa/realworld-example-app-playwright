import { Locator, Page } from "@playwright/test";
import { Header } from "tests/components/header";

export class SignUpPage {
  readonly page: Page;
  readonly header: Header;

  readonly signUpTitle: Locator;
  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.header = new Header(page);
    this.page = page;
    this.signUpTitle = page.getByRole("heading", { name: /sign up/i });
    this.usernameInput = page.getByPlaceholder(/username/i);
    this.emailInput = page.getByPlaceholder(/email/i);
    this.passwordInput = page.getByPlaceholder(/password/i);
    this.submitButton = page.getByRole("button", { name: /sign up/i });
  }

  goto() {
    return this.page.goto("/register", { waitUntil: "domcontentloaded" });
  }
}
