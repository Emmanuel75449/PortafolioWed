import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  Monitor,
  Code2,
  Database,
  Cpu,
  ExternalLink,
  Play,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Terminal,
  User,
  Mail,
  Layers,
  X,
  Palette,
  Eye,
  CheckCircle2
} from 'lucide-react';

// ============================================================================
// ÍCONOS SVG NATIVOS (GITHUB Y LINKEDIN)
// ============================================================================
const GithubIcon = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LinkedinIcon = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

// ============================================================================
// 1. PERSONALIZA AQUÍ TUS DATOS DE PERFIL PARA EMPLEADORES
// ============================================================================
const DEV_PROFILE = {
  nombre: 'Emmanuel',
  titulo: 'Desarrollador Web & Software Full-Stack',
  subtitulo: 'Portafolio de Proyectos del Semestre • React • JavaScript • SQL',
  ubicacion: 'México',
  disponibilidad: 'Disponible para prácticas profesionales y proyectos Jr.',
  bio: 'Estudiante de desarrollo de software apasionado por construir interfaces web interactivas, aplicaciones conectadas a APIs reales y herramientas de gestión de bases de datos.',
  github: 'https://github.com/Emmanuel75449',
  linkedin: 'https://www.linkedin.com/',
  email: 'tu.correo@ejemplo.com',
  skills: [
    'HTML5 / CSS3',
    'JavaScript (ES6+)',
    'React & Three.js',
    'Tailwind CSS',
    'SQL & Bases de Datos',
    'Consumo de APIs REST',
    'Git & GitHub'
  ]
};

// ============================================================================
// 2. CÓDIGO REAL DE TU POKÉDEX (PARA DEMO EN VIVO EN IFRAME)
// ============================================================================
const POKEDEX_RAW_HTML = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Buscador Pokémon Sencillo</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f0f2f5;
      color: #333;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      margin: 0;
    }
    h1 { color: #e3350d; margin-bottom: 16px; }
    .buscador { display: flex; gap: 10px; margin-bottom: 18px; flex-wrap: wrap; justify-content: center; }
    input {
      padding: 10px 15px;
      font-size: 16px;
      border: 2px solid #ccc;
      border-radius: 8px;
      outline: none;
    }
    input:focus { border-color: #e3350d; }
    button {
      padding: 10px 20px;
      font-size: 16px;
      background-color: #e3350d;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
    }
    button:hover { background-color: #c22a08; }
    .tarjeta {
      background-color: white;
      border-radius: 15px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      padding: 22px;
      max-width: 550px;
      width: 92%;
      text-align: center;
      display: none;
    }
    .pokemon-principal img { width: 140px; height: 140px; }
    .nombre-id { font-size: 24px; font-weight: bold; text-transform: capitalize; margin: 8px 0; }
    .descripcion {
      background-color: #f8f9fa;
      padding: 14px;
      border-radius: 10px;
      font-style: italic;
      margin: 14px 0;
      line-height: 1.5;
    }
    .seccion-titulo {
      font-size: 17px;
      font-weight: bold;
      margin-top: 18px;
      margin-bottom: 10px;
      border-bottom: 2px solid #eee;
      padding-bottom: 5px;
    }
    .contenedor-evoluciones {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }
    .item-evolucion {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #fafafa;
      padding: 10px;
      border-radius: 10px;
      border: 1px solid #eee;
      text-transform: capitalize;
      font-size: 14px;
    }
    .item-evolucion img { width: 76px; height: 76px; }
    .flecha { font-size: 20px; font-weight: bold; color: #888; }
    .mensaje { font-weight: bold; color: #555; margin-top: 8px; }
  </style>
</head>
<body>
  <h1>Pokédex Básica</h1>
  <div class="buscador">
    <input type="text" id="inputPokemon" value="charizard" placeholder="Ej: charizard, pikachu, lucario...">
    <button id="btnBuscar">Buscar</button>
  </div>
  <div id="mensajeEstado" class="mensaje"></div>
  <div id="resultado" class="tarjeta">
    <div class="pokemon-principal">
      <img id="pokeImg" src="" alt="Imagen del Pokémon">
      <div id="pokeNombreId" class="nombre-id"></div>
    </div>
    <div class="seccion-titulo">Descripción</div>
    <div id="pokeDescripcion" class="descripcion">Generando Descripción...</div>
    <div class="seccion-titulo">Cadena Evolutiva</div>
    <div id="pokeEvoluciones" class="contenedor-evoluciones">Cargando evoluciones...</div>
    <div id="bloqueMegas" style="display: none;">
      <div class="seccion-titulo">Megaevoluciones</div>
      <div id="pokeMegas" class="contenedor-evoluciones"></div>
    </div>
  </div>
  <script>
    const inputPokemon = document.getElementById('inputPokemon');
    const btnBuscar = document.getElementById('btnBuscar');
    const mensajeEstado = document.getElementById('mensajeEstado');
    const tarjetaResultado = document.getElementById('resultado');

    btnBuscar.addEventListener('click', iniciarBusqueda);
    inputPokemon.addEventListener('keypress', function(evento) {
      if (evento.key === 'Enter') iniciarBusqueda();
    });

    async function iniciarBusqueda() {
      const nombre = inputPokemon.value.trim().toLowerCase();
      if (nombre === '') {
        mensajeEstado.textContent = 'Por favor, escribe el nombre o número de un Pokémon.';
        return;
      }
      mensajeEstado.textContent = 'Buscando Pokémon...';
      tarjetaResultado.style.display = 'none';
      document.getElementById('bloqueMegas').style.display = 'none';

      try {
        const respuestaPoke = await fetch(\`https://pokeapi.co/api/v2/pokemon/\${nombre}\`);
        if (!respuestaPoke.ok) throw new Error('Pokémon no encontrado. Revisa que esté bien escrito.');
        const datosPoke = await respuestaPoke.json();

        document.getElementById('pokeNombreId').textContent = \`#\${datosPoke.id} - \${datosPoke.name}\`;
        document.getElementById('pokeImg').src = datosPoke.sprites.front_default;

        mensajeEstado.textContent = '';
        tarjetaResultado.style.display = 'block';
        document.getElementById('pokeDescripcion').textContent = 'Buscando descripción...';
        document.getElementById('pokeEvoluciones').textContent = 'Buscando evoluciones...';

        const respuestaEspecie = await fetch(datosPoke.species.url);
        const datosEspecie = await respuestaEspecie.json();

        const entradaEspanol = datosEspecie.flavor_text_entries.find(item => item.language.name === 'es');
        if (entradaEspanol) {
          document.getElementById('pokeDescripcion').textContent = entradaEspanol.flavor_text.replace(/[\\n\\f]/g, ' ');
        } else {
          document.getElementById('pokeDescripcion').textContent = 'Descripción en español no disponible.';
        }

        const respuestaEvo = await fetch(datosEspecie.evolution_chain.url);
        const datosEvo = await respuestaEvo.json();
        await mostrarEvolucionesYMegas(datosEvo.chain);
      } catch (error) {
        mensajeEstado.textContent = error.message;
      }
    }

    async function mostrarEvolucionesYMegas(cadena) {
      const contenedorEvo = document.getElementById('pokeEvoluciones');
      const contenedorMegas = document.getElementById('pokeMegas');
      const bloqueMegas = document.getElementById('bloqueMegas');
      contenedorEvo.innerHTML = '';
      contenedorMegas.innerHTML = '';

      const listaNombresEvo = [];
      function recorrerCadena(nodo) {
        listaNombresEvo.push(nodo.species.name);
        if (nodo.evolves_to && nodo.evolves_to.length > 0) {
          nodo.evolves_to.forEach(siguiente => recorrerCadena(siguiente));
        }
      }
      recorrerCadena(cadena);

      for (let i = 0; i < listaNombresEvo.length; i++) {
        const nombreEvo = listaNombresEvo[i];
        const resEspecieEvo = await fetch(\`https://pokeapi.co/api/v2/pokemon-species/\${nombreEvo}\`);
        const dataEspecieEvo = await resEspecieEvo.json();
        const resPokeEvo = await fetch(\`https://pokeapi.co/api/v2/pokemon/\${nombreEvo}\`);
        const dataPokeEvo = await resPokeEvo.json();

        contenedorEvo.appendChild(crearTarjetaMini(dataPokeEvo.name, dataPokeEvo.sprites.front_default));

        if (i < listaNombresEvo.length - 1) {
          const flecha = document.createElement('span');
          flecha.className = 'flecha';
          flecha.textContent = '→';
          contenedorEvo.appendChild(flecha);
        }

        for (const variedad of dataEspecieEvo.varieties) {
          if (variedad.pokemon.name.includes('-mega')) {
            const resMega = await fetch(variedad.pokemon.url);
            const dataMega = await resMega.json();
            contenedorMegas.appendChild(crearTarjetaMini(dataMega.name, dataMega.sprites.front_default));
            bloqueMegas.style.display = 'block';
          }
        }
      }
    }

    function crearTarjetaMini(nombre, urlImagen) {
      const div = document.createElement('div');
      div.className = 'item-evolucion';
      const img = document.createElement('img');
      img.src = urlImagen || '';
      img.alt = nombre;
      const texto = document.createElement('span');
      texto.textContent = nombre.replace('-', ' ');
      div.appendChild(img);
      div.appendChild(texto);
      return div;
    }

    iniciarBusqueda();
  </script>
</body>
</html>`;

// ============================================================================
// 3. DATOS DE TUS PROYECTOS DEL SEMESTRE
// ============================================================================
const PROJECTS = [
  {
    id: 'hub',
    code: 'OS // HUB',
    title: 'Hub Portafolio 3D',
    shortTitle: 'Inicio OS',
    category: 'Entorno Interactivo Three.js',
    accent: '#00f5d4',
    summary:
      'Bienvenido a mi espacio de trabajo virtual. Selecciona cualquiera de los proyectos del semestre en la barra inferior o haz clic directamente en los monitores, el gabinete PC o los paneles RGB de la pared.',
    tech: ['React', 'Three.js', 'Tailwind CSS', 'WebGL Canvas'],
    highlights: [
      'Renderizado 3D procedural en tiempo real con iluminación RGB dinámica.',
      'Proyección en vivo de vistas previas y código en ambos monitores.',
      'Demos funcionales integradas para revisión técnica inmediata.'
    ],
    liveUrl: null,
    repoUrl: DEV_PROFILE.github,
    codeFile: 'Portfolio3D.jsx',
    codeLines: [
      '// Setup Gamer 3D - Portafolio del Semestre',
      'const scene = new THREE.Scene();',
      'scene.fog = new THREE.FogExp2(0x05050a, 0.045);',
      '',
      'const rgbThemes = [',
      '  { name: "Cyber", primary: "#00f5d4", secondary: "#ff007f" },',
      '  { name: "Synth", primary: "#b5179e", secondary: "#4cc9f0" },',
      '  { name: "Matrix", primary: "#00ff87", secondary: "#00b4d8" }',
      '];',
      '',
      'function updateMonitorScreen(activeProject) {',
      '  renderCanvasPreview(monitorCtx, activeProject);',
      '  monitorTexture.needsUpdate = true;',
      '}',
      '',
      '// Listo para explorar los 3 proyectos ->'
    ]
  },
  {
    id: 'pokedex',
    code: 'PROYECTO 01',
    title: 'Pokédex Básica (PokeAPI)',
    shortTitle: '01. Pokédex',
    category: 'Desarrollo Frontend & Consumo de APIs',
    accent: '#e3350d',
    summary:
      'Aplicación web interactiva conectada a PokeAPI mediante JavaScript asíncrono (fetch / async-await). Permite buscar cualquier Pokémon por nombre o número, consultar su descripción oficial en español y recorrer recursivamente su cadena evolutiva y Megaevoluciones.',
    tech: ['HTML5', 'CSS3', 'JavaScript ES6+', 'PokeAPI REST', 'Async/Await'],
    highlights: [
      'Consultas encadenadas a endpoints /pokemon, /pokemon-species y /evolution-chain.',
      'Filtrado automático de descripciones (flavor_text_entries) en idioma español.',
      'Detección dinámica de variedades "-mega" con renderizado de tarjetas.'
    ],
    liveUrl: null,
    repoUrl: DEV_PROFILE.github,
    codeFile: 'Pokedex.html',
    codeLines: [
      '// Conexión asíncrona a PokeAPI',
      'async function iniciarBusqueda() {',
      '  const nombre = inputPokemon.value.trim().toLowerCase();',
      '  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);',
      '  const datosPoke = await res.json();',
      '',
      '  const resEspecie = await fetch(datosPoke.species.url);',
      '  const datosEspecie = await resEspecie.json();',
      '  const es = datosEspecie.flavor_text_entries.find(',
      '    item => item.language.name === "es"',
      '  );',
      '',
      '  const resEvo = await fetch(datosEspecie.evolution_chain.url);',
      '  const datosEvo = await resEvo.json();',
      '  await mostrarEvolucionesYMegas(datosEvo.chain);',
      '}'
    ]
  },
  {
    id: 'paginawed',
    code: 'PROYECTO 02',
    title: 'PaginaWed — Diseño Web Responsivo',
    shortTitle: '02. PaginaWed',
    category: 'Diseño UI/UX & Maquetación Web',
    accent: '#38bdf8',
    summary:
      'Sitio web multipropósito desplegado en GitHub Pages, enfocado en estructura semántica, navegación fluida por anclas (#inicio), jerarquía visual moderna y diseño adaptable a dispositivos móviles y escritorio.',
    tech: ['HTML5 Semántico', 'CSS3 Moderno', 'Responsive Design', 'GitHub Pages'],
    highlights: [
      'Despliegue continuo en producción mediante GitHub Pages.',
      'Maquetación estructurada con Flexbox / CSS Grid y navegación por secciones.',
      'Código fuente organizado y versionado en GitHub.'
    ],
    liveUrl: 'https://emmanuel75449.github.io/PaginaWed/#inicio',
    repoUrl: 'https://github.com/Emmanuel75449/Dise-oWED',
    codeFile: 'index.html',
    codeLines: [
      '<!DOCTYPE html>',
      '<html lang="es">',
      '<head>',
      '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '  <title>PaginaWed - Diseño Web</title>',
      '  <link rel="stylesheet" href="styles.css">',
      '</head>',
      '<body>',
      '  <header class="navbar">',
      '    <nav><a href="#inicio">Inicio</a></nav>',
      '  </header>',
      '  <main id="inicio" class="hero-section">',
      '    <h1>Diseño Web Moderno & Responsivo</h1>',
      '  </main>',
      '</body>',
      '</html>'
    ]
  },
  {
    id: 'minidbeaver',
    code: 'PROYECTO 03',
    title: 'MiniDBeaver — Gestor de Bases de Datos',
    shortTitle: '03. MiniDBeaver',
    category: 'Ingeniería de Software & Bases de Datos SQL',
    accent: '#a855f7',
    summary:
      'Cliente ligero de administración de bases de datos inspirado en DBeaver. Permite explorar esquemas y tablas, redactar consultas SQL en un editor dedicado y visualizar resultados estructurados en cuadrícula.',
    tech: ['SQL', 'Gestor de BD', 'Modelado Relacional', 'UI de Escritorio / Web'],
    highlights: [
      'Explorador visual de conexiones, bases de datos y columnas.',
      'Editor de sentencias SQL (SELECT, JOIN, GROUP BY, INSERT) con resultados tabulares.',
      'Proyecto colaborativo desarrollado y versionado en GitHub.'
    ],
    liveUrl: null,
    repoUrl: 'https://github.com/alDillrock/MiniDBeaver',
    codeFile: 'consultas_semestre.sql',
    codeLines: [
      '-- MiniDBeaver: Consulta de Proyectos y Alumnos',
      'CREATE TABLE proyectos_semestre (',
      '  id INT PRIMARY KEY AUTO_INCREMENT,',
      '  nombre VARCHAR(100) NOT NULL,',
      '  tecnologia VARCHAR(80),',
      '  estado VARCHAR(30) DEFAULT "Completado"',
      ');',
      '',
      'SELECT p.id, p.nombre, p.tecnologia, p.estado',
      'FROM proyectos_semestre p',
      'WHERE p.estado = "Completado"',
      'ORDER BY p.id ASC;'
    ]
  }
];

// ============================================================================
// 4. TEMAS DE ILUMINACIÓN RGB DEL CUARTO GAMER
// ============================================================================
const RGB_THEMES = [
  { name: 'Cyber Cyan & Pink', primary: '#00f5d4', secondary: '#ff007f', ambient: '#121026' },
  { name: 'Synthwave Violet', primary: '#b5179e', secondary: '#4cc9f0', ambient: '#160d2b' },
  { name: 'Emerald Matrix', primary: '#00ff87', secondary: '#00b4d8', ambient: '#091f1c' },
  { name: 'Crimson Inferno', primary: '#ff2a55', secondary: '#ff9e00', ambient: '#240b12' },
  { name: 'Electric Royal', primary: '#9d4edd', secondary: '#3a86ff', ambient: '#11132e' }
];

// ============================================================================
// 5. DATOS SIMULADOS PARA EL SIMULADOR SQL DE MINIDBEAVER
// ============================================================================
const SQL_PRESETS = [
  {
    label: 'Ver todos los proyectos',
    query: 'SELECT id, proyecto, tecnologia, calificacion, estado FROM proyectos_semestre;',
    columns: ['id', 'proyecto', 'tecnologia', 'calificacion', 'estado'],
    rows: [
      [1, 'Pokédex Básica', 'HTML / CSS / JS + PokeAPI', '100', 'Desplegado'],
      [2, 'PaginaWed', 'HTML5 / CSS3 / GitHub Pages', '100', 'En Línea'],
      [3, 'MiniDBeaver', 'SQL / Gestión Relacional', '100', 'Completado'],
      [4, 'Portafolio 3D Gamer', 'React / Three.js / Tailwind', '100', 'Activo']
    ]
  },
  {
    label: 'Filtrar por tecnologías Web',
    query: "SELECT proyecto, tecnologia FROM proyectos_semestre WHERE tecnologia LIKE '%HTML%' OR tecnologia LIKE '%React%';",
    columns: ['proyecto', 'tecnologia'],
    rows: [
      ['Pokédex Básica', 'HTML / CSS / JS + PokeAPI'],
      ['PaginaWed', 'HTML5 / CSS3 / GitHub Pages'],
      ['Portafolio 3D Gamer', 'React / Three.js / Tailwind']
    ]
  },
  {
    label: 'Resumen por estado',
    query: 'SELECT estado, COUNT(*) AS total_proyectos FROM proyectos_semestre GROUP BY estado;',
    columns: ['estado', 'total_proyectos'],
    rows: [
      ['Desplegado', 1],
      ['En Línea', 1],
      ['Completado', 1],
      ['Activo', 1]
    ]
  }
];

// ============================================================================
// 6. GENERADORES DE TEXTURAS PARA LAS PANTALLAS 3D
// ============================================================================
function drawMainMonitorCanvas(ctx, width, height, project, theme) {
  ctx.clearRect(0, 0, width, height);

  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#090d16');
  bgGrad.addColorStop(1, '#111827');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#05080f';
  ctx.fillRect(0, 0, width, 46);
  ctx.fillStyle = '#ef4444';
  ctx.beginPath(); ctx.arc(24, 23, 7, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath(); ctx.arc(46, 23, 7, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#10b981';
  ctx.beginPath(); ctx.arc(68, 23, 7, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.roundRect(105, 10, width - 260, 26, 8);
  ctx.fill();
  ctx.fillStyle = '#94a3b8';
  ctx.font = '14px monospace';
  const urlMap = {
    hub: 'os://emmanuel-dev/portafolio-semestre-3d',
    pokedex: 'http://localhost:5173/proyectos/Pokedex.html',
    paginawed: 'https://emmanuel75449.github.io/PaginaWed/#inicio',
    minidbeaver: 'dbeaver://localhost:3306/universidad_db'
  };
  ctx.fillText(urlMap[project.id] || '', 120, 28);

  if (project.id === 'hub') {
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 46); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 46; y < height; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    ctx.fillStyle = theme.primary;
    ctx.font = 'bold 18px monospace';
    ctx.fillText('● SYSTEM READY // PORTAFOLIO DEL SEMESTRE', 60, 110);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 46px sans-serif';
    ctx.fillText(`${DEV_PROFILE.nombre.toUpperCase()} — DEV STUDIO`, 60, 168);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '22px sans-serif';
    ctx.fillText('Haz clic en un proyecto abajo para proyectarlo en las pantallas', 60, 206);

    const cards = [
      { num: '01', name: 'Pokédex Básica', sub: 'PokeAPI • Evoluciones • Megas', color: '#e3350d' },
      { num: '02', name: 'PaginaWed', sub: 'HTML5 • CSS3 • GitHub Pages', color: '#38bdf8' },
      { num: '03', name: 'MiniDBeaver', sub: 'SQL • Gestor Relacional', color: '#a855f7' }
    ];

    cards.forEach((c, idx) => {
      const cx = 60 + idx * 395;
      const cy = 250;
      const cw = 365;
      const ch = 260;

      ctx.fillStyle = '#131c2e';
      ctx.beginPath();
      ctx.roundRect(cx, cy, cw, ch, 16);
      ctx.fill();

      ctx.strokeStyle = c.color;
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = c.color;
      ctx.font = 'bold 20px monospace';
      ctx.fillText(`PROYECTO ${c.num}`, cx + 24, cy + 44);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 30px sans-serif';
      ctx.fillText(c.name, cx + 24, cy + 92);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '18px sans-serif';
      ctx.fillText(c.sub, cx + 24, cy + 130);

      ctx.fillStyle = c.color;
      ctx.beginPath();
      ctx.roundRect(cx + 24, cy + 185, 190, 42, 10);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('VISTA PREVIA LISTA', cx + 42, cy + 211);
    });
  }

  if (project.id === 'pokedex') {
    ctx.fillStyle = '#f0f2f5';
    ctx.fillRect(0, 46, width, height - 46);

    ctx.fillStyle = '#e3350d';
    ctx.font = 'bold 38px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Pokédex Básica', width / 2, 102);

    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.roundRect(width / 2 - 220, 120, 310, 42, 8); ctx.fill();
    ctx.strokeStyle = '#e3350d'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#333333'; ctx.font = '18px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('charizard', width / 2 - 204, 147);

    ctx.fillStyle = '#e3350d';
    ctx.beginPath(); ctx.roundRect(width / 2 + 102, 120, 118, 42, 8); ctx.fill();
    ctx.fillStyle = '#ffffff'; ctx.font = 'bold 18px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Buscar', width / 2 + 161, 147);

    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.roundRect(width / 2 - 340, 180, 680, 415, 16); ctx.fill();

    const orbGrad = ctx.createRadialGradient(width / 2, 245, 10, width / 2, 245, 52);
    orbGrad.addColorStop(0, '#fde047');
    orbGrad.addColorStop(0.6, '#f97316');
    orbGrad.addColorStop(1, '#dc2626');
    ctx.fillStyle = orbGrad;
    ctx.beginPath(); ctx.arc(width / 2, 245, 46, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText('#6 - Charizard', width / 2, 322);

    ctx.fillStyle = '#f8f9fa';
    ctx.beginPath(); ctx.roundRect(width / 2 - 300, 340, 600, 62, 10); ctx.fill();
    ctx.fillStyle = '#475569';
    ctx.font = 'italic 16px sans-serif';
    ctx.fillText('Escupe fuego tan caliente que funde las rocas. Causa incendios forestales sin querer.', width / 2, 376);

    ctx.fillStyle = '#334155';
    ctx.font = 'bold 17px sans-serif';
    ctx.fillText('Cadena Evolutiva & Megaevoluciones', width / 2, 432);

    const evos = ['Charmander', '→', 'Charmeleon', '→', 'Charizard', '★ Mega X/Y'];
    evos.forEach((item, i) => {
      const ex = width / 2 - 275 + i * 110;
      if (item === '→') {
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText('→', ex, 505);
      } else {
        ctx.fillStyle = item.includes('Mega') ? '#fef2f2' : '#f8fafc';
        ctx.beginPath(); ctx.roundRect(ex - 46, 452, 92, 95, 10); ctx.fill();
        ctx.strokeStyle = item.includes('Mega') ? '#e3350d' : '#e2e8f0';
        ctx.lineWidth = 2; ctx.stroke();

        ctx.fillStyle = item.includes('Mega') ? '#e3350d' : '#f97316';
        ctx.beginPath(); ctx.arc(ex, 490, 18, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 13px sans-serif';
        ctx.fillText(item, ex, 532);
      }
    });
    ctx.textAlign = 'left';
  }

  if (project.id === 'paginawed') {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 46, width, 64);
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText('PaginaWed', 60, 86);

    const navItems = ['Inicio', 'Servicios', 'Galería', 'Contacto'];
    navItems.forEach((n, i) => {
      ctx.fillStyle = i === 0 ? '#38bdf8' : '#cbd5e1';
      ctx.font = '18px sans-serif';
      ctx.fillText(n, width - 460 + i * 105, 86);
    });

    const heroGrad = ctx.createLinearGradient(60, 130, width - 60, 360);
    heroGrad.addColorStop(0, '#0284c7');
    heroGrad.addColorStop(1, '#1d4ed8');
    ctx.fillStyle = heroGrad;
    ctx.beginPath(); ctx.roundRect(60, 130, width - 120, 230, 18); ctx.fill();

    ctx.fillStyle = '#bae6fd';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('#INICIO • GITHUB PAGES DEPLOY', 100, 178);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 42px sans-serif';
    ctx.fillText('Diseño Web Moderno y Responsivo', 100, 232);

    ctx.fillStyle = '#e0f2fe';
    ctx.font = '20px sans-serif';
    ctx.fillText('Maquetación limpia, estructura semántica HTML5 y estilos CSS3 adaptables.', 100, 272);

    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.roundRect(100, 296, 185, 42, 10); ctx.fill();
    ctx.fillStyle = '#0369a1';
    ctx.font = 'bold 17px sans-serif';
    ctx.fillText('Explorar Sitio →', 124, 323);

    const cols = ['Estructura Semántica', 'Diseño Adaptable', 'Publicación Web'];
    cols.forEach((title, idx) => {
      const bx = 60 + idx * 395;
      ctx.fillStyle = '#1e293b';
      ctx.beginPath(); ctx.roundRect(bx, 385, 365, 195, 14); ctx.fill();
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath(); ctx.roundRect(bx + 24, 412, 48, 48, 10); ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText(title, bx + 24, 495);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '16px sans-serif';
      ctx.fillText('Optimizado para escritorio y móvil', bx + 24, 528);
    });
  }

  if (project.id === 'minidbeaver') {
    ctx.fillStyle = '#1e1b2e';
    ctx.fillRect(0, 46, width, 44);
    ctx.fillStyle = '#a855f7';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('🐘 MiniDBeaver SQL Client  |  ▶ Ejecutar Query (Ctrl+Enter)', 28, 74);

    ctx.fillStyle = '#13111c';
    ctx.fillRect(0, 90, 290, height - 90);
    ctx.fillStyle = '#c084fc';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('▾ universidad_db', 24, 125);
    const tables = ['  ▾ Tables', '    ▤ proyectos_semestre', '    ▤ estudiantes', '    ▤ materias', '    ▤ calificaciones'];
    tables.forEach((t, i) => {
      ctx.fillStyle = i === 1 ? '#ffffff' : '#94a3b8';
      ctx.font = '15px monospace';
      ctx.fillText(t, 24, 158 + i * 32);
    });

    ctx.fillStyle = '#0d0c14';
    ctx.fillRect(295, 90, width - 295, 210);
    ctx.fillStyle = '#c084fc';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('SELECT id, proyecto, tecnologia, estado', 320, 132);
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('FROM proyectos_semestre', 320, 164);
    ctx.fillStyle = '#34d399';
    ctx.fillText('WHERE estado = "Completado" ORDER BY id ASC;', 320, 196);

    ctx.fillStyle = '#181626';
    ctx.fillRect(295, 305, width - 295, height - 305);

    ctx.fillStyle = '#2e2647';
    ctx.fillRect(310, 320, width - 325, 42);
    ctx.fillStyle = '#e9d5ff';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('ID    | PROYECTO             | TECNOLOGIA               | ESTADO', 328, 347);

    const rows = [
      '01    | Pokédex Básica       | HTML / CSS / JS / API    | Desplegado',
      '02    | PaginaWed            | HTML5 / CSS3 / Pages     | En Línea',
      '03    | MiniDBeaver          | SQL / Gestor BD          | Completado',
      '04    | Portafolio 3D        | React / Three.js         | Activo'
    ];
    rows.forEach((r, idx) => {
      ctx.fillStyle = idx % 2 === 0 ? '#1f1c30' : '#181626';
      ctx.fillRect(310, 362 + idx * 46, width - 325, 44);
      ctx.fillStyle = '#f8fafc';
      ctx.font = '15px monospace';
      ctx.fillText(r, 328, 390 + idx * 46);
    });
  }
}

function drawVerticalCodeCanvas(ctx, width, height, project, theme, scrollOffset) {
  ctx.fillStyle = '#070a12';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#111827';
  ctx.fillRect(0, 0, width, 64);
  ctx.fillStyle = project.accent || theme.primary;
  ctx.font = 'bold 24px monospace';
  ctx.fillText(`</> ${project.codeFile}`, 28, 42);

  const lines = project.codeLines;
  const lineHeight = 44;
  ctx.font = '20px monospace';

  for (let i = 0; i < 28; i++) {
    const lineIdx = (i + scrollOffset) % lines.length;
    const text = lines[lineIdx];
    const y = 110 + i * lineHeight;

    ctx.fillStyle = '#475569';
    ctx.fillText(String(lineIdx + 1).padStart(2, '0'), 24, y);

    if (text.trim().startsWith('//') || text.trim().startsWith('--')) {
      ctx.fillStyle = '#64748b';
    } else if (
      text.includes('async') ||
      text.includes('const') ||
      text.includes('SELECT') ||
      text.includes('CREATE') ||
      text.includes('FROM') ||
      text.includes('WHERE')
    ) {
      ctx.fillStyle = theme.primary;
    } else if (text.includes('fetch') || text.includes('html') || text.includes('function')) {
      ctx.fillStyle = theme.secondary;
    } else {
      ctx.fillStyle = '#e2e8f0';
    }

    ctx.fillText(text, 74, y);
  }
}

// ============================================================================
// 7. COMPONENTE PRINCIPAL DEL PORTAFOLIO 3D
// ============================================================================
export default function App() {
  const mountRef = useRef(null);

  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [themeIndex, setThemeIndex] = useState(0);
  const [cameraPreset, setCameraPreset] = useState('overview');
  const [hoveredPart, setHoveredPart] = useState(null);
  const [openModalProject, setOpenModalProject] = useState(null);
  const [modalTab, setModalTab] = useState('preview');
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [selectedSqlIndex, setSelectedSqlIndex] = useState(0);
  const [customSqlText, setCustomSqlText] = useState(SQL_PRESETS[0].query);

  const activeProjectRef = useRef(PROJECTS[0]);
  const themeRef = useRef(RGB_THEMES[0]);
  const cameraPresetRef = useRef('overview');
  const updateScreensRef = useRef(null);
  const updateLightsRef = useRef(null);

  const currentProject = PROJECTS[activeProjectIndex];
  const currentTheme = RGB_THEMES[themeIndex];

  useEffect(() => {
    activeProjectRef.current = PROJECTS[activeProjectIndex];
    if (updateScreensRef.current) {
      updateScreensRef.current(PROJECTS[activeProjectIndex], themeRef.current);
    }
  }, [activeProjectIndex]);

  useEffect(() => {
    themeRef.current = RGB_THEMES[themeIndex];
    if (updateLightsRef.current) {
      updateLightsRef.current(RGB_THEMES[themeIndex]);
    }
    if (updateScreensRef.current) {
      updateScreensRef.current(activeProjectRef.current, RGB_THEMES[themeIndex]);
    }
  }, [themeIndex]);

  useEffect(() => {
    cameraPresetRef.current = cameraPreset;
  }, [cameraPreset]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#05050a');
    scene.fog = new THREE.FogExp2('#05050a', 0.042);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 2.55, 5.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 1.7;
    controls.maxDistance = 8.5;
    controls.maxPolarAngle = Math.PI / 2 - 0.04;
    controls.target.set(0, 1.35, -0.4);

    const handleStartOrbit = () => {
      cameraPresetRef.current = 'free';
    };
    controls.addEventListener('start', handleStartOrbit);

    // ILUMINACIÓN DEL CUARTO OSCURO + LUCES RGB
    const hemiLight = new THREE.HemisphereLight('#2a2d4a', '#09090f', 0.65);
    scene.add(hemiLight);

    const deskRgbLight = new THREE.PointLight(themeRef.current.primary, 4.2, 8);
    deskRgbLight.position.set(0, 1.4, -1.25);
    scene.add(deskRgbLight);

    const wallRgbLight = new THREE.PointLight(themeRef.current.secondary, 3.8, 9);
    wallRgbLight.position.set(-1.6, 2.7, -1.3);
    scene.add(wallRgbLight);

    const pcRgbLight = new THREE.PointLight(themeRef.current.primary, 3.0, 5);
    pcRgbLight.position.set(1.85, 1.45, -0.35);
    scene.add(pcRgbLight);

    const screenGlowLight = new THREE.PointLight('#60a5fa', 1.6, 4.5);
    screenGlowLight.position.set(0, 1.55, -0.1);
    scene.add(screenGlowLight);

    // HABITACIÓN
    const floorMat = new THREE.MeshStandardMaterial({ color: '#0c0d14', roughness: 0.75, metalness: 0.1 });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(16, 16), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    const wallMat = new THREE.MeshStandardMaterial({ color: '#10121c', roughness: 0.85 });
    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(16, 8), wallMat);
    backWall.position.set(0, 4, -1.65);
    backWall.receiveShadow = true;
    scene.add(backWall);

    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(16, 8), wallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-4.2, 4, 2);
    scene.add(leftWall);

    const windowFrame = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 2.2, 1.6),
      new THREE.MeshStandardMaterial({ color: '#090a0f' })
    );
    windowFrame.position.set(-4.14, 2.3, -0.1);
    scene.add(windowFrame);

    const windowGlass = new THREE.Mesh(
      new THREE.PlaneGeometry(1.42, 2.02),
      new THREE.MeshBasicMaterial({ color: '#172554' })
    );
    windowGlass.rotation.y = Math.PI / 2;
    windowGlass.position.set(-4.07, 2.3, -0.1);
    scene.add(windowGlass);

    // ESCRITORIO GAMER CON TIRA LED RGB
    const deskGroup = new THREE.Group();
    const deskTopMat = new THREE.MeshStandardMaterial({ color: '#14161f', roughness: 0.35, metalness: 0.25 });
    const deskTop = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.1, 1.85), deskTopMat);
    deskTop.position.set(0, 0.9, -0.45);
    deskTop.castShadow = true;
    deskTop.receiveShadow = true;
    deskGroup.add(deskTop);

    const deskLedMat = new THREE.MeshBasicMaterial({ color: themeRef.current.primary });
    const deskLedBack = new THREE.Mesh(new THREE.BoxGeometry(4.56, 0.035, 0.04), deskLedMat);
    deskLedBack.position.set(0, 0.89, -1.37);
    deskGroup.add(deskLedBack);

    const deskLedFront = new THREE.Mesh(new THREE.BoxGeometry(4.56, 0.025, 0.03), deskLedMat);
    deskLedFront.position.set(0, 0.89, 0.47);
    deskGroup.add(deskLedFront);

    const legMat = new THREE.MeshStandardMaterial({ color: '#0a0b10', metalness: 0.7, roughness: 0.3 });
    [
      [-2.1, 0.45, -1.2],
      [2.1, 0.45, -1.2],
      [-2.1, 0.45, 0.3],
      [2.1, 0.45, 0.3]
    ].forEach(([lx, ly, lz]) => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.9, 0.1), legMat);
      leg.position.set(lx, ly, lz);
      deskGroup.add(leg);
    });
    scene.add(deskGroup);

    const interactiveMeshes = [];

    // 1. MONITOR CURVO ULTRAWIDE PRINCIPAL
    const mainCanvas = document.createElement('canvas');
    mainCanvas.width = 1280;
    mainCanvas.height = 640;
    const mainCtx = mainCanvas.getContext('2d');
    drawMainMonitorCanvas(mainCtx, 1280, 640, activeProjectRef.current, themeRef.current);
    const mainTexture = new THREE.CanvasTexture(mainCanvas);
    mainTexture.colorSpace = THREE.SRGBColorSpace;

    const curveRadius = 3.2;
    const curveAngle = 0.62;
    const screenGeo = new THREE.CylinderGeometry(
      curveRadius,
      curveRadius,
      0.92,
      36,
      1,
      true,
      Math.PI - curveAngle / 2,
      curveAngle
    );
    screenGeo.scale(-1, 1, 1);

    const screenMat = new THREE.MeshBasicMaterial({ map: mainTexture });
    const mainScreenMesh = new THREE.Mesh(screenGeo, screenMat);
    mainScreenMesh.position.set(0, 1.56, 2.38);
    mainScreenMesh.userData = { partId: 'mainMonitor', label: 'Monitor Principal: Haz clic para abrir el proyecto' };
    scene.add(mainScreenMesh);
    interactiveMeshes.push(mainScreenMesh);

    const bezelGeo = new THREE.CylinderGeometry(
      curveRadius + 0.03,
      curveRadius + 0.03,
      0.98,
      36,
      1,
      true,
      Math.PI - (curveAngle + 0.03) / 2,
      curveAngle + 0.03
    );
    const bezelMesh = new THREE.Mesh(
      bezelGeo,
      new THREE.MeshStandardMaterial({ color: '#090a0f', roughness: 0.4, side: THREE.DoubleSide })
    );
    bezelMesh.position.set(0, 1.56, 2.38);
    scene.add(bezelMesh);

    const standArm = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.55, 0.1), legMat);
    standArm.position.set(0, 1.2, -0.95);
    scene.add(standArm);

    const standBase = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.03, 0.36), legMat);
    standBase.position.set(0, 0.96, -0.88);
    scene.add(standBase);

    // 2. MONITOR VERTICAL IZQUIERDO
    const sideCanvas = document.createElement('canvas');
    sideCanvas.width = 720;
    sideCanvas.height = 1280;
    const sideCtx = sideCanvas.getContext('2d');
    drawVerticalCodeCanvas(sideCtx, 720, 1280, activeProjectRef.current, themeRef.current, 0);
    const sideTexture = new THREE.CanvasTexture(sideCanvas);
    sideTexture.colorSpace = THREE.SRGBColorSpace;

    const sideGroup = new THREE.Group();
    sideGroup.position.set(-1.38, 1.58, -0.62);
    sideGroup.rotation.y = 0.42;

    const sideFrame = new THREE.Mesh(
      new THREE.BoxGeometry(0.66, 1.12, 0.05),
      new THREE.MeshStandardMaterial({ color: '#0b0d13', roughness: 0.4 })
    );
    sideGroup.add(sideFrame);

    const sideScreenMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.61, 1.06),
      new THREE.MeshBasicMaterial({ map: sideTexture })
    );
    sideScreenMesh.position.z = 0.028;
    sideScreenMesh.userData = { partId: 'sideMonitor', label: 'Monitor de Código: Ver código fuente del proyecto' };
    sideGroup.add(sideScreenMesh);
    interactiveMeshes.push(sideScreenMesh);

    const sideStand = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.65, 0.08), legMat);
    sideStand.position.set(0, -0.35, -0.05);
    sideGroup.add(sideStand);
    scene.add(sideGroup);

    // 3. GABINETE PC GAMER CON VENTILADORES RGB
    const pcGroup = new THREE.Group();
    pcGroup.position.set(1.65, 1.44, -0.52);
    pcGroup.rotation.y = -0.22;

    const pcBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.52, 0.98, 0.96),
      new THREE.MeshStandardMaterial({ color: '#0d0f17', metalness: 0.5, roughness: 0.35 })
    );
    pcBody.userData = { partId: 'pcTower', label: 'PC Gamer RTX: Inspeccionar hardware y especificaciones' };
    pcGroup.add(pcBody);
    interactiveMeshes.push(pcBody);

    const glassPanel = new THREE.Mesh(
      new THREE.PlaneGeometry(0.88, 0.88),
      new THREE.MeshPhysicalMaterial({
        color: '#93c5fd',
        transparent: true,
        opacity: 0.16,
        roughness: 0.1,
        metalness: 0.1
      })
    );
    glassPanel.rotation.y = -Math.PI / 2;
    glassPanel.position.set(-0.265, 0, 0);
    pcGroup.add(glassPanel);

    const gpuMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.08, 0.58),
      new THREE.MeshStandardMaterial({ color: '#1e293b', metalness: 0.8, roughness: 0.2 })
    );
    gpuMesh.position.set(-0.04, -0.05, 0.02);
    pcGroup.add(gpuMesh);

    const gpuStripMat = new THREE.MeshBasicMaterial({ color: themeRef.current.secondary });
    const gpuStrip = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.54), gpuStripMat);
    gpuStrip.position.set(-0.165, -0.05, 0.02);
    pcGroup.add(gpuStrip);

    const fans = [];
    const fanRingMat = new THREE.MeshBasicMaterial({ color: themeRef.current.primary });
    const fanPositions = [
      [-0.08, 0.26, 0.46],
      [-0.08, 0.0, 0.46],
      [-0.08, -0.26, 0.46],
      [-0.14, 0.24, -0.35]
    ];

    fanPositions.forEach(([fx, fy, fz]) => {
      const fanGroup = new THREE.Group();
      fanGroup.position.set(fx, fy, fz);

      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.105, 0.014, 12, 24), fanRingMat);
      fanGroup.add(ring);

      const bladesGroup = new THREE.Group();
      for (let b = 0; b < 5; b++) {
        const blade = new THREE.Mesh(
          new THREE.BoxGeometry(0.03, 0.16, 0.008),
          new THREE.MeshStandardMaterial({ color: '#334155' })
        );
        blade.rotation.z = (b * Math.PI) / 2.5;
        bladesGroup.add(blade);
      }
      fanGroup.add(bladesGroup);
      fans.push(bladesGroup);
      pcGroup.add(fanGroup);
    });
    scene.add(pcGroup);

    // 4. PANELES HEXAGONALES NANOLEAF EN LA PARED
    const wallPanelsGroup = new THREE.Group();
    wallPanelsGroup.position.set(-0.45, 2.75, -1.6);

    const hexPositions = [
      [0, 0],
      [0.42, 0.24],
      [-0.42, 0.24],
      [0, 0.48],
      [0.84, 0],
      [-0.84, 0]
    ];
    const hexMeshes = [];
    hexPositions.forEach(([hx, hy], idx) => {
      const hexMat = new THREE.MeshBasicMaterial({
        color: idx % 2 === 0 ? themeRef.current.primary : themeRef.current.secondary
      });
      const hex = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.04, 6), hexMat);
      hex.rotation.x = Math.PI / 2;
      hex.position.set(hx, hy, 0);
      hex.userData = { partId: 'wallPanels', label: 'Paneles Nanoleaf RGB: Haz clic para cambiar el color del cuarto' };
      wallPanelsGroup.add(hex);
      hexMeshes.push(hex);
      interactiveMeshes.push(hex);
    });
    scene.add(wallPanelsGroup);

    // PERIFÉRICOS DEL ESCRITORIO
    const mousepad = new THREE.Mesh(
      new THREE.BoxGeometry(1.75, 0.012, 0.62),
      new THREE.MeshStandardMaterial({ color: '#11131a', roughness: 0.9 })
    );
    mousepad.position.set(-0.1, 0.956, -0.08);
    scene.add(mousepad);

    const mousepadBorder = new THREE.Mesh(
      new THREE.BoxGeometry(1.77, 0.01, 0.64),
      deskLedMat
    );
    mousepadBorder.position.set(-0.1, 0.954, -0.08);
    scene.add(mousepadBorder);

    const keyboard = new THREE.Mesh(
      new THREE.BoxGeometry(0.76, 0.035, 0.28),
      new THREE.MeshStandardMaterial({ color: '#181a24', roughness: 0.4 })
    );
    keyboard.position.set(-0.25, 0.98, -0.06);
    scene.add(keyboard);

    const keyGlow = new THREE.Mesh(
      new THREE.BoxGeometry(0.72, 0.01, 0.24),
      gpuStripMat
    );
    keyGlow.position.set(-0.25, 0.996, -0.06);
    scene.add(keyGlow);

    const mouse = new THREE.Mesh(
      new THREE.BoxGeometry(0.13, 0.045, 0.22),
      new THREE.MeshStandardMaterial({ color: '#181a24', roughness: 0.3 })
    );
    mouse.position.set(0.45, 0.985, -0.05);
    scene.add(mouse);

    const mug = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.075, 0.18, 20),
      new THREE.MeshStandardMaterial({ color: '#e2e8f0', roughness: 0.2 })
    );
    mug.position.set(0.95, 1.04, -0.15);
    scene.add(mug);

    // PARTÍCULAS AMBIENTALES FLOTANTES
    const particleCount = 140;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = Math.random() * 4.5 + 0.3;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: themeRef.current.primary,
      size: 0.03,
      transparent: true,
      opacity: 0.65
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    updateScreensRef.current = (proj, thm) => {
      drawMainMonitorCanvas(mainCtx, 1280, 640, proj, thm);
      mainTexture.needsUpdate = true;

      drawVerticalCodeCanvas(sideCtx, 720, 1280, proj, thm, 0);
      sideTexture.needsUpdate = true;
    };

    updateLightsRef.current = (thm) => {
      deskRgbLight.color.set(thm.primary);
      wallRgbLight.color.set(thm.secondary);
      pcRgbLight.color.set(thm.primary);
      deskLedMat.color.set(thm.primary);
      fanRingMat.color.set(thm.primary);
      gpuStripMat.color.set(thm.secondary);
      particleMat.color.set(thm.primary);
      hexMeshes.forEach((h, idx) => {
        h.material.color.set(idx % 2 === 0 ? thm.primary : thm.secondary);
      });
    };

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let downPos = { x: 0, y: 0 };

    const getIntersectedPart = (clientX, clientY) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(interactiveMeshes, false);
      return hits.length > 0 ? hits[0].object.userData : null;
    };

    const onPointerMove = (e) => {
      const hit = getIntersectedPart(e.clientX, e.clientY);
      if (hit) {
        renderer.domElement.style.cursor = 'pointer';
        setHoveredPart(hit.label);
      } else {
        renderer.domElement.style.cursor = 'grab';
        setHoveredPart(null);
      }
    };

    const onPointerDown = (e) => {
      downPos = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = (e) => {
      const dist = Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y);
      if (dist > 6) return;

      const hit = getIntersectedPart(e.clientX, e.clientY);
      if (!hit) return;

      if (hit.partId === 'wallPanels') {
        setThemeIndex((prev) => (prev + 1) % RGB_THEMES.length);
      } else if (hit.partId === 'mainMonitor') {
        setCameraPreset('mainMonitor');
        if (activeProjectRef.current.id !== 'hub') {
          setModalTab('preview');
          setOpenModalProject(activeProjectRef.current);
        }
      } else if (hit.partId === 'sideMonitor') {
        setCameraPreset('sideMonitor');
        setModalTab('code');
        setOpenModalProject(activeProjectRef.current);
      } else if (hit.partId === 'pcTower') {
        setCameraPreset('pcTower');
      }
    };

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    const cameraTargets = {
      overview: { pos: new THREE.Vector3(0, 2.55, 5.4), target: new THREE.Vector3(0, 1.35, -0.4) },
      mainMonitor: { pos: new THREE.Vector3(0, 1.58, 1.25), target: new THREE.Vector3(0, 1.56, -0.75) },
      sideMonitor: { pos: new THREE.Vector3(-0.75, 1.62, 1.15), target: new THREE.Vector3(-1.38, 1.58, -0.62) },
      pcTower: { pos: new THREE.Vector3(0.85, 1.55, 1.35), target: new THREE.Vector3(1.65, 1.44, -0.52) }
    };

    let codeScrollStep = 0;
    let lastCodeTick = 0;
    let animFrameId;

    const animate = (time) => {
      animFrameId = requestAnimationFrame(animate);

      fans.forEach((fan) => {
        fan.rotation.z += 0.14;
      });

      particles.rotation.y = time * 0.00008;

      if (time - lastCodeTick > 900) {
        lastCodeTick = time;
        codeScrollStep += 1;
        drawVerticalCodeCanvas(
          sideCtx,
          720,
          1280,
          activeProjectRef.current,
          themeRef.current,
          codeScrollStep
        );
        sideTexture.needsUpdate = true;
      }

      const preset = cameraTargets[cameraPresetRef.current];
      if (preset) {
        camera.position.lerp(preset.pos, 0.06);
        controls.target.lerp(preset.target, 0.06);
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
      controls.removeEventListener('start', handleStartOrbit);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      mainTexture.dispose();
      sideTexture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleSelectProject = (index) => {
    setActiveProjectIndex(index);
    setCameraPreset(index === 0 ? 'overview' : 'mainMonitor');
  };

  const handlePrevProject = () => {
    const nextIdx = (activeProjectIndex - 1 + PROJECTS.length) % PROJECTS.length;
    handleSelectProject(nextIdx);
  };

  const handleNextProject = () => {
    const nextIdx = (activeProjectIndex + 1) % PROJECTS.length;
    handleSelectProject(nextIdx);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#05050a] text-slate-100 select-none font-sans">
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* BARRA SUPERIOR */}
      <header className="absolute top-0 left-0 right-0 z-20 flex flex-wrap items-center justify-between gap-3 px-5 py-4 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-3 bg-slate-950/80 backdrop-blur-md border border-slate-800/90 px-4 py-2.5 rounded-2xl shadow-xl">
          <div
            className="w-3 h-3 rounded-full animate-pulse"
            style={{ backgroundColor: currentTheme.primary, boxShadow: `0 0 12px ${currentTheme.primary}` }}
          />
          <div>
            <h1 className="text-sm md:text-base font-bold tracking-wide text-white leading-tight">
              {DEV_PROFILE.nombre} <span className="text-slate-400 font-normal">// Setup 3D</span>
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">{DEV_PROFILE.titulo}</p>
          </div>
          <button
            onClick={() => setShowProfileModal(true)}
            className="ml-2 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
          >
            <User className="w-3.5 h-3.5" />
            <span>Sobre mí / CV</span>
          </button>
        </div>

        <div className="pointer-events-auto flex items-center gap-2 bg-slate-950/80 backdrop-blur-md border border-slate-800/90 p-1.5 rounded-2xl shadow-xl">
          <button
            onClick={() => setCameraPreset('overview')}
            title="Vista General del Cuarto"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
              cameraPreset === 'overview'
                ? 'bg-slate-800 text-white border border-slate-600'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Cuarto</span>
          </button>

          <button
            onClick={() => setCameraPreset('mainMonitor')}
            title="Enfocar Monitor Principal"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
              cameraPreset === 'mainMonitor'
                ? 'bg-slate-800 text-white border border-slate-600'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Monitor</span>
          </button>

          <button
            onClick={() => setCameraPreset('sideMonitor')}
            title="Enfocar Monitor de Código"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
              cameraPreset === 'sideMonitor'
                ? 'bg-slate-800 text-white border border-slate-600'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Código</span>
          </button>

          <button
            onClick={() => setCameraPreset('pcTower')}
            title="Enfocar Gabinete PC RGB"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
              cameraPreset === 'pcTower'
                ? 'bg-slate-800 text-white border border-slate-600'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span className="hidden md:inline">PC</span>
          </button>

          <div className="h-5 w-px bg-slate-800 mx-0.5" />

          <button
            onClick={() => setThemeIndex((prev) => (prev + 1) % RGB_THEMES.length)}
            title="Cambiar Iluminación RGB"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 border border-slate-700 transition cursor-pointer"
          >
            <Palette className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
            <span className="hidden sm:inline">{currentTheme.name}</span>
          </button>
        </div>
      </header>

      {/* INDICADOR FLOTANTE AL PASAR EL CURSOR */}
      {hoveredPart && (
        <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 z-20 bg-slate-950/90 border border-slate-700 px-4 py-1.5 rounded-full text-xs font-medium text-cyan-300 shadow-lg backdrop-blur-md">
          {hoveredPart}
        </div>
      )}

      {/* TARJETA FLOTANTE DE INFORMACIÓN DEL PROYECTO ACTIVO */}
      {currentProject.id !== 'hub' && (
        <aside className="absolute right-5 bottom-24 z-20 w-[340px] max-w-[calc(100vw-2.5rem)] bg-slate-950/85 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 shadow-2xl transition-all">
          <div className="flex items-center justify-between mb-1.5">
            <span
              className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md"
              style={{
                backgroundColor: `${currentProject.accent}22`,
                color: currentProject.accent
              }}
            >
              {currentProject.code}
            </span>
            <span className="text-[11px] text-slate-400">{currentProject.category}</span>
          </div>

          <h2 className="text-lg font-bold text-white mb-1">{currentProject.title}</h2>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">{currentProject.summary}</p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {currentProject.tech.map((t) => (
              <span
                key={t}
                className="text-[11px] px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setModalTab('preview');
                setOpenModalProject(currentProject);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-slate-950 transition hover:opacity-90 cursor-pointer"
              style={{ backgroundColor: currentProject.accent }}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Abrir Demo Interactiva</span>
            </button>

            {currentProject.repoUrl && (
              <a
                href={currentProject.repoUrl}
                target="_blank"
                rel="noreferrer"
                title="Ver repositorio en GitHub"
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 transition"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        </aside>
      )}

      {/* DOCK INFERIOR DE NAVEGACIÓN ENTRE PROYECTOS */}
      <nav className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-slate-950/85 backdrop-blur-xl border border-slate-800/90 p-2 rounded-2xl shadow-2xl max-w-[95vw] overflow-x-auto">
        <button
          onClick={handlePrevProject}
          title="Proyecto Anterior"
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {PROJECTS.map((proj, idx) => {
          const isActive = idx === activeProjectIndex;
          return (
            <button
              key={proj.id}
              onClick={() => handleSelectProject(idx)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'bg-slate-800 text-white shadow-md border border-slate-600'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: proj.accent }}
              />
              <span>{proj.shortTitle}</span>
            </button>
          );
        })}

        <button
          onClick={handleNextProject}
          title="Siguiente Proyecto"
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </nav>

      {/* ==================================================================== */}
      {/* MODAL INTERACTIVO DEL PROYECTO (DEMO EN VIVO + CÓDIGO FUENTE)       */}
      {/* ==================================================================== */}
      {openModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
          <div className="relative w-full max-w-5xl h-[86vh] bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-slate-800 bg-slate-900/70">
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg"
                  style={{
                    backgroundColor: `${openModalProject.accent}22`,
                    color: openModalProject.accent
                  }}
                >
                  {openModalProject.code}
                </span>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-white">
                    {openModalProject.title}
                  </h3>
                  <p className="text-xs text-slate-400">{openModalProject.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setModalTab('preview')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      modalTab === 'preview'
                        ? 'bg-slate-800 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Demo en Vivo</span>
                  </button>
                  <button
                    onClick={() => setModalTab('code')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      modalTab === 'code'
                        ? 'bg-slate-800 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Código & Detalles</span>
                  </button>
                </div>

                {openModalProject.liveUrl && (
                  <a
                    href={openModalProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30 hover:bg-sky-500/30 transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Abrir Web</span>
                  </a>
                )}

                {openModalProject.repoUrl && (
                  <a
                    href={openModalProject.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">GitHub</span>
                  </a>
                )}

                <button
                  onClick={() => setOpenModalProject(null)}
                  className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto bg-slate-950">
              {modalTab === 'preview' ? (
                <>
                  {openModalProject.id === 'pokedex' && (
                    <iframe
                      title="Pokédex Básica en Vivo"
                      srcDoc={POKEDEX_RAW_HTML}
                      className="w-full h-full border-0 bg-white"
                    />
                  )}

                  {openModalProject.id === 'paginawed' && (
                    <div className="w-full h-full flex flex-col">
                      <div className="bg-sky-950/60 border-b border-sky-800/50 px-5 py-2.5 flex items-center justify-between text-xs text-sky-200">
                        <span>
                          Mostrando despliegue real desde{' '}
                          <strong>emmanuel75449.github.io/PaginaWed/#inicio</strong>
                        </span>
                        <a
                          href={openModalProject.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="underline font-semibold hover:text-white"
                        >
                          Abrir en pestaña completa ↗
                        </a>
                      </div>
                      <iframe
                        title="PaginaWed Vista Previa"
                        src={openModalProject.liveUrl}
                        className="w-full flex-1 border-0 bg-white"
                      />
                    </div>
                  )}

                  {openModalProject.id === 'minidbeaver' && (
                    <div className="w-full h-full flex flex-col md:flex-row bg-[#0d0c14] text-slate-200 font-mono text-xs">
                      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-800 p-4 bg-[#12101c]">
                        <div className="flex items-center gap-2 text-purple-400 font-bold mb-3">
                          <Database className="w-4 h-4" />
                          <span>Conexiones Activas</span>
                        </div>
                        <div className="space-y-1.5 text-slate-300">
                          <div className="text-purple-300 font-semibold">▾ universidad_db (MySQL)</div>
                          <div className="pl-3 text-slate-400">▾ Tables (4)</div>
                          <div className="pl-6 py-1 rounded bg-purple-500/15 text-purple-200">
                            ▤ proyectos_semestre
                          </div>
                          <div className="pl-6 text-slate-400">▤ estudiantes</div>
                          <div className="pl-6 text-slate-400">▤ materias</div>
                          <div className="pl-6 text-slate-400">▤ calificaciones</div>
                        </div>

                        <div className="mt-6">
                          <div className="text-[11px] uppercase tracking-wider text-slate-500 mb-2">
                            Consultas de Prueba
                          </div>
                          <div className="space-y-2">
                            {SQL_PRESETS.map((preset, idx) => (
                              <button
                                key={preset.label}
                                onClick={() => {
                                  setSelectedSqlIndex(idx);
                                  setCustomSqlText(preset.query);
                                }}
                                className={`w-full text-left p-2 rounded-lg border transition cursor-pointer ${
                                  selectedSqlIndex === idx
                                    ? 'bg-purple-500/20 border-purple-500/50 text-white'
                                    : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-white'
                                }`}
                              >
                                {preset.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col">
                        <div className="p-4 border-b border-slate-800 bg-[#09080f]">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-400">Editor SQL — Script-1.sql</span>
                            <button
                              onClick={() =>
                                setSelectedSqlIndex((prev) => (prev + 1) % SQL_PRESETS.length)
                              }
                              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-sans font-semibold cursor-pointer"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>Ejecutar Consulta</span>
                            </button>
                          </div>
                          <textarea
                            value={customSqlText}
                            onChange={(e) => setCustomSqlText(e.target.value)}
                            rows={3}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-emerald-300 focus:outline-none focus:border-purple-500"
                          />
                        </div>

                        <div className="flex-1 p-4 overflow-auto">
                          <div className="text-slate-400 mb-2">
                            Resultados ({SQL_PRESETS[selectedSqlIndex].rows.length} filas obtenidas en 12ms)
                          </div>
                          <div className="overflow-x-auto border border-slate-800 rounded-xl">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-slate-900 border-b border-slate-800 text-purple-300">
                                  {SQL_PRESETS[selectedSqlIndex].columns.map((col) => (
                                    <th key={col} className="py-2.5 px-4 font-bold">
                                      {col}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {SQL_PRESETS[selectedSqlIndex].rows.map((row, rIdx) => (
                                  <tr
                                    key={rIdx}
                                    className="border-b border-slate-800/70 hover:bg-slate-900/50"
                                  >
                                    {row.map((cell, cIdx) => (
                                      <td key={cIdx} className="py-2.5 px-4 text-slate-200">
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {openModalProject.id === 'hub' && (
                    <div className="p-8 max-w-3xl mx-auto space-y-6">
                      <h4 className="text-2xl font-bold text-white">
                        Arquitectura del Portafolio 3D
                      </h4>
                      <p className="text-slate-300 leading-relaxed">
                        {openModalProject.summary}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-6 max-w-4xl mx-auto space-y-6">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Aspectos Técnicos Destacados
                    </h4>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {openModalProject.highlights.map((item) => (
                        <div
                          key={item}
                          className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed flex gap-2.5"
                        >
                          <CheckCircle2
                            className="w-4 h-4 shrink-0 mt-0.5"
                            style={{ color: openModalProject.accent }}
                          />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-slate-400">
                        Fragmento de {openModalProject.codeFile}
                      </span>
                      <span className="text-xs text-slate-500">
                        {openModalProject.tech.join(' • ')}
                      </span>
                    </div>
                    <pre className="p-5 rounded-2xl bg-[#070a12] border border-slate-800 text-xs md:text-sm font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                      {openModalProject.id === 'pokedex'
                        ? POKEDEX_RAW_HTML
                        : openModalProject.codeLines.join('\n')}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL DE PERFIL PROFESIONAL / CONTACTO PARA EMPLEADORES              */}
      {/* ==================================================================== */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
          <div className="w-full max-w-xl bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  {DEV_PROFILE.disponibilidad}
                </span>
                <h3 className="text-2xl font-bold text-white">{DEV_PROFILE.nombre}</h3>
                <p className="text-sm text-cyan-400 font-medium">{DEV_PROFILE.titulo}</p>
              </div>
              <button
                onClick={() => setShowProfileModal(false)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">{DEV_PROFILE.bio}</p>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Stack Tecnológico</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {DEV_PROFILE.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-3">
              <a
                href={DEV_PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-white transition"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={DEV_PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/30 text-xs font-semibold text-sky-300 transition"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${DEV_PROFILE.email}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-xs font-semibold text-emerald-300 transition"
              >
                <Mail className="w-4 h-4" />
                <span>{DEV_PROFILE.email}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}