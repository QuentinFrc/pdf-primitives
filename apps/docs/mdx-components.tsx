import {
	createFileSystemGeneratorCache,
	createGenerator,
} from "fumadocs-typescript";
import { AutoTypeTable } from "fumadocs-typescript/ui";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { PdfPreview } from "@/components/pdf-preview";

const generator = createGenerator({
	cache: createFileSystemGeneratorCache(".next/fumadocs-typescript"),
	tsconfigPath: "../../packages/pdf-primitives/tsconfig.json",
});

export function getMDXComponents(components?: MDXComponents): MDXComponents {
	return {
		...defaultMdxComponents,
		AutoTypeTable: (props) => (
			<AutoTypeTable {...props} generator={generator} />
		),
		PdfPreview,
		...components,
	};
}
