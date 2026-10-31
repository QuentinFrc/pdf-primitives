"use client";

import dynamic from "next/dynamic";

import type { PreviewName } from "./pdf-previews";

// react-pdf renders in the browser only
const Viewer = dynamic(() => import("./pdf-preview-viewer"), {
	loading: () => (
		<div className="flex h-full items-center justify-center text-fd-muted-foreground text-sm">
			Loading preview…
		</div>
	),
	ssr: false,
});

export function PdfPreview({
	name,
	height = 420,
}: {
	name: PreviewName;
	height?: number;
}) {
	return (
		<div className="not-prose my-6" style={{ height }}>
			<Viewer height={height} name={name} />
		</div>
	);
}
