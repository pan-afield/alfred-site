// src/app/(pages)/projects/[slug]/page.tsx
import { PortableText } from '@portabletext/react';
import { ptComponents } from '@/components/PortableTextComponents';
import { getProjectBySlug } from '@/lib/sanity'; // 你需要去 sanity.ts 写这个查询

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
    // 1. 这一步是关键！必须 await params，否则 slug 会是 undefined
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) return <div>Post not found</div>;

    return (
        <article className="max-w-3xl mx-auto py-20 px-6">
            <header className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
                    {project.title}
                </h1>
                <div className="flex gap-4 text-sm text-text-dim italic">
                    <span>{new Date(project.publishedAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{project.readingTime} min read</span>
                </div>
            </header>

            {/* 核心渲染区域 */}
            <div className="prose prose-invert max-w-none">
                <PortableText value={project.content} components={ptComponents} />
            </div>
        </article>
    );
}