import { cmicClasses } from '../styles/recipes';
import type { Convenio } from '../types/content';
// src/pages/Convenios.js
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { client, urlFor } from "../lib/sanity";

// GROQ actualizado para el schema de convenios
const QUERY = `
*[_type == "convenio" && esPublico == true] | order(orden asc, nombre asc) {
  _id, nombre, categoria, logo,
  beneficioPublico, precioDesde, monedaDesde,
  contactoPublico{ telefono, email },
  direccion{ calle, colonia, ciudad, estado },
  "tarifasPublicas": coalesce(
    select(
      categoria == "Hotel" && defined(tarifasInternas) =>
        tarifasInternas[esPublica == true]{ precio, moneda, desayuno, impuestos }
    ),
    []
  )
}
`;

// Helpers
const norm = (s = "") =>
  s.toString().normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

const money = (n: number | undefined, c = "MXN") =>
  typeof n === "number"
    ? n.toLocaleString("es-MX", { style: "currency", currency: c })
    : "—";

const CATS = ["Todos", "Hotel", "Anuncios", "Restaurante", "Transporte", "Otro"];

// 📌 Número fijo de WhatsApp (formato wa.me = solo dígitos)
const WA_TARGET = "5214494401155";

export default function Convenios() {
  const [loading, setLoading] = useState(true);
  const [convenios, setConvenios] = useState<Convenio[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [cat, setCat] = useState("Todos");
  const [seleccionado, setSeleccionado] = useState<Convenio | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await client.fetch<Convenio[]>(QUERY);
        if (alive) setConvenios(data || []);
      } catch (e) {
        console.error("Error cargando convenios:", e);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  // Bloquear scroll del BODY cuando el modal está abierto
  useEffect(() => {
    if (seleccionado) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [seleccionado]);

  const listaFiltrada = useMemo(() => {
    const t = norm(busqueda);
    return convenios.filter((convenio) => {
      const okCat = cat === "Todos" ? true : convenio.categoria === cat;
      const okTxt = t ? norm(convenio.nombre).includes(t) : true;
      return okCat && okTxt;
    });
  }, [convenios, busqueda, cat]);

  return (
    <main className={cmicClasses("convenios convenios-responsive")}>
      <section className={cmicClasses("convenios__hero")}>
        <h1 className={cmicClasses("convenios__title")}>Convenios</h1>
        <p className={cmicClasses("convenios__subtitle")}>Beneficios claros, sin saturar de información.</p>

        <div className={cmicClasses("convenios__actions")}>
          <div className={cmicClasses("convenios__search")}>
            <input
              type="search"
              placeholder="Buscar por nombre…"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              aria-label="Buscar convenios por nombre"
            />
          </div>
          <div className={cmicClasses("convenios__filters")}>
            {CATS.map((c) => (
              <button
                key={c}
                className={cmicClasses(`chip ${cat === c ? "chip--active" : ""}`)}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={cmicClasses("convenios__grid")}>
        {loading && <div className={cmicClasses("skeleton")}>Cargando convenios…</div>}

        {!loading && listaFiltrada.length === 0 && (
          <div className={cmicClasses("convenios__empty")}>
            <p>No hay resultados para "{busqueda}" {cat !== "Todos" && `en ${cat}`}.</p>
            <p>Intenta con otros términos o categorías.</p>
          </div>
        )}

        {!loading && listaFiltrada.map((convenio) => {
          const resumen =
            convenio.beneficioPublico
              ? convenio.beneficioPublico
              : typeof convenio.precioDesde === "number"
              ? `Desde ${money(convenio.precioDesde, convenio.monedaDesde || "MXN")}`
              : null;

          return (
            <article key={convenio._id} className={cmicClasses("card")} aria-label={`Convenio ${convenio.nombre}`}>
              <div className={cmicClasses("card__media")}>
                {convenio.logo ? (
                  <img
                    src={urlFor(convenio.logo, { width: 480 }).url()}
                    alt={`Logo de ${convenio.nombre}`}
                    loading="lazy"
                    width="240"
                    height="120"
                  />
                ) : (
                  <div className={cmicClasses("card__placeholder")} aria-hidden="true">
                    {convenio.nombre?.[0] || "?"}
                  </div>
                )}
              </div>

              <div className={cmicClasses("card__body")}>
                <span className={cmicClasses("badge")}>{convenio.categoria}</span>
                <h3 className={cmicClasses("card__title")}>{convenio.nombre}</h3>
                {resumen && <p className={cmicClasses("card__resume")}>{resumen}</p>}
                <div className={cmicClasses("card__cta")}>
                  <button 
                    className={cmicClasses("btn btn--primary")} 
                    onClick={() => setSeleccionado(convenio)}
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {seleccionado && (
        <Modal onClose={() => setSeleccionado(null)}>
          <DetalleConvenio data={seleccionado} />
        </Modal>
      )}
    </main>
  );
}

/* ---------- Modal genérico ---------- */
function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  // cerrar con ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // foco inicial en botón de cierre (accesibilidad básica)
  useEffect(() => {
    const btn = panelRef.current?.querySelector<HTMLButtonElement>(".modal__close");
    btn?.focus();
  }, []);

  return (
    <div className={cmicClasses("modal")} role="dialog" aria-modal="true" onClick={onClose}>
      <div className={cmicClasses("modal__backdrop")} />
      {/* impedir que los clics dentro del panel cierren el modal */}
      <div
        className={cmicClasses("modal__panel modal__panel--center")}
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={cmicClasses("modal__close")} onClick={onClose} aria-label="Cerrar">×</button>
        {children}
      </div>
    </div>
  );
}

/* ---------- Contenido del modal ---------- */
function DetalleConvenio({ data }: {data: Convenio}) {
  const {
    nombre, categoria, logo,
    beneficioPublico, precioDesde, monedaDesde,
    contactoPublico, direccion,
    tarifasPublicas
  } = data || {};

  // Normaliza tarifas públicas para evitar null
  const tarifas = Array.isArray(tarifasPublicas) ? tarifasPublicas : [];

  // 📲 WhatsApp SIEMPRE al número fijo WA_TARGET
  const handleWhatsAppClick = useCallback(() => {
    const message = `Hola, estoy interesado en el convenio con ${nombre}. ¿Podrían brindarme más información?`;
    const url = `https://wa.me/${WA_TARGET}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }, [nombre]);

  return (
    <div className={cmicClasses("details")}>
      {/* Encabezado con logo grande + título centrado */}
      <header className={cmicClasses("details__header")}>
        {logo && (
          <img
            src={urlFor(logo, { width: 900 }).url()}
            alt={`Logo de ${nombre}`}
            className={cmicClasses("details__logo")}
          />
        )}
        <h3 className={cmicClasses("details__title")}>{nombre}</h3>
        <span className={cmicClasses("details__cat")}>{categoria}</span>
      </header>

      {/* Beneficio público destacado */}
      {(beneficioPublico || typeof precioDesde === "number") && (
        <div className={cmicClasses("highlight")}>
          {beneficioPublico && <span className={cmicClasses("highlight__main")}>{beneficioPublico}</span>}
          {typeof precioDesde === "number" && (
            <span className={cmicClasses("highlight__sub")}>Desde {money(precioDesde, monedaDesde || "MXN")}</span>
          )}
        </div>
      )}

      {/* Datos públicos en rejilla */}
      <section className={cmicClasses("infoGrid")}>
        {(contactoPublico?.telefono || contactoPublico?.email) && (
          <div className={cmicClasses("infoItem")}>
            <h4>Contacto</h4>
            <p className={cmicClasses("muted")}>
              {contactoPublico?.telefono && <span>Tel. {contactoPublico.telefono}</span>}
              {contactoPublico?.telefono && contactoPublico?.email && <span> · </span>}
              {contactoPublico?.email && (
                <a href={`mailto:${contactoPublico.email}`}>{contactoPublico.email}</a>
              )}
            </p>
          </div>
        )}

        {direccion && (direccion.calle || direccion.colonia || direccion.ciudad || direccion.estado) && (
          <div className={cmicClasses("infoItem")}>
            <h4>Dirección</h4>
            <p className={cmicClasses("muted")}>
              {[direccion.calle, direccion.colonia, direccion.ciudad, direccion.estado]
                .filter(Boolean).join(", ")}
            </p>
          </div>
        )}
      </section>

      {/* Tabla de tarifas (solo si hay filas públicas autorizadas) */}
      {categoria === "Hotel" && tarifas.length > 0 && (
        <>
          <h4 className={cmicClasses("sectionTitle")}>Tarifas autorizadas</h4>
          <div className={cmicClasses("tableWrap")}>
            <table className={cmicClasses("miniTable")} aria-label="Tarifas públicas">
              <thead>
                <tr>
                  <th>Precio</th>
                  <th>Desayuno</th>
                  <th>Impuestos / Incluye</th>
                </tr>
              </thead>
              <tbody>
                {tarifas.map((t, i) => (
                  <tr key={i}>
                    <td>{money(t.precio, t.moneda || "MXN")}</td>
                    <td>{t.desayuno || "—"}</td>
                    <td>{t.impuestos || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* CTA WhatsApp (fijo) */}
      <div className={cmicClasses("ctaRow")}>
        <button className={cmicClasses("btn btn--primary")} onClick={handleWhatsAppClick}>
          Enviar mensaje por WhatsApp
        </button>
      </div>
    </div>
  );
}