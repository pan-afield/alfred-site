// src/sanity/schemaTypes/car.ts
import { defineField, defineType } from 'sanity';

export const carType = defineType({
    name: 'car',
    title: '座驾 (Garage)',
    type: 'document',
    fields: [
        defineField({
            name: 'model',
            title: '车型名称',
            type: 'string',
            validation: (Rule) => Rule.required(),
            description: '例如：Porsche 911 GT3 或 Pontiac Aztek',
        }),
        defineField({ name: 'brand', title: '品牌', type: 'string' }),
        defineField({
            name: 'status',
            title: '状态',
            type: 'string',
            options: {
                list: [
                    { title: '🟢 正在服役 (Current)', value: 'current' },
                    { title: '⚪ 已成回忆 (Past)', value: 'past' },
                    { title: '🟡 梦想名单 (Dream)', value: 'dream' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'specs',
            title: '性能参数',
            type: 'string',
            description: '例如：3.0T V6 / 450HP / 550N·m',
        }),
        defineField({
            name: 'coverImage',
            title: '车辆大片',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'modList',
            title: '改装清单',
            type: 'array',
            of: [{ type: 'string' }],
            description: '记录你对它的每一次升级（输入一项按回车）',
        }),
        defineField({
            name: 'story',
            title: '驾驶故事',
            type: 'text',
            rows: 4,
            description: '关于它的回忆、驾驶感受或拥有它的故事',
        }),
    ],
    preview: {
        select: { title: 'model', subtitle: 'specs', media: 'coverImage' },
    },
});
