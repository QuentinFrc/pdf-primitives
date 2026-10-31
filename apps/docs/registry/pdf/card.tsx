import type { BlockProps, TextProps } from "@ui-registry/pdf";
import { Block, cn, Text } from "@ui-registry/pdf";

export const Card = ({ className, ...props }: BlockProps) => (
	<Block
		className={cn(
			"gap-4 rounded-lg border border-border bg-card py-4 text-card-foreground",
			className,
		)}
		{...props}
	/>
);

export const CardHeader = ({ className, ...props }: BlockProps) => (
	<Block className={cn("gap-1 px-4", className)} {...props} />
);

export const CardTitle = ({ className, ...props }: TextProps) => (
	<Text className={cn("text-base font-semibold", className)} {...props} />
);

export const CardDescription = ({ className, ...props }: TextProps) => (
	<Text className={cn("text-sm text-muted-foreground", className)} {...props} />
);

export const CardContent = ({ className, ...props }: BlockProps) => (
	<Block className={cn("px-4", className)} {...props} />
);

export const CardFooter = ({ className, ...props }: BlockProps) => (
	<Block className={cn("flex-row items-center px-4", className)} {...props} />
);
