import { Block, Document, Page, Text } from "@ui-registry/pdf";
import type React from "react";

import { Badge } from "@/registry/pdf/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/registry/pdf/card";
import { Heading } from "@/registry/pdf/heading";
import { Invoice } from "@/registry/pdf/invoice";
import { exampleInvoice } from "@/registry/pdf/invoice-example";
import { PageFooter } from "@/registry/pdf/page-footer";
import { Separator } from "@/registry/pdf/separator";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/registry/pdf/table";

const Sheet = ({ children }: { children: React.ReactNode }) => (
	<Document>
		<Page className="gap-6 bg-background p-10 pb-20 text-sm" size="A5">
			{children}
		</Page>
	</Document>
);

const rows = [
	{ name: "Alice Martin", role: "Engineer", status: "Active" },
	{ name: "Bruno Petit", role: "Designer", status: "Away" },
	{ name: "Chloé Bernard", role: "Product", status: "Active" },
];

export const previews = {
	badge: (
		<Sheet>
			<Block className="flex-row gap-2">
				<Badge>Default</Badge>
				<Badge variant="secondary">Secondary</Badge>
				<Badge variant="destructive">Destructive</Badge>
				<Badge variant="outline">Outline</Badge>
			</Block>
		</Sheet>
	),
	card: (
		<Sheet>
			<Card>
				<CardHeader>
					<CardTitle>Quarterly summary</CardTitle>
					<CardDescription>Q3 2026 — all regions</CardDescription>
				</CardHeader>
				<CardContent>
					<Text>Revenue grew 18% compared to the previous quarter.</Text>
				</CardContent>
				<CardFooter className="justify-between">
					<Text className="text-muted-foreground">Total</Text>
					<Text className="font-semibold">€ 1.2M</Text>
				</CardFooter>
			</Card>
		</Sheet>
	),
	heading: (
		<Sheet>
			<Heading level={1}>Heading 1</Heading>
			<Heading level={2}>Heading 2</Heading>
			<Heading level={3}>Heading 3</Heading>
			<Heading level={4}>Heading 4</Heading>
		</Sheet>
	),
	invoice: <Invoice data={exampleInvoice} />,
	"page-footer": (
		<Sheet>
			<Text>The footer is repeated at the bottom of every page.</Text>
			<PageFooter>Acme Studio · Annual report</PageFooter>
		</Sheet>
	),
	separator: (
		<Sheet>
			<Text>Above the separator</Text>
			<Separator />
			<Block className="h-10 flex-row items-center gap-4">
				<Text>Left</Text>
				<Separator orientation="vertical" />
				<Text>Right</Text>
			</Block>
		</Sheet>
	),
	table: (
		<Sheet>
			<Table>
				<TableHeader>
					<TableRow className="border-b-0">
						<TableHead>Name</TableHead>
						<TableHead>Role</TableHead>
						<TableHead className="text-right">Status</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.name}>
							<TableCell className="font-medium">{row.name}</TableCell>
							<TableCell className="text-muted-foreground">
								{row.role}
							</TableCell>
							<TableCell className="text-right">{row.status}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Sheet>
	),
} satisfies Record<string, React.ReactElement>;

export type PreviewName = keyof typeof previews;
