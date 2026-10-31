import type { BlockProps } from "@ui-registry/pdf";
import { Block, cn } from "@ui-registry/pdf";

export interface SeparatorProps extends BlockProps {
	orientation?: "horizontal" | "vertical";
}

export const Separator = ({
	orientation = "horizontal",
	className,
	...props
}: SeparatorProps) => (
	<Block
		className={cn(
			"border-border",
			orientation === "horizontal"
				? "w-full border-b"
				: "self-stretch border-l",
			className,
		)}
		{...props}
	/>
);
