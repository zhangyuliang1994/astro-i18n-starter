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

export const collections = { blog, projects, docs };
