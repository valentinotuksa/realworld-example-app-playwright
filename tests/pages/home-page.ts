import { Page } from "@playwright/test";
import { Header } from "tests/components/header";

export class HomePage {
  readonly page: Page;
  readonly header: Header;

  constructor(page: Page) {
    this.header = new Header(page);
    this.page = page;
  }

  goto() {
    return this.page.goto("http://localhost:4200/");
  }
}
