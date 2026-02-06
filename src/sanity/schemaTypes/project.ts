// schemaTypes/project.ts
export const projectType = {
    name: 'project',
    title: '技术日志',
    type: 'document',
    fields: [
        { name: 'title', title: '标题', type: 'string' },
        { name: 'slug', title: 'URL 别名', type: 'slug', options: { source: 'title' } },
        {
            name: 'category', title: '分类', type: 'string',
            options: { list: ['Frontend', 'Backend', 'AI', 'Workflow'] }
        },
        { name: 'publishedAt', title: '发布日期', type: 'datetime' },
        { name: 'readingTime', title: '预计阅读时间 (分钟)', type: 'number' },
        { name: 'summary', title: '内容摘要', type: 'text', description: '用于列表页展示' },
        { name: 'coverImage', title: '封面图', type: 'image', options: { hotspot: true } },
        {
            name: 'content',
            title: '日志正文',
            type: 'array',
            of: [
                { type: 'block' }, // 支持基础排版
                { type: 'image' }, // 支持文中插图
                {
                    type: 'code', // 非常重要：技术日志必须有代码块
                    title: '代码块',
                    options: { withFilename: true }
                }
            ]
        },
        { name: 'tags', title: '标签', type: 'array', of: [{ type: 'string' }] },
    ],
}