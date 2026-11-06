// sanity/schemas/convenios.js
export default {
  name: "convenio",
  title: "Convenios",
  type: "document",
  fields: [
    // Identidad
    {
      name: "nombre",
      title: "Nombre del Establecimiento",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(160)
    },
    {
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      description: "PNG / JPG / SVG"
    },

    // Clasificación
    {
      name: "categoria",
      title: "Categoría",
      type: "string",
      options: {
        list: ["Hotel", "Anuncios", "Restaurante", "Transporte", "Otro"],
        layout: "dropdown"
      },
      initialValue: "Hotel",
      validation: (Rule) => Rule.required()
    },

    // Resumen público
    {
      name: "beneficioPublico",
      title: "Beneficio público (resumen)",
      type: "string",
      description: "Ej. '15% de descuento' o 'Tarifas preferenciales'."
    },
    {
      name: "precioDesde",
      title: "Precio desde",
      type: "number",
      description: "Solo si aplica (se mostrará 'Desde $...')."
    },
    {
      name: "monedaDesde",
      title: "Moneda del precio desde",
      type: "string",
      options: { list: ["MXN", "USD", "EUR"] },
      initialValue: "MXN"
    },

    // Datos públicos
    {
      name: "contactoPublico",
      title: "Contacto público",
      type: "object",
      fields: [
        { name: "telefono", title: "Teléfono", type: "string" },
        { name: "email", title: "Email", type: "string" }
      ]
    },
    {
      name: "direccion",
      title: "Dirección",
      type: "object",
      fields: [
        { name: "calle", title: "Calle", type: "string" },
        { name: "colonia", title: "Colonia", type: "string" },
        { name: "ciudad", title: "Ciudad", type: "string" },
        { name: "estado", title: "Estado", type: "string" }
      ]
    },

    // Tarifas internas (sin 'plan', conservando tus campos)
    {
      name: "tarifasInternas",
      title: "Tarifas",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "precio", title: "Precio", type: "number", validation: Rule => Rule.min(0) },
          { name: "moneda", title: "Moneda", type: "string", options: { list: ["MXN", "USD", "EUR"] }, initialValue: "MXN" },
          { name: "desayuno", title: "Desayuno", type: "string", description: "Ej. 'Desayuno no incluido'." },
          { name: "impuestos", title: "Impuestos / Incluye", type: "text", rows: 3 },
          { name: "esPublica", title: "Hacer pública esta fila", type: "boolean", initialValue: false }
        ],
        preview: {
          select: { precio: "precio", moneda: "moneda", desayuno: "desayuno", pub: "esPublica" },
          prepare: ({ precio, moneda, desayuno, pub }) => ({
            title: (typeof precio === "number") ? `${precio} ${moneda || ""}` : "Sin precio",
            subtitle: `${desayuno || "—"} ${pub ? "• Pública" : "• Interna"}`
          })
        }
      }]
    },

    // Publicación y orden
    {
      name: "esPublico",
      title: "Mostrar en la web",
      type: "boolean",
      initialValue: true
    },
    {
      name: "orden",
      title: "Orden",
      type: "number",
      initialValue: 0
    },

    // Notas internas
    { name: "notasPrivadas", title: "Notas internas", type: "text", rows: 3 }
  ],

  // Sin validación cruzada de planes/tablas públicas
  preview: {
    select: {
      title: "nombre",
      media: "logo",
      cat: "categoria",
      benef: "beneficioPublico",
      desde: "precioDesde",
      mon: "monedaDesde",
      tarifas: "tarifasInternas"
    },
    prepare({ title, media, cat, benef, desde, mon, tarifas }) {
      const pubCount = (tarifas || []).filter(t => t?.esPublica).length;
      const resumen = benef || (typeof desde === "number" ? `Desde ${desde} ${mon || ""}` : "Sin resumen");
      return {
        title: title || "Sin nombre",
        media,
        subtitle: `${cat || "Sin categoría"} • ${resumen} • ${pubCount} fila(s) públicas`
      };
    }
  },

  orderings: [
    { title: "Orden personalizado", name: "ordenAsc", by: [{ field: "orden", direction: "asc" }] },
    { title: "Nombre A-Z", name: "nombreAsc", by: [{ field: "nombre", direction: "asc" }] },
    { title: "Categoría", name: "categoriaAsc", by: [{ field: "categoria", direction: "asc" }] }
  ]
};
