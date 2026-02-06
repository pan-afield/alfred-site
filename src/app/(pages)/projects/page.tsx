// src/app/(pages)/projects/page.tsx
import Link from 'next/link';
import { getProjects } from '@/lib/sanity'; // 确保你在 sanity.ts 里写了抓取函数

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <div className="max-w-4xl mx-auto py-24 px-6">
            <header className="mb-16">
                <h1 className="text-4xl font-bold text-text-main mb-4 tracking-tight">Technical Logs</h1>
                <p className="text-text-dim max-w-md italic">
                    记录技术探索、架构思考以及在代码世界里的碎碎念。
                </p>
            </header>

            <div className="relative border-l border-white/10 ml-4 pl-8 space-y-16">
                {projects.map((project: any) => (
                    <article key={project._id} className="relative group">
                        {/* 时间轴小圆点 */}
                        <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full bg-zinc-900 border-2 border-white/20 group-hover:border-amber-500 transition-colors duration-500" />

                        <div className="flex flex-col gap-2">
                            <time className="text-xs font-mono text-text-dim tracking-widest uppercase opacity-60">
                                {new Date(project.publishedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </time>

                            <Link href={`/projects/${project.slug}`}>
                                <h2 className="text-2xl font-bold text-text-main group-hover:text-amber-500 transition-colors cursor-pointer">
                                    {project.title}
                                </h2>
                            </Link>

                            <p className="text-text-dim leading-relaxed max-w-2xl line-clamp-2">
                                {project.summary}
                            </p>

                            <div className="flex gap-3 mt-2">
                                {project.tags?.map((tag: string) => (
                                    <span key={tag} className="text-[10px] px-2 py-1 rounded bg-white/5 text-zinc-400 border border-white/5 uppercase tracking-tighter">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}