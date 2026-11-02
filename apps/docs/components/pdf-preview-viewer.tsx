"use client";

import { PDFViewer } from "@ui-registries/pdf";

import type { PreviewName } from "./pdf-previews";
import { previews } from "./pdf-previews";

export default function PdfPreviewViewer({
	name,
	height,
}: {
	name: PreviewName;
	height: number;
}) {
	return (
		<PDFViewer
			className="w-full rounded-lg border"
			showToolbar={false}
			style={{ height }}
		>
			{previews[name]}
		</PDFViewer>
	);
}
