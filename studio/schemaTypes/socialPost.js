// /schemas/cmicPost.js
export default {
  name: 'cmicPost',
  title: 'CMIC - Posts de Facebook',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título del Post',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
      description: 'Título descriptivo del post de Facebook'
    },
    {
      name: 'postUrl',
      title: 'URL del Post de Facebook',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
      description: 'Pega el enlace público del post de Facebook'
    },
    {
      name: 'publishedAt',
      title: 'Fecha de publicación en Facebook',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'postUrl',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Post sin título',
        subtitle: subtitle ? new URL(subtitle).hostname : 'Sin URL'
      }
    },
  },
}