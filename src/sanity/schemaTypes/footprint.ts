// src/sanity/schemaTypes/footprint.ts

import { defineField, defineType } from 'sanity'

export const footprintType = defineType({
    name: 'footprint',
    title: '足迹 (Footprints)',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: '地点名称',
            type: 'string',
            description: '例如：Shibuya Crossing, Tokyo 或 阿勒泰',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'location',
            title: '地理坐标',
            type: 'geopoint', // 核心字段：这是 Sanity 内置的地图坐标类型
            description: '点击地图上的点来拾取经纬度',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'visitedAt',
            title: '到访时间',
            type: 'date',
            options: {
                dateFormat: 'YYYY-MM-DD',
            },
            initialValue: () => new Date().toISOString().split('T')[0],
        }),
        defineField({
            name: 'coverImage',
            title: '定格瞬间',
            type: 'image',
            options: { hotspot: true },
            description: '最能代表这个地方的一张照片',
        }),
        defineField({
            name: 'mood',
            title: '当时的心情 (Vibe)',
            type: 'string',
            options: {
                list: [
                    { title: '☀️ Sunny / 兴奋', value: 'sunny' },
                    { title: '🌧️ Rainy / 忧郁', value: 'rainy' },
                    { title: '🌃 Night / 迷幻', value: 'night' },
                    { title: '🏔️ Nature / 治愈', value: 'nature' },
                    { title: '☕ Chill / 放松', value: 'chill' },
                ],
            },
        }),
        defineField({
            name: 'description',
            title: '短评',
            type: 'string',
            options: {
                rows: 3,
            },
            description: '不用写长文，一两句当下的感受即可。',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            date: 'visitedAt',
            media: 'coverImage',
        },
        prepare({ title, date, media }) {
            return {
                title,
                subtitle: date, // 在列表中显示日期
                media,
            }
        },
    },
})