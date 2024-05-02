import { Locator, Page } from "@playwright/test";
import { Header } from "tests/components/header";

export class SignInPage {
  readonly page: Page;
  readonly header: Header;

  readonly signInButton: Locator;

  constructor(page: Page) {
    this.header = new Header(page);
    this.page = page;
    this.signInButton = page.getByRole("heading", { name: "Sign in" });
  }

  goto() {
    return this.page.goto("http://localhost:4200/login");
  }
}