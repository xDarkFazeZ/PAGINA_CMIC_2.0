// En schemaTypes/imagenesServicios.js
export default {
  name: 'imagenesServicios',
  title: 'Imágenes para Servicios',
  type: 'document',
  fields: [
    {
      name: 'nombre',
      title: 'Nombre (igual que en el código)',
      type: 'string',
      description: 'Usa el mismo nombre que en tu import: observalogo, cesco, ambientecmic, etc.'
    },
    {
      name: 'imagen',
      title: 'Imagen',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'alt',
      title: 'Texto alternativo',
      type: 'string'
    }
  ]
}