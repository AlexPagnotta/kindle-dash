import { cn } from "../style/utils";

type TileProps = React.ComponentPropsWithoutRef<"div">;

export const Tile = ({ className, children, ...rest }: TileProps) => {
  return (
    <div className={cn("border border-dashed rounded-lg relative", className)} {...rest}>
      {children}
    </div>
  );
};

type TileTitleProps = {
  children: string;
  className?: string;
};

export const TileTitle = ({ className, children }: TileTitleProps) => {
  return (
    <div className={cn("absolute -bottom-px w-full -right-px h-40 flex justify-end pointer-events-none", className)}>
      <div className="flex justify-center items-center h-full border border-dashed rounded-md px-16 bg-white">
        <h2 className="copy-body-1">{children}</h2>
      </div>
    </div>
  );
};
