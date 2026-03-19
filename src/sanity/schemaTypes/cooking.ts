// src/sanity/schemaTypes/cooking.ts
import { defineField, defineType } from 'sanity';

export const cookingType = defineType({
    name: 'cooking',
    title: '食谱/厨艺 (Cooking)',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: '料理名称',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: '分类',
            type: 'string',
            options: {
                list: ['中式热炒', '西式简餐', '日式料理', '甜点烘焙', '调酒/饮品'],
            },
        }),
        defineField({
            name: 'difficulty',
            title: '难度系数',
            type: 'string',
            options: {
                list: [
                    { title: '🍳 有手就行', value: 'easy' },
                    { title: '🔥 需看火候', value: 'medium' },
                    { title: '👨‍🍳 厨神附体', value: 'hard' },
                ],
            },
        }),
        defineField({
            name: 'coverImage',
            title: '成品美照',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'ingredients',
            title: '食材清单',
            type: 'array',
            of: [{ type: 'string' }],
            description: '输入一项按回车，例如：鸡蛋 x2',
        }),
        defineField({
            name: 'instructions',
            title: '烹饪步骤',
            type: 'text',
            rows: 5,
            description: '简单描述一下核心步骤',
        }),
        defineField({
            name: 'story',
            title: '料理背后的故事',
            type: 'text',
            rows: 3,
            description: '为什么做这道菜？或者当时的心情',
        }),
    ],
    preview: {
        select: { title: 'title', subtitle: 'category', media: 'coverImage' },
    },
});
