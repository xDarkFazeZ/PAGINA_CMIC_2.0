export default {
  name: 'prensaPost',
  title: 'Post de Prensa',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.required().max(100)
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'coverImage',
      title: 'Imagen de Portada',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Texto Alternativo',
          type: 'string',
          options: {
            isHighlighted: true
          }
        }
      ]
    },
    {
      name: 'summary',
      title: 'Resumen',
      type: 'text',
      description: 'Breve resumen de la noticia',
      validation: Rule => Rule.max(200)
    },
    {
      name: 'content',
      title: 'Contenido Completo',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              title: 'Texto Alternativo',
              type: 'string',
              options: {
                isHighlighted: true
              }
            }
          ]
        }
      ]
    },
    {
      name: 'publishDate',
      title: 'Fecha de Publicación',
      type: 'date',
      options: {
        dateFormat: 'YYYY/MM/DD'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'externalLink',
      title: 'Enlace Externo (opcional)',
      type: 'url',
      description: 'Enlace a la noticia en sitio externo'
    }
  ],
  orderings: [
    {
      title: 'Fecha de Publicación, Nuevo',
      name: 'publishDateDesc',
      by: [
        {field: 'publishDate', direction: 'desc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      subtitle: 'publishDate'
    },
    prepare(selection) {
      const {title, media, subtitle} = selection
      return {
        title: title,
        media: media,
        subtitle: `Publicado: ${subtitle}`
      }
    }
  }
}