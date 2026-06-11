import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { PostMeta, Post } from './blogTypes';

// ─────────────────────────────────────────────────────────────────────────────
// lib/blog.ts — Capa de datos para el sistema de blog basado en ficheros .md
// Los posts viven en /posts/*.md con frontmatter YAML.
// ─────────────────────────────────────────────────────────────────────────────

const postsDirectory = path.join(process.cwd(), 'posts');

export type { PostMeta, Post };
export { formatDate } from './blogTypes';

function estimateReadingTime(htmlContent: string): number {
  const words = htmlContent.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function formatDateSort(date: string): number {
  return new Date(date).getTime();
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.md'));

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? '2026-01-01',
      excerpt: data.excerpt ?? '',
      category: data.category ?? 'General',
      readingTime: data.readingTime ?? 3,
      coverImage: data.coverImage,
      draft: data.draft ?? false,
    } satisfies PostMeta;
  });

  return posts
    .filter((post) => !post.draft)
    .sort((a, b) => formatDateSort(b.date) - formatDateSort(a.date));
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '2026-01-01',
    excerpt: data.excerpt ?? '',
    category: data.category ?? 'General',
    readingTime: data.readingTime ?? estimateReadingTime(contentHtml),
    coverImage: data.coverImage,
    contentHtml,
  };
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}
