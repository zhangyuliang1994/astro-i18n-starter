import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
	loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/content/blog" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			date: z.coerce.date(),
			cover: image().optional(),
			tags: z.array(z.string()).optional(),
			categories: z.array(z.string()).optional(),
		}),
});

const projects = defineCollection({
	loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/content/projects" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			date: z.coerce.date(),
			cover: image().optional(),
		}),
});

const docs = defineCollection({
	loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/content/docs" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			date: z.coerce.date(),
			cover: image().optional(),
		}),
});

const books = defineCollection({
	loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/content/books" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			author: z.string().optional(),
			description: z.string(),
			date: z.coerce.date(),
			cover: image().optional(),
			status: z.enum(["reading", "finished", "recommended"]).default("finished"),
			rating: z.number().min(1).max(5).optional(),
			tags: z.array(z.string()).optional(),
		}),
});

export const collections = { blog, projects, docs, books };
