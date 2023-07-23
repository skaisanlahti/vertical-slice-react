import { State } from "../../library/State";
import { Theme } from "../data/Theme";

export class SwitchTheme {
  public readonly theme = new State<Theme>(Theme.Light);
  private readonly html = document.documentElement;
  private readonly THEME_ATTRIBUTE = "data-theme";
  private readonly STORAGE_KEY = "theme";

  public constructor() {
    this.getPreference();
    this.syncAttributeAndStorage();
  }

  public handle(): void {
    const theme = this.theme.get();
    const nextTheme = theme === Theme.Dark ? Theme.Light : Theme.Dark;
    this.theme.set(nextTheme);
  }

  private getPreference(): void {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY);
    if (savedTheme === Theme.Dark || savedTheme === Theme.Light) {
      return this.theme.set(savedTheme);
    }

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return this.theme.set(Theme.Dark);
    }
  }

  private syncAttributeAndStorage(): void {
    this.theme.subscribe((theme) => {
      this.setAttribute(theme);
      this.save(theme);
    });
  }

  private setAttribute(theme: Theme): void {
    this.html.setAttribute(this.THEME_ATTRIBUTE, theme);
  }

  private save(theme: Theme): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, theme);
    } catch (error) {
      console.error(error);
    }
  }
}
