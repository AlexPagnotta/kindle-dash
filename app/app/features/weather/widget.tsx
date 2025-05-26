import { ComponentPropsWithoutRef } from "react";
import { cn } from "../style/utils";
import { Tile } from "../ui/tile";
import { CloudRain } from "lucide-react";

type WeatherWidgetProps = ComponentPropsWithoutRef<typeof Tile>;

export const WeatherWidget = ({ className, ...rest }: WeatherWidgetProps) => {
  //TODO: Fetch data

  return (
    <Tile className={cn("flex items-center justify-center", className)} {...rest}>
      <div className="flex items-center gap-40">
        <CloudRain className="size-[80px]" />
        <div className="flex flex-col text-center">
          <div className="copy-title-2">Location</div>
          <div className="copy-title-1-strong">18°C</div>
        </div>
      </div>
    </Tile>
  );
};
