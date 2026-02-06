// src/components/PortableTextComponents.tsx
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';

export const ptComponents = {
    types: {
        // 渲染图片
        image: ({ value }: any) => (
            <div className="relative w-full h-96 my-8 rounded-xl overflow-hidden">
                <Image
                    src={urlFor(value).url()}
                    alt="Blog content image"
                    fill
                    className="object-cover"
                />
            </div>
        ),
        // 渲染代码块 (核心)
        code: ({ value }: any) => (
            <div className="my-6 rounded-lg overflow-hidden border border-white/10 bg-[#1e1e1e]">
                {value.filename && (
                    <div className="px-4 py-2 border-b border-white/5 bg-white/5 text-xs font-mono text-zinc-400">
                        {value.filename}
                    </div>
                )}
                <pre className="p-4 overflow-x-auto selection:bg-amber-500/30">
                    <code className="text-sm font-mono text-amber-200/90 leading-relaxed">
                        {value.code}
                    </code>
                </pre>
            </div>
        ),
    },
    block: {
        // 自定义 H1, H2 等
        h2: ({ children }: any) => (
            <h2 className="text-2xl font-bold mt-12 mb-4 text-text-main tracking-tight">{children}</h2>
        ),
        normal: ({ children }: any) => (
            <p className="text-text-dim leading-8 mb-6 text-base">{children}</p>
        ),
    },
    marks: {
        // 链接样式
        link: ({ children, value }: any) => (
            <a
                href={value.href}
                className="text-amber-500 underline decoration-amber-500/30 underline-offset-4 hover:text-amber-400"
            >
                {children}
            </a>
        ),
    },
};