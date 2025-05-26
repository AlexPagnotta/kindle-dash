import { Header } from "~/features/nav/header/header";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="size-full border relative flex flex-col">
      <Header />
      {children}
    </div>
  );
}
