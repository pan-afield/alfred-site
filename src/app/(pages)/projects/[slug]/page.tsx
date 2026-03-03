// src/app/(pages)/projects/[slug]/page.tsx
import { PortableText } from '@portabletext/react';
import { ptComponents } from '@/components/PortableTextComponents';
import { getProjectBySlug } from '@/lib/sanity';

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) return <div>Post not found</div>;

    return (
        <article className="relative min-h-screen">
            {/* 封面背景：铺满视口，渐变遮罩保证文字可读 */}
            {project.coverImage && (
                <div className="fixed inset-0 -z-10">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${project.coverImage})` }}
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/60 to-transparent" />
                </div>
            )}

            <div className="max-w-3xl mx-auto py-20 px-6 relative z-10">
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
            </div>
        </article>
    );
}