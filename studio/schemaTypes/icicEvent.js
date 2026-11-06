// /schemas/icicEvent.js
export default {
  name: 'icicEvent',
  title: 'ICIC - Cursos y Conferencias',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título del Evento',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'eventDate',
      title: 'Fecha del Evento',
      type: 'datetime',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'coverImage',
      title: 'Cartel del Evento',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'description',
      title: 'Descripción Breve',
      type: 'text',
      validation: (Rule) => Rule.max(200)
    }
  ],
  preview: {
    select: {
      title: 'title',
      eventDate: 'eventDate',
      media: 'coverImage'
    },
    prepare({ title, eventDate, media }) {
      return {
        title: title || 'Evento sin título',
        subtitle: eventDate ? new Date(eventDate).toLocaleDateString() : 'Sin fecha',
        media
      }
    },
  },
}