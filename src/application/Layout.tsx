import { PropsWithChildren } from "react";
import { Nav } from "./Nav";

export function Layout({ children }: PropsWithChildren) {
  return (
    <section>
      <Nav />
      <main>{children}</main>
    </section>
  );
}
