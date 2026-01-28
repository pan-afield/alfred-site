// schemaTypes/movie.ts
import { defineArrayMember, defineField, defineType } from 'sanity'

export const movieType = defineType({
    name: 'movie',
    title: '电影影评',
    type: 'document',
    fields: [
        defineField({ name: 'title', title: '电影名称', type: 'string' }),
        defineField({ name: 'director', title: '导演', type: 'string' }),
        defineField({ name: 'year', title: '上映年份', type: 'number' }),
        defineField({ 
            name: 'rating', 
            title: '个人评分', 
            type: 'number', 
            validation: (Rule) => Rule.min(0).max(10) 
        }),
        defineField({ 
            name: 'poster', 
            title: '电影海报', 
            type: 'image', 
            options: { hotspot: true } 
        }),
        defineField({ 
            name: 'accentColor', 
            title: '主题色 (Hex)', 
            type: 'string', 
            description: '用于背景光晕联动，例如 #e2b170' 
        }),
        defineField({ name: 'thought', title: '影评感悟', type: 'text' }),
        {
            name: 'tags',
            title: '标签',
            type: 'array',
            of: [defineArrayMember({ type: 'string' })],
        },
    ],
})