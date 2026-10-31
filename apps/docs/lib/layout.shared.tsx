import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export const baseOptions = (): BaseLayoutProps => ({
	nav: {
		title: (
			<>
				<svg
					width="24"
					height="24"
					viewBox="146 124 200 204"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					aria-label="pdf-primitives logo"
				>
					<rect
						x="154"
						y="132"
						width="156"
						height="188"
						rx="18"
						fill="#F7F5F4"
					/>
					<rect
						x="155.5"
						y="133.5"
						width="153"
						height="185"
						rx="16.5"
						stroke="#D8D4D2"
						strokeWidth="3"
					/>
					<g fill="#DDD9D7">
						<rect x="186" y="166" width="84" height="6" rx="3" />
						<rect x="186" y="192" width="78" height="6" rx="3" />
						<rect x="186" y="218" width="86" height="6" rx="3" />
						<rect x="186" y="244" width="64" height="6" rx="3" />
					</g>
					<rect x="178" y="286" width="34" height="6" rx="3" fill="#171717" />
					<rect x="246" y="258" width="92" height="44" rx="10" fill="#F04E63" />
				</svg>
				@ui-registries/pdf
			</>
		),
	},
});
