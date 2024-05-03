import { Locator, Page } from "@playwright/test";
import { Header } from "tests/components/header";

export class SignInPage {
  readonly page: Page;
  readonly header: Header;

  readonly signInHeader: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.header = new Header(page);
    this.page = page;
    this.signInHeader = page.getByRole("heading", { name: /sign in/i });
    this.emailInput = page.getByPlaceholder(/email/i);
    this.passwordInput = page.getByPlaceholder(/password/i);
    this.submitButton = page.getByRole("button", { name: /sign in/i });
  }

  goto() {
    return this.page.goto("/login", { waitUntil: "domcontentloaded" });
  }
}
