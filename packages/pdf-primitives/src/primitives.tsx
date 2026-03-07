// ─── PDF Primitives ──────────────────────────────────────────────────────────
// Thin wrappers around @react-pdf/renderer that add className (Tailwind) support.
// These are the base building blocks — the equivalent of HTML elements for PDF.

import type {
	CanvasProps,
	DocumentProps,
	ImageProps,
	LinkProps,
	NoteProps,
	PageProps,
	TextProps,
	ViewProps,
} from "@react-pdf/renderer";
import {
	Canvas as RPCanvas,
	Document as RPDocument,
	Image as RPImage,
	Link as RPLink,
	Note as RPNote,
	Page as RPPage,
	Text as RPText,
	View as RPView,
} from "@react-pdf/renderer";
import React from "react";

import { useTw } from "./tailwind";

// ─── Helper: merge className (tw) + style ────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useStyles = (className?: string, style?: object | object[]): any => {
	const tw = useTw();
	const twStyle = className ? tw(className) : undefined;
	const styleArr = Array.isArray(style) ? style : style ? [style] : [];
	return twStyle
		? [twStyle, ...styleArr]
		: styleArr.length
			? styleArr
			: undefined;
};

// ─── Block (formerly View) ──────────────────────────────────────────────────

export interface PDFBlockProps extends Omit<ViewProps, "style" | "wrap"> {
	children?: React.ReactNode;
	className?: string;
	style?: object | object[];
	breakable?: boolean;
}

export const Block = React.forwardRef<never, PDFBlockProps>(
	({ className, style, breakable, ...props }, ref) => {
		const merged = useStyles(className, style);
		const wrap = breakable !== undefined ? breakable : undefined;
		return <RPView ref={ref} style={merged} wrap={wrap} {...props} />;
	},
);
Block.displayName = "Block";

/** @deprecated Use `Block` instead */
export const View = Block;

// ─── Text ────────────────────────────────────────────────────────────────────

export interface PDFTextProps extends Omit<TextProps, "style"> {
	children?: React.ReactNode;
	className?: string;
	style?: object | object[];
}

export const Text = React.forwardRef<never, PDFTextProps>(
	({ className, style, ...props }, ref) => {
		const merged = useStyles(className, style);
		return <RPText ref={ref} style={merged} {...props} />;
	},
);
Text.displayName = "Text";

// ─── Page ────────────────────────────────────────────────────────────────────

export interface PDFPageProps extends Omit<PageProps, "style" | "wrap"> {
	children?: React.ReactNode;
	className?: string;
	style?: object | object[];
	breakable?: boolean;
}

export const Page = ({
	className,
	style,
	breakable,
	...props
}: PDFPageProps) => {
	const merged = useStyles(className, style);
	const wrap = breakable !== undefined ? breakable : undefined;
	return <RPPage style={merged} wrap={wrap} {...props} />;
};

// ─── Image ───────────────────────────────────────────────────────────────────

export interface PDFImageProps extends Omit<ImageProps, "style"> {
	className?: string;
	style?: object | object[];
}

export const Image = ({ className, style, ...props }: PDFImageProps) => {
	const merged = useStyles(className, style);
	return <RPImage style={merged} {...(props as ImageProps)} />;
};

// ─── Link ────────────────────────────────────────────────────────────────────

export interface PDFLinkProps extends Omit<LinkProps, "style"> {
	children?: React.ReactNode;
	className?: string;
	style?: object | object[];
}

export const Link = ({ className, style, ...props }: PDFLinkProps) => {
	const merged = useStyles(className, style);
	return <RPLink style={merged} {...props} />;
};

// ─── Document (pass-through, no styling) ─────────────────────────────────────

export const Document = (
	props: DocumentProps & { children?: React.ReactNode },
) => <RPDocument {...props} />;

// ─── Canvas ─────────────────────────────────────────────────────────────────

export interface PDFCanvasProps extends Omit<CanvasProps, "style"> {
	className?: string;
	style?: object | object[];
}

export const Canvas = ({ className, style, ...props }: PDFCanvasProps) => {
	const merged = useStyles(className, style);
	return <RPCanvas style={merged} {...props} />;
};

// ─── Note ───────────────────────────────────────────────────────────────────

export interface PDFNoteProps extends Omit<NoteProps, "style"> {
	className?: string;
	style?: object | object[];
}

export const Note = ({ className, style, ...props }: PDFNoteProps) => {
	const merged = useStyles(className, style);
	return <RPNote style={merged} {...props} />;
};

// ─── PageNumber ──────────────────────────────────────────────────────────────

export interface PDFPageNumberProps
	extends Omit<TextProps, "style" | "children" | "render"> {
	className?: string;
	style?: object | object[];
	render?: (info: {
		pageNumber: number;
		totalPages: number;
	}) => React.ReactNode;
}

export const PageNumber = ({
	className,
	style,
	render,
	...props
}: PDFPageNumberProps) => {
	const merged = useStyles(className, style);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const renderFn = render
		? (p: any) => render({ pageNumber: p.pageNumber, totalPages: p.totalPages })
		: ({ pageNumber, totalPages }: any) => `${pageNumber} / ${totalPages}`;
	return <RPText style={merged} render={renderFn} {...props} />;
};
