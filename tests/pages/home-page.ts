import { Locator, Page } from "@playwright/test";
import { Header } from "tests/components/header";

export class HomePage {
  readonly page: Page;
  readonly header: Header;

  readonly homeHeading: Locator;

  constructor(page: Page) {
    this.header = new Header(page);
    this.page = page;
    this.homeHeading = page.getByRole("heading", { name: "conduit" });
  }

  goto() {
    return this.page.goto("/");
  }
}
