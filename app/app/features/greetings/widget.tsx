import { getGreeting } from "./utils";
import { GreetingsWidgetClient } from "./widget.client";

export const GreetingsWidget = () => {
  const name = process.env.NEXT_PUBLIC_USER_NAME;
  const greeting = getGreeting();

  return <GreetingsWidgetClient name={name} initialGreeting={greeting} />;
};
