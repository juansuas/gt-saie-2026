export const sesiones = [
  {
    id: 1,
    slug: "sesion-1",
    label: "Sesión 1",
    date: "Miércoles 30 de septiembre",
    shortDate: "Miércoles 30",
    time: "14:30–16:15",
    coordinator: "Lilia Toranzos",
    dynamic: "Dos bloques de presentaciones, con aproximadamente 15 minutos por trabajo y un intercambio al cierre de cada bloque.",
    blocks: [
      { label: "Bloque 1", detail: "Dos presentaciones · intercambio", works: ["GT 01.13", "GT 01.17"] },
      { label: "Bloque 2", detail: "Dos presentaciones · intercambio", works: ["GT 01.01", "GT 01.18"] }
    ],
    pending: ["GT 01.05"],
    axes: [
      { title: "Prescripción de la evidencia vs. usos reales, legitimación y gobernanza de la evaluación", text: "La brecha entre el modelo de políticas basadas en evidencia y los usos efectivos, simbólicos o políticos de la información producida por evaluaciones estandarizadas." },
      { title: "El artefacto de devolución, las mediaciones territoriales y los apoyos institucionales", text: "Las restricciones de acceso, la inestabilidad de los formatos y la falta de acompañamiento que condicionan la apropiación escolar de los reportes." },
      { title: "Sentidos políticos y fronteras metodológicas", text: "Las posibilidades del procesamiento de lenguaje natural y la inteligencia artificial, junto con sus exigencias de transparencia, validez y prevención de sesgos." }
    ],
    orientation: "documentos/orientaciones/orientaciones-sesion-1.docx",
    bundle: "documentos/sesion-1/resumenes-sesion-1.zip",
    works: [
      { id: "GT 01.17", title: "Evaluaciones estandarizadas en Argentina: usos y debates. Entre la consolidación y la crítica", authors: ["Daniel Pinkasz"], institution: "FLACSO · UNGS", file: "documentos/sesion-1/gt-01-17-pinkasz.docx" },
      { id: "GT 01.01", title: "Los Reportes Escuela APRENDER. Algunas consideraciones sobre el acceso a este artefacto, los apoyos para su uso y aspectos problemáticos en el levantamiento de información sobre su uso desde el dispositivo APRENDER", authors: ["Stella Escandell"], institution: "UNSAM", file: "documentos/sesion-1/gt-01-01-escandell.docx" },
      { id: "GT 01.18", title: "Estandarizadas pero no cerradas: procesamiento de lenguaje natural y respuestas abiertas en evaluaciones educativas a gran escala", authors: ["Juan Suasnábar"], institution: "NEES/FCH/UNICEN · UNIPE", file: "documentos/sesion-1/gt-01-18-suasnabar.docx" },
      { id: "GT 01.05", title: "Las pruebas Aprender en la construcción de diagnósticos educativos provinciales: decisiones metodológicas, usos y límites de los indicadores. El caso de Tucumán (2012-2024)", authors: ["Stella Maris Más Rocha"], institution: "UNSAM · UNLu", file: "documentos/sesion-1/gt-01-05-mas-rocha.docx", pending: true },
      { id: "GT 01.13", title: "Acerca de los usos de las evaluaciones estandarizadas: discusiones a partir de un estudio regional comparado", authors: ["Nancy Montes"], institution: "FLACSO · OEI", file: "documentos/sesion-1/gt-01-13-montes.docx" }
    ]
  },
  {
    id: 2,
    slug: "sesion-2",
    label: "Sesión 2",
    date: "Jueves 1 de octubre",
    shortDate: "Jueves 1",
    time: "9:00–11:00",
    coordinator: "Nancy Montes",
    dynamic: "Un primer bloque con dos presentaciones de 10 minutos y 30 minutos de intercambio; un segundo bloque con tres presentaciones de 10 minutos y 40 minutos de intercambio.",
    blocks: [
      { label: "Bloque 1", detail: "Dos presentaciones · 30 min de intercambio", works: ["GT 01.02", "GT 01.03"] },
      { label: "Bloque 2", detail: "Tres presentaciones · 40 min de intercambio", works: ["GT 01.08", "GT 01.09", "GT 01.10"] }
    ],
    pending: [],
    axes: [
      { title: "De la medición estática y agregada a la nominalidad y la trazabilidad", text: "El pasaje hacia registros nominales de estudiantes, la revisión de la noción de abandono y los desafíos de interoperabilidad y disponibilidad pública." },
      { title: "Articulación multidimensional y territorial frente a lecturas reduccionistas", text: "La combinación de fuentes, indicadores de flujo, resultados de aprendizaje e índices de contexto para producir diagnósticos situados." },
      { title: "Sentidos políticos y éticos de la evaluación y de los datos estudiantiles", text: "Las tensiones entre control, garantía de derechos e inclusión, y el tránsito hacia sistemas orientados al cuidado de las trayectorias." }
    ],
    orientation: "documentos/orientaciones/orientaciones-sesion-2.docx",
    bundle: "documentos/sesion-2/resumenes-sesion-2.zip",
    works: [
      { id: "GT 01.02", title: "Posibilidades y limitaciones de la estadística educativa. Re-examinando los vínculos entre condición social y desempeño", authors: ["Daniel Míguez"], institution: "CONICET · UNCPBA", file: "documentos/sesion-2/gt-01-02-miguez.docx" },
      { id: "GT 01.08", title: "Los desafíos de la medición del abandono escolar: tensiones conceptuales y metodológicas en el análisis de las trayectorias educativas", authors: ["Julián Falcone", "Martín Scasso"], institution: "Quántitas", file: "documentos/sesion-2/gt-01-08-falcone-scasso.docx" },
      { id: "GT 01.09", title: "Modelo de análisis para el diseño y monitoreo de política educativa con enfoque territorial en la Ciudad de Buenos Aires. El uso del Indicador de Vulnerabilidad Social (IVS) y los resultados de las pruebas de evaluación estandarizadas", authors: ["Melina Con"], institution: "UEICEE · Ministerio de Educación de la Ciudad de Buenos Aires", file: "documentos/sesion-2/gt-01-09-con.docx" },
      { id: "GT 01.10", title: "Garantía del derecho a la educación en contextos de movilidad humana: una triple mirada desde los sistemas de datos, la evaluación de políticas sectoriales y las trayectorias de aprendizaje", authors: ["Marcela Browne"], institution: "Fundación SES", file: "documentos/sesion-2/gt-01-10-browne.docx" },
      { id: "GT 01.03", title: "Diagnóstico educativo de la provincia de San Juan: aportes para la planificación y evaluación de políticas públicas", authors: ["Julia Sánchez Cestona"], institution: "UNTREF · UNIPE", file: "documentos/sesion-2/gt-01-03-sanchez-cestona.docx" }
    ]
  },
  {
    id: 3,
    slug: "sesion-3",
    label: "Sesión 3",
    date: "Jueves 1 de octubre",
    shortDate: "Jueves 1",
    time: "11:00–13:00",
    coordinator: "Juan Suasnábar",
    dynamic: "Dos bloques temáticos. El documento fuente define la agrupación de trabajos, pero no establece minutos de exposición ni de intercambio.",
    blocks: [
      { label: "Bloque 1", detail: "Evaluaciones, aprendizajes y construcción de evidencia sobre las escuelas", works: ["GT 01.11", "GT 01.06", "GT 01.14"] },
      { label: "Bloque 2", detail: "Nuevas fuentes, registros y construcción de bases", works: ["GT 01.19", "GT 01.07"] }
    ],
    pending: [],
    axes: [
      { title: "Nuevas posibilidades para la producción y articulación de información educativa", text: "La triangulación de fuentes, la construcción de bases y las capacidades metodológicas y técnicas necesarias para procesar registros, evaluaciones, encuestas y fuentes digitales." },
      { title: "De los datos a fenómenos educativos complejos", text: "Los cambios de escala y unidad de análisis, y el estudio multidimensional de desigualdades, contextos y procesos sin explicaciones lineales." }
    ],
    orientation: "documentos/orientaciones/orientaciones-sesion-3.docx",
    bundle: "documentos/sesion-3/resumenes-sesion-3.zip",
    works: [
      { id: "GT 01.06", title: "Potencialidades de la triangulación de fuentes con base en los cuestionarios complementarios de APRENDER. Un caso ejemplo", authors: ["Iñaki Bardín", "Stella Escandell"], institution: "UBA · UNTREF · UNSAM", file: "documentos/sesion-3/gt-01-06-bardin-escandell.docx" },
      { id: "GT 01.07", title: "Políticas lingüísticas, capital lingüístico internacional y reproducción social en la educación superior argentina. Resultados del análisis del Programa de Formación y Certificación en Lenguas Extranjeras (PFCLE)", authors: ["Víctor Montoya"], institution: "UNTREF", file: "documentos/sesion-3/gt-01-07-montoya.docx" },
      { id: "GT 01.11", title: "Desigualdad de trayectorias de aprendizaje en Argentina", authors: ["Cecilia Adrogué", "Eugenia Orlicki"], institution: "Universidad Austral · UdeSA · CONICET · Argentinos por la Educación", file: "documentos/sesion-3/gt-01-11-adrogue-orlicki.docx" },
      { id: "GT 01.14", title: "¿Qué pueden aportar las evaluaciones estandarizadas al estudio de la resiliencia escolar? Evidencia a partir del ERCE 2019", authors: ["Natalia Krüger", "María Marta Formichella"], institution: "UNS · IIESS-CONICET", file: "documentos/sesion-3/gt-01-14-kruger-formichella.docx" },
      { id: "GT 01.19", title: "La investigación educativa en universidades argentinas: construcción y potencial analítico de una base de datos de artículos académicos", authors: ["Silvina Spagnolo", "Francisco Saenz"], institution: "UNS · CONICET", file: "documentos/sesion-3/gt-01-19-spagnolo-saenz.docx" }
    ]
  },
  {
    id: 4,
    slug: "sesion-4",
    label: "Sesión 4",
    date: "Jueves 1 de octubre",
    shortDate: "Jueves 1",
    time: "14:30–16:30",
    coordinator: "Delia González",
    dynamic: "Dos bloques de dos trabajos, con aproximadamente 15 minutos por grupo y 30 minutos de intercambio al cierre de cada bloque.",
    blocks: [
      { label: "Bloque 1", detail: "Dos presentaciones · 30 min de intercambio", works: ["GT 01.12", "GT 01.15"] },
      { label: "Bloque 2", detail: "Dos presentaciones · 30 min de intercambio", works: ["GT 01.20", "GT 01.16"] }
    ],
    pending: ["GT 01.04"],
    axes: [
      { title: "Desafíos de la evaluación de impacto", text: "La retroalimentación oportuna de las políticas, la complementariedad metodológica y la apropiación de resultados por quienes toman decisiones." },
      { title: "Integración de fuentes y sentido de uso de la información", text: "La integración como construcción de sentidos de uso, más allá del cruce técnico de bases, para producir herramientas situadas de intervención." },
      { title: "Escalas y temporalidades", text: "La articulación entre el seguimiento individual y las tendencias sistémicas sin despolitizar ni individualizar problemas estructurales." },
      { title: "Evaluación e interpretación pedagógica", text: "La lectura situada de resultados y las mediaciones necesarias para transformar reportes en preguntas e interpretaciones útiles." },
      { title: "Dimensión ético-política del dato público y nominalizado", text: "La responsabilidad sobre acceso, circulación y uso de información sensible, y la prevención de efectos de estigmatización." },
      { title: "Adaptabilidad de las herramientas metodológicas", text: "La revisión de métricas e indicadores frente a cambios en los regímenes académicos y las trayectorias escolares." },
      { title: "Homogeneidad de la métrica vs. heterogeneidad sistémica", text: "La equidad de las comparaciones entre escuelas con capacidades, recursos y contextos diferentes." },
      { title: "Restricciones matemáticas, sesgo contextual y evaluación de políticas", text: "Los rendimientos no lineales de la inversión, los rezagos de impacto y el riesgo de penalizar a escuelas en contextos vulnerables." }
    ],
    orientation: "documentos/orientaciones/orientaciones-sesion-4.docx",
    bundle: "documentos/sesion-4/resumenes-sesion-4.zip",
    works: [
      { id: "GT 01.20", title: "Pruebas Escolares Bonaerenses. Enseñanza y evaluación para la mejora de los aprendizajes", authors: ["Mirta Torres", "Diego Born"], institution: "DGCyE · Provincia de Buenos Aires", file: "documentos/sesion-4/gt-01-20-torres-born.docx" },
      { id: "GT 01.15", title: "Escuelas en Foco: una mirada sobre los logros de aprendizaje de los estudiantes de Nivel Primario en su segundo año de implementación", authors: ["Ivana Templado", "Lara Ailén Encinas", "Stefano Pistoia"], institution: "UEICEE · Ministerio de Educación de la Ciudad de Buenos Aires", file: "documentos/sesion-4/gt-01-15-templado-encinas-pistoia.docx" },
      { id: "GT 01.04", title: "La vida política de los datos educativos: dataficación, gobernanza y construcción democrática de evidencia en las evaluaciones estandarizadas argentinas", authors: ["Marina Inés Perl"], institution: "", file: "documentos/sesion-4/gt-01-04-perl.docx", pending: true },
      { id: "GT 01.12", title: "Entre los resultados estandarizados y los sistemas nominales: usos, tensiones y mediaciones de la información educativa para el planeamiento y la gestión de políticas", authors: ["María Gabriela Brandan Zehnder", "María José Llanos Pozzi", "Marisa Álvarez"], institution: "Ministerio de Educación de Córdoba · UCC · UPC · UNTREF", file: "documentos/sesion-4/gt-01-12-brandan-llanos-alvarez.docx" },
      { id: "GT 01.16", title: "Sistema de Medición de los Logros Educativos en Contexto. Propuesta metodológica para medir los logros educativos de los estudiantes de la CABA", authors: ["Jimena Macció", "Sonia Susini", "Flavio Guberman"], institution: "UEICEE · Ministerio de Educación de la Ciudad de Buenos Aires", file: "documentos/sesion-4/gt-01-16-maccio-susini-guberman.docx" }
    ]
  }
];

export const coordinadores = ["Nancy Montes", "Lilia Toranzos", "Delia González", "Juan Suasnábar"];
