// src/sanity/schemaTypes/life.ts
import { defineArrayMember, defineField, defineType } from 'sanity'

export const lifeType = defineType({
    name: 'life',
    title: '生活瞬间 (Life)',
    type: 'document',
    fields: [
        defineField({
            name: 'content',
            title: '文字内容',
            type: 'text',
            rows: 3,
            description: '写下当下的想法...',
        }),
        {
            name: 'images',
            title: '图片预览',
            type: 'array',
            of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
            description: '支持上传多张图片（朋友圈模式）',
        },
        defineField({
            name: 'locationName',
            title: '地点名称',
            type: 'string',
            description: '例如：上海 · 安福路',
        }),
        defineField({
            name: 'publishedAt',
            title: '发布时间',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
    ],
    preview: {
        select: {
            title: 'content',
            media: 'images.0', // 取第一张图作为预览
        },
        prepare({ title, media }) {
            return {
                title: title || '无文字内容',
                media,
            }
        },
    },
})