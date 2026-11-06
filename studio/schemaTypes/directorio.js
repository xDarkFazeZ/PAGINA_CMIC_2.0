export default {
  name: 'directorio',
  title: 'Directorio',
  type: 'document',
  fields: [
    {
      name: 'nombre',
      title: 'Nombre Completo',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'cargo',
      title: 'Cargo',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'frase',
      title: 'Frase o Mensaje',
      type: 'text',
      description: 'Una frase inspiradora o mensaje de esta persona'
    },
    {
      name: 'imagen',
      title: 'Foto',
      type: 'image',
      options: {
        hotspot: true
      }
      // Se eliminó validation: Rule => Rule.required() para hacerlo opcional
    },
    {
      name: 'orden',
      title: 'Orden de aparición',
      type: 'number',
      description: 'Número para ordenar a los miembros (menor número aparece primero)'
    }
  ],
  orderings: [
    {
      title: 'Orden Personalizado',
      name: 'ordenPersonalizado',
      by: [
        {field: 'orden', direction: 'asc'}
      ]
    }
  ]
}