// schemas/afiliado.js
export default {
  name: 'afiliados',
  title: 'Afiliados',
  type: 'document',
  fields: [
    {
      name: 'nombre',
      title: 'Nombre del Afiliado',
      type: 'string',
      description: 'Nombre de la empresa u organización afiliada',
      validation: Rule => Rule.required()
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Logo del afiliado (formatos recomendados: PNG, SVG, JPG)',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'contacto',
      title: 'Información de Contacto',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Correo Electrónico',
          type: 'string',
          description: 'Email de contacto'
        },
        {
          name: 'telefono',
          title: 'Teléfono de Contacto',
          type: 'string',
          description: 'Número telefónico'
        }
      ]
    },
    {
      name: 'ubicacion',
      title: 'Ubicación',
      type: 'object',
      fields: [
        {
          name: 'direccion',
          title: 'Dirección',
          type: 'text',
          description: 'Dirección física del establecimiento',
          rows: 3
        },
        {
          name: 'googleMaps',
          title: 'URL Google Maps',
          type: 'url',
          description: 'Enlace a la ubicación en Google Maps'
        }
      ]
    },
    {
      name: 'sitioWeb',
      title: 'Sitio Web',
      type: 'url',
      description: 'URL del sitio web oficial'
    },
    {
      name: 'redesSociales',
      title: 'Redes Sociales',
      type: 'object',
      fields: [
        {
          name: 'tieneFacebook',
          title: '¿Tiene Facebook?',
          type: 'boolean',
          description: 'Marcar si tiene página de Facebook',
          initialValue: false
        },
        {
          name: 'facebook',
          title: 'URL Facebook',
          type: 'url',
          description: 'Enlace al perfil/página de Facebook',
          hidden: ({ parent }) => !parent?.tieneFacebook
        },
        {
      name: 'tieneInstagram',
          title: '¿Tiene Instagram?',
          type: 'boolean',
          description: 'Marcar si tiene perfil de Instagram',
          initialValue: false
        },
        {
          name: 'instagram',
          title: 'URL Instagram',
          type: 'url',
          description: 'Enlace al perfil de Instagram',
          hidden: ({ parent }) => !parent?.tieneInstagram
        },
        {
          name: 'tieneX',
          title: '¿Tiene X (Twitter)?',
          type: 'boolean',
          description: 'Marcar si tiene perfil de X (Twitter)',
          initialValue: false
        },
        {
          name: 'x',
          title: 'URL X (Twitter)',
          type: 'url',
          description: 'Enlace al perfil de X (Twitter)',
          hidden: ({ parent }) => !parent?.tieneX
        },
        {
          name: 'tieneTikTok',
          title: '¿Tiene TikTok?',
          type: 'boolean',
          description: 'Marcar si tiene perfil de TikTok',
          initialValue: false
        },
        {
          name: 'tiktok',
          title: 'URL TikTok',
          type: 'url',
          description: 'Enlace al perfil de TikTok',
          hidden: ({ parent }) => !parent?.tieneTikTok
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'nombre',
      media: 'logo'
    }
  }
}