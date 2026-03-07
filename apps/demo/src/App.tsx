import {
	Document,
	Link,
	Page,
	Tailwind,
	Text,
	View,
} from "@pdf-primitives/react";
import { Font, PDFViewer } from "@react-pdf/renderer";

Font.register({
	family: "Inter",
	fonts: [
		{
			src: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf",
			fontWeight: 400,
		},
		{
			src: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fMZg.ttf",
			fontWeight: 500,
		},
		{
			src: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf",
			fontWeight: 600,
		},
		{
			src: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZg.ttf",
			fontWeight: 700,
		},
	],
});

const theme = {
	"--color-brand-500": "#0073e6",
	"--color-brand-600": "#005bb5",
};

function MyDocument() {
	return (
		<Document>
			<Page className="p-10 bg-white" style={{ fontFamily: "Inter" }}>
				<Text className="text-3xl font-bold text-foreground mb-2">
					pdf-primitives
				</Text>
				<Text className="text-sm text-muted-foreground mb-6">
					Primitives for building PDFs with Tailwind-style classes.
				</Text>

				{/* Layout */}
				<Text className="text-lg font-semibold text-foreground mb-2">
					Layout
				</Text>
				<View className="flex-row gap-2 mb-4">
					<View className="bg-blue-100 rounded-md p-3 flex-1">
						<Text className="text-sm text-blue-800">Column 1</Text>
					</View>
					<View className="bg-blue-100 rounded-md p-3 flex-1">
						<Text className="text-sm text-blue-800">Column 2</Text>
					</View>
					<View className="bg-blue-100 rounded-md p-3 flex-1">
						<Text className="text-sm text-blue-800">Column 3</Text>
					</View>
				</View>

				{/* Typography */}
				<Text className="text-lg font-semibold text-foreground mb-2">
					Typography
				</Text>
				<View className="gap-1 mb-4">
					<Text className="text-2xl font-bold text-foreground">Heading</Text>
					<Text className="text-base text-foreground leading-relaxed">
						Body text with relaxed line height. Lorem ipsum dolor sit amet,
						consectetur adipiscing elit.
					</Text>
					<Text className="text-xs text-muted-foreground">
						Small muted caption
					</Text>
				</View>

				{/* Colors */}
				<Text className="text-lg font-semibold text-foreground mb-2">
					Colors
				</Text>
				<View className="flex-row gap-1 mb-4">
					{[
						"red-500",
						"orange-500",
						"amber-500",
						"green-500",
						"blue-500",
						"violet-500",
					].map((c) => (
						<View key={c} className={`bg-${c} rounded w-8 h-8`} />
					))}
				</View>

				{/* Card-like box */}
				<Text className="text-lg font-semibold text-foreground mb-2">Card</Text>
				<View className="border border-border rounded-lg p-4 mb-4">
					<Text className="text-base font-semibold text-foreground mb-1">
						Invoice #1234
					</Text>
					<Text className="text-sm text-muted-foreground mb-3">
						Due: March 15, 2026
					</Text>
					<View className="flex-row justify-between border-t border-border pt-2">
						<Text className="text-sm text-foreground">Total</Text>
						<Text className="text-sm font-bold text-foreground">$1,250.00</Text>
					</View>
				</View>

				{/* Table */}
				<Text className="text-lg font-semibold text-foreground mb-2">
					Table
				</Text>
				<View className="border border-border rounded-lg overflow-hidden">
					<View className="flex-row bg-muted px-3 py-2">
						<Text className="text-xs font-semibold text-muted-foreground flex-1">
							Name
						</Text>
						<Text className="text-xs font-semibold text-muted-foreground flex-1">
							Role
						</Text>
						<Text className="text-xs font-semibold text-muted-foreground flex-1 text-right">
							Status
						</Text>
					</View>
					{[
						{ name: "Alice", role: "Engineer", status: "Active" },
						{ name: "Bob", role: "Designer", status: "Away" },
						{ name: "Charlie", role: "PM", status: "Active" },
					].map((row, i) => (
						<View
							key={row.name}
							className={`flex-row px-3 py-2 ${i > 0 ? "border-t border-border" : ""}`}
						>
							<Text className="text-sm text-foreground flex-1">{row.name}</Text>
							<Text className="text-sm text-muted-foreground flex-1">
								{row.role}
							</Text>
							<Text className="text-sm text-foreground flex-1 text-right">
								{row.status}
							</Text>
						</View>
					))}
				</View>

				{/* Link */}
				<View className="mt-6">
					<Link
						src="https://github.com"
						className="text-sm text-brand-500 underline"
					>
						View on GitHub
					</Link>
				</View>
			</Page>
		</Document>
	);
}

export default function App() {
	return (
		<div style={{ height: "100vh" }}>
			<Tailwind theme={theme}>
				<PDFViewer style={{ width: "100%", height: "100%", border: "none" }}>
					<MyDocument />
				</PDFViewer>
			</Tailwind>
		</div>
	);
}
