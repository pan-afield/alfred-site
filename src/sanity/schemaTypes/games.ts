// src/sanity/schemaTypes/game.ts
import { defineField, defineType } from 'sanity'

export const gameType = defineType({
    name: 'game',
    title: '游戏库 (Games)',
    type: 'document',
    fields: [
        defineField({ name: 'title', title: '游戏名称', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({
            name: 'platform',
            title: '平台',
            type: 'string',
            options: { list: ['Steam', 'PS5', 'Switch', 'Xbox', 'iOS/Android', 'PC'] }
        }),
        defineField({
            name: 'status',
            title: '状态',
            type: 'string',
            options: {
                list: [
                    { title: '正在玩 (Playing)', value: 'playing' },
                    { title: '已通关 (Finished)', value: 'finished' },
                    { title: '全成就 (Platinum)', value: 'platinum' },
                    { title: '搁置中 (On Hold)', value: 'onhold' }
                ]
            }
        }),
        defineField({
            name: 'rating',
            title: '评分 (1-5)',
            type: 'number',
            validation: (Rule) => Rule.min(1).max(5)
        }),
        defineField({ name: 'coverImage', title: '游戏封面', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'review', title: '简评', type: 'text', options: { rows: 3 } }),
    ],
    preview: {
        select: { title: 'title', subtitle: 'status', media: 'coverImage' }
    }
})