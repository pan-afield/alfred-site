// src/sanity/schemaTypes/music.ts
import { defineField, defineType } from 'sanity'

export const musicType = defineType({
    name: 'music',
    title: '音乐收藏 (Music)',
    type: 'document',
    fields: [
        defineField({ name: 'title', title: '歌曲/专辑名称', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'artist', title: '艺术家', type: 'string' }),
        defineField({
            name: 'type',
            title: '类型',
            type: 'string',
            options: { list: ['Single (单曲)', 'Album (专辑)', 'Playlist (歌单)'] }
        }),
        defineField({
            name: 'genre',
            title: '流派',
            type: 'string',
            options: { list: ['Rock', 'Jazz', 'Electronic', 'Classical', 'Lo-fi', 'Pop', 'Vaporwave'] }
        }),
        defineField({ name: 'coverImage', title: '封面/黑胶图', type: 'image', options: { hotspot: true } }),
        defineField({
            name: 'spotifyUrl',
            title: '音乐链接',
            type: 'url',
            description: '可以粘贴 Spotify 或 Apple Music 的分享链接'
        }),
        defineField({ name: 'comment', title: '听感/乐评', type: 'text', options: { rows: 3 } }),
    ],
    preview: {
        select: { title: 'title', subtitle: 'artist', media: 'coverImage' }
    }
})