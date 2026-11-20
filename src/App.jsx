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
  CheckCircle2,
  Fan,
  Moon
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
  disponibilidad: 'Disponible si tengo tiempo',
  bio: 'Estudiante de desarrollo de software que le gusta hacer cosas de ingenieria aunque puede fallar en el intento jeje',
  github: 'https://github.com/Emmanuel75449',
  linkedin: 'https://www.linkedin.com/',
  email: 'al075449@uacam.mx',
  skills: [
    'HTML5 / CSS3',
    'JavaScript (ES6+)',
    'React & Three.js',
    'Tailwind CSS',
    'Dibujas a mano alzada'
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
      'Bienvenido a mi espacio de trabajo virtual. Selecciona cualquiera de los proyectos del semestre en la barra inferior o haz clic directamente en los botones de la pantalla de la PC, el gabinete, la ventana o los paneles RGB.',
    tech: ['React', 'Three.js', 'Tailwind CSS', 'WebGL Canvas'],
    highlights: [
      'Renderizado 3D procedural en tiempo real con iluminación RGB dinámica.',
      'Pantalla de PC interactiva con botones directos y vistas previas en vivo.',
      'Demos funcionales integradas para revisión técnica inmediata.'
    ],
    liveUrl: null,
    repoUrl: DEV_PROFILE.github,
    codeFile: 'Portfolio3D.jsx',
    codeLines: [
      '// Setup Gamer 3D - Portafolio del Semestre',
      'const scene = new THREE.Scene();',
      'scene.fog = new THREE.FogExp2(0x05050a, 0.042);',
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
      'Página web interactiva que permite buscar Pokémon por su nombre o número. Incluye información, descripciones en español y detalles sobre sus evoluciones y formas especiales.',
    tech: ['HTML5', 'CSS3', 'JavaScript ES6+', 'PokeAPI REST', 'Async/Await'],
    highlights: [
      'Búsqueda de información y evoluciones de los Pokémon mediante la conexión con PokeAPI.',
      'Obtención de descripciones de los Pokémon en español.',
      'Identificación y presentación de las diferentes formas especiales, incluidas las Megaevoluciones.'
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
      'Página web creada para reunir y presentar información de manera clara y organizada, con un diseño moderno, fácil de navegar y adaptable tanto a computadoras como a dispositivos móviles.',
    tech: ['HTML5 Semántico', 'CSS3 Moderno', 'Responsive Design', 'GitHub Pages'],
    highlights: [
      'Página publicada en internet mediante GitHub Pages.',
      'Diseño organizado para facilitar la navegación entre las diferentes secciones.',
      'Archivos y avances del proyecto organizados y guardados en GitHub.'
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
// 5. DATOS SIMULADOS PARA EL SIMULADOR SQL Y POKÉDEX EN MONITOR 3D
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

const MONITOR_POKEMON_PRESETS = [
  {
    id: 6,
    name: 'charizard',
    title: '#6 - Charizard',
    color1: '#fde047',
    color2: '#ea580c',
    desc: 'Escupe fuego tan caliente que funde las rocas. Causa incendios forestales sin querer.',
    evos: ['Charmander', '→', 'Charmeleon', '→', 'Charizard', '★ Mega X/Y']
  },
  {
    id: 25,
    name: 'pikachu',
    title: '#25 - Pikachu',
    color1: '#fef08a',
    color2: '#eab308',
    desc: 'Cuando se enfada, este Pokémon descarga la energía que almacena en el interior de las bolsas de las mejillas.',
    evos: ['Pichu', '→', 'Pikachu', '→', 'Raichu', '⚡ Gigamax']
  },
  {
    id: 448,
    name: 'lucario',
    title: '#448 - Lucario',
    color1: '#7dd3fc',
    color2: '#2563eb',
    desc: 'Puede percibir el aura de todas las cosas. Comprende el lenguaje humano y lee pensamientos.',
    evos: ['Riolu', '→', 'Lucario', '★ Mega Lucario']
  },
  {
    id: 94,
    name: 'gengar',
    title: '#94 - Gengar',
    color1: '#d8b4fe',
    color2: '#7e22ce',
    desc: 'Para quitarle la vida a su presa, se desliza en su sombra y espera su oportunidad en silencio.',
    evos: ['Gastly', '→', 'Haunter', '→', 'Gengar', '★ Mega Gengar']
  }
];

const PAGINAWED_SECTIONS = {
  Inicio: {
    tag: '#INICIO • GITHUB PAGES DEPLOY',
    headline: 'Diseño Web Moderno y Responsivo',
    sub: 'Maquetación limpia, estructura semántica HTML5 y estilos CSS3 adaptables.'
  },
  Servicios: {
    tag: '#SERVICIOS • DESARROLLO FRONTEND',
    headline: 'Interfaces Web Rápidas y Accesibles',
    sub: 'Sitios web optimizados para dispositivos móviles, tabletas y pantallas de escritorio.'
  },
  Galería: {
    tag: '#GALERÍA • COMPONENTES UI/UX',
    headline: 'Tarjetas, Grillas y Animaciones CSS',
    sub: 'Diseño visual moderno con tipografía clara, contraste y navegación intuitiva.'
  },
  Contacto: {
    tag: '#CONTACTO • REPOSITORIO GITHUB',
    headline: 'Proyecto Publicado en GitHub Pages',
    sub: 'Código fuente abierto y organizado en github.com/Emmanuel75449/Dise-oWED.'
  }
};

// ============================================================================
// 6. GENERADOR PROCEDURAL DE TEXTURAS HD PARA LA LUNA Y CIELO NOCTURNO
// ============================================================================
function createHDMoonTextures() {
  const width = 2048;
  const height = 1024;

  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = width;
  colorCanvas.height = height;
  const ctx = colorCanvas.getContext('2d');

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = width;
  bumpCanvas.height = height;
  const bCtx = bumpCanvas.getContext('2d');

  // Generador pseudoaleatorio determinista para consistencia HD
  let seed = 75449;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  // Base de regolito lunar
  const baseGrad = ctx.createLinearGradient(0, 0, 0, height);
  baseGrad.addColorStop(0, '#c6ccd6');
  baseGrad.addColorStop(0.5, '#d5dbe4');
  baseGrad.addColorStop(1, '#bcc3ce');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, width, height);

  bCtx.fillStyle = '#808080';
  bCtx.fillRect(0, 0, width, height);

  // Mares lunares (zonas oscuras características de la cara visible)
  const mariaRegions = [
    { x: 0.34, y: 0.38, rx: 190, ry: 145, rot: -0.2, alpha: 0.48 }, // Oceanus Procellarum
    { x: 0.44, y: 0.31, rx: 145, ry: 110, rot: 0.15, alpha: 0.54 }, // Mare Imbrium
    { x: 0.55, y: 0.35, rx: 110, ry: 95, rot: -0.1, alpha: 0.52 },  // Mare Serenitatis
    { x: 0.62, y: 0.44, rx: 125, ry: 105, rot: 0.25, alpha: 0.56 }, // Mare Tranquillitatis
    { x: 0.69, y: 0.49, rx: 85, ry: 75, rot: 0.1, alpha: 0.50 },    // Mare Fecunditatis
    { x: 0.75, y: 0.39, rx: 68, ry: 62, rot: -0.3, alpha: 0.55 },   // Mare Crisium
    { x: 0.46, y: 0.52, rx: 115, ry: 85, rot: 0.05, alpha: 0.46 },  // Mare Nubium
    { x: 0.38, y: 0.56, rx: 85, ry: 70, rot: -0.15, alpha: 0.44 },  // Mare Humorum
    { x: 0.53, y: 0.20, rx: 165, ry: 45, rot: 0.02, alpha: 0.42 }   // Mare Frigoris
  ];

  mariaRegions.forEach((m) => {
    const cx = m.x * width;
    const cy = m.y * height;

    // Sub-manchas orgánicas para bordes irregulares naturales
    for (let k = 0; k < 14; k++) {
      const ox = cx + (rand() - 0.5) * m.rx * 0.85;
      const oy = cy + (rand() - 0.5) * m.ry * 0.85;
      const rad = (m.rx + m.ry) * 0.32 * (0.55 + rand() * 0.7);

      const g = ctx.createRadialGradient(ox, oy, rad * 0.12, ox, oy, rad);
      g.addColorStop(0, `rgba(74, 82, 96, ${m.alpha})`);
      g.addColorStop(0.65, `rgba(92, 100, 115, ${m.alpha * 0.65})`);
      g.addColorStop(1, 'rgba(130, 138, 152, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(ox, oy, rad, 0, Math.PI * 2);
      ctx.fill();

      // Los mares son planicies ligeramente más bajas en el bump map
      const bg = bCtx.createRadialGradient(ox, oy, rad * 0.1, ox, oy, rad);
      bg.addColorStop(0, 'rgba(95, 95, 95, 0.35)');
      bg.addColorStop(1, 'rgba(128, 128, 128, 0)');
      bCtx.fillStyle = bg;
      bCtx.beginPath();
      bCtx.arc(ox, oy, rad, 0, Math.PI * 2);
      bCtx.fill();
    }
  });

  // Cráteres principales con rayos de eyección (Tycho, Copernicus, Kepler, Aristarchus)
  const rayCraters = [
    { x: 0.48, y: 0.76, r: 24, rays: 26, rayLen: 260 }, // Tycho
    { x: 0.41, y: 0.43, r: 26, rays: 22, rayLen: 185 }, // Copernicus
    { x: 0.34, y: 0.45, r: 16, rays: 16, rayLen: 120 }, // Kepler
    { x: 0.29, y: 0.33, r: 14, rays: 14, rayLen: 105 }  // Aristarchus
  ];

  rayCraters.forEach((rc) => {
    const cx = rc.x * width;
    const cy = rc.y * height;

    for (let i = 0; i < rc.rays; i++) {
      const ang = (i / rc.rays) * Math.PI * 2 + (rand() - 0.5) * 0.18;
      const len = rc.rayLen * (0.55 + rand() * 0.65);
      const ex = cx + Math.cos(ang) * len;
      const ey = cy + Math.sin(ang) * len;

      const rayGrad = ctx.createLinearGradient(cx, cy, ex, ey);
      rayGrad.addColorStop(0, 'rgba(248, 250, 255, 0.52)');
      rayGrad.addColorStop(0.45, 'rgba(235, 240, 248, 0.22)');
      rayGrad.addColorStop(1, 'rgba(235, 240, 248, 0)');

      ctx.strokeStyle = rayGrad;
      ctx.lineWidth = 1.5 + rand() * 3.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(ex, ey);
      ctx.stroke();
    }
  });

  // 420 cráteres de impacto de múltiples tamaños (color + bump map)
  for (let i = 0; i < 420; i++) {
    const cx = rand() * width;
    const cy = (0.06 + rand() * 0.88) * height;
    const tier = rand();
    const radius =
      tier > 0.94
        ? 22 + rand() * 26
        : tier > 0.72
        ? 9 + rand() * 14
        : 2.5 + rand() * 6.5;

    // Halo brillante de eyección alrededor del cráter
    const ejecta = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 1.9);
    ejecta.addColorStop(0, 'rgba(235, 240, 248, 0.26)');
    ejecta.addColorStop(1, 'rgba(235, 240, 248, 0)');
    ctx.fillStyle = ejecta;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.9, 0, Math.PI * 2);
    ctx.fill();

    // Interior del cráter con sombreado direccional
    const bowl = ctx.createRadialGradient(
      cx - radius * 0.25,
      cy - radius * 0.25,
      radius * 0.1,
      cx,
      cy,
      radius
    );
    bowl.addColorStop(0, 'rgba(110, 118, 132, 0.55)');
    bowl.addColorStop(0.78, 'rgba(155, 163, 178, 0.45)');
    bowl.addColorStop(1, 'rgba(240, 244, 250, 0.65)');
    ctx.fillStyle = bowl;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();

    // Borde elevado en el Bump Map (blanco = alto, oscuro = cuenca honda)
    const bumpBowl = bCtx.createRadialGradient(cx, cy, radius * 0.1, cx, cy, radius * 1.25);
    bumpBowl.addColorStop(0, 'rgba(40, 40, 40, 0.75)');
    bumpBowl.addColorStop(0.75, 'rgba(85, 85, 85, 0.65)');
    bumpBowl.addColorStop(0.9, 'rgba(235, 235, 235, 0.85)');
    bumpBowl.addColorStop(1, 'rgba(128, 128, 128, 0)');
    bCtx.fillStyle = bumpBowl;
    bCtx.beginPath();
    bCtx.arc(cx, cy, radius * 1.25, 0, Math.PI * 2);
    bCtx.fill();

    // Pico central para cráteres grandes
    if (radius > 16) {
      ctx.fillStyle = 'rgba(238, 242, 248, 0.7)';
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.14, 0, Math.PI * 2);
      ctx.fill();

      bCtx.fillStyle = 'rgba(225, 225, 225, 0.9)';
      bCtx.beginPath();
      bCtx.arc(cx, cy, radius * 0.15, 0, Math.PI * 2);
      bCtx.fill();
    }
  }

  // Micro-textura granular HD tileable sobre toda la superficie
  const grainCanvas = document.createElement('canvas');
  grainCanvas.width = 256;
  grainCanvas.height = 256;
  const gCtx = grainCanvas.getContext('2d');
  for (let gx = 0; gx < 256; gx += 2) {
    for (let gy = 0; gy < 256; gy += 2) {
      const v = Math.floor(105 + rand() * 55);
      gCtx.fillStyle = `rgba(${v},${v},${v + 6},0.12)`;
      gCtx.fillRect(gx, gy, 2, 2);
    }
  }
  const grainPattern = ctx.createPattern(grainCanvas, 'repeat');
  if (grainPattern) {
    ctx.fillStyle = grainPattern;
    ctx.fillRect(0, 0, width, height);
  }

  // Halo atmosférico suave de la Luna
  const glowCanvas = document.createElement('canvas');
  glowCanvas.width = 512;
  glowCanvas.height = 512;
  const glCtx = glowCanvas.getContext('2d');
  const glGrad = glCtx.createRadialGradient(256, 256, 95, 256, 256, 256);
  glGrad.addColorStop(0, 'rgba(219, 234, 254, 0.65)');
  glGrad.addColorStop(0.35, 'rgba(147, 197, 253, 0.25)');
  glGrad.addColorStop(0.7, 'rgba(59, 130, 246, 0.07)');
  glGrad.addColorStop(1, 'rgba(15, 23, 42, 0)');
  glCtx.fillStyle = glGrad;
  glCtx.fillRect(0, 0, 512, 512);

  // Cielo nocturno estrellado HD fuera de la ventana
  const skyCanvas = document.createElement('canvas');
  skyCanvas.width = 1024;
  skyCanvas.height = 1024;
  const sCtx = skyCanvas.getContext('2d');
  const skyGrad = sCtx.createLinearGradient(0, 0, 0, 1024);
  skyGrad.addColorStop(0, '#02040a');
  skyGrad.addColorStop(0.55, '#070d1f');
  skyGrad.addColorStop(1, '#0f1c3f');
  sCtx.fillStyle = skyGrad;
  sCtx.fillRect(0, 0, 1024, 1024);

  // Nebulosa sutil de Vía Láctea
  const nebGrad = sCtx.createRadialGradient(512, 420, 40, 512, 420, 460);
  nebGrad.addColorStop(0, 'rgba(56, 189, 248, 0.14)');
  nebGrad.addColorStop(0.5, 'rgba(99, 102, 241, 0.08)');
  nebGrad.addColorStop(1, 'rgba(2, 4, 10, 0)');
  sCtx.fillStyle = nebGrad;
  sCtx.fillRect(0, 0, 1024, 1024);

  // Estrellas HD
  for (let s = 0; s < 520; s++) {
    const sx = rand() * 1024;
    const sy = rand() * 920;
    const sr = rand() > 0.92 ? 1.7 + rand() * 1.3 : 0.6 + rand() * 1.0;
    const alpha = 0.35 + rand() * 0.65;
    sCtx.fillStyle =
      rand() > 0.82
        ? `rgba(186, 230, 253, ${alpha})`
        : rand() > 0.5
        ? `rgba(255, 255, 255, ${alpha})`
        : `rgba(254, 243, 199, ${alpha})`;
    sCtx.beginPath();
    sCtx.arc(sx, sy, sr, 0, Math.PI * 2);
    sCtx.fill();
  }

  const colorTexture = new THREE.CanvasTexture(colorCanvas);
  colorTexture.colorSpace = THREE.SRGBColorSpace;
  colorTexture.anisotropy = 8;

  const bumpTexture = new THREE.CanvasTexture(bumpCanvas);
  bumpTexture.anisotropy = 8;

  const glowTexture = new THREE.CanvasTexture(glowCanvas);
  glowTexture.colorSpace = THREE.SRGBColorSpace;

  const skyTexture = new THREE.CanvasTexture(skyCanvas);
  skyTexture.colorSpace = THREE.SRGBColorSpace;

  return { colorTexture, bumpTexture, glowTexture, skyTexture };
}

// ============================================================================
// 7. DEFINICIÓN DE BOTONES INTERACTIVOS DE LA PANTALLA DEL MONITOR 3D
// ============================================================================
function getMonitorButtons(projectId) {
  const buttons = [
    { id: 'win_home', x: 14, y: 12, w: 22, h: 22, label: 'Volver a Inicio OS' },
    { id: 'win_open', x: 58, y: 12, w: 22, h: 22, label: 'Abrir Vista Completa' },

    // Barra de botones inferior dentro de la pantalla de la PC
    { id: 'nav_0', x: 40, y: 582, w: 165, h: 46, label: 'Inicio OS' },
    { id: 'nav_1', x: 215, y: 582, w: 175, h: 46, label: '01. Pokédex' },
    { id: 'nav_2', x: 400, y: 582, w: 185, h: 46, label: '02. PaginaWed' },
    { id: 'nav_3', x: 595, y: 582, w: 195, h: 46, label: '03. MiniDBeaver' },
    { id: 'nav_rgb', x: 855, y: 582, w: 165, h: 46, label: 'Cambiar Luz RGB' },
    { id: 'nav_launch', x: 1030, y: 582, w: 210, h: 46, label: 'Abrir Demo en Vivo' }
  ];

  if (projectId === 'hub') {
    buttons.push(
      { id: 'hub_card_1', x: 60, y: 242, w: 365, h: 295, label: 'Abrir Proyecto 01: Pokédex' },
      { id: 'hub_card_2', x: 455, y: 242, w: 365, h: 295, label: 'Abrir Proyecto 02: PaginaWed' },
      { id: 'hub_card_3', x: 850, y: 242, w: 365, h: 295, label: 'Abrir Proyecto 03: MiniDBeaver' }
    );
  } else if (projectId === 'pokedex') {
    buttons.push(
      { id: 'poke_0', x: 190, y: 112, w: 135, h: 38, label: 'Buscar Charizard' },
      { id: 'poke_1', x: 335, y: 112, w: 135, h: 38, label: 'Buscar Pikachu' },
      { id: 'poke_2', x: 480, y: 112, w: 135, h: 38, label: 'Buscar Lucario' },
      { id: 'poke_3', x: 625, y: 112, w: 135, h: 38, label: 'Buscar Gengar' },
      { id: 'poke_live', x: 785, y: 112, w: 295, h: 38, label: 'Abrir Pokédex Interactiva Real' }
    );
  } else if (projectId === 'paginawed') {
    buttons.push(
      { id: 'web_Inicio', x: 790, y: 58, w: 95, h: 38, label: 'Sección Inicio' },
      { id: 'web_Servicios', x: 895, y: 58, w: 105, h: 38, label: 'Sección Servicios' },
      { id: 'web_Galería', x: 1010, y: 58, w: 95, h: 38, label: 'Sección Galería' },
      { id: 'web_Contacto', x: 1115, y: 58, w: 105, h: 38, label: 'Sección Contacto' },
      { id: 'web_live', x: 100, y: 288, w: 245, h: 44, label: 'Abrir Sitio Web en Vivo' }
    );
  } else if (projectId === 'minidbeaver') {
    buttons.push(
      { id: 'sql_0', x: 18, y: 315, w: 254, h: 44, label: 'Consulta: Todos los proyectos' },
      { id: 'sql_1', x: 18, y: 368, w: 254, h: 44, label: 'Consulta: Filtrar Web' },
      { id: 'sql_2', x: 18, y: 421, w: 254, h: 44, label: 'Consulta: Resumen Estado' },
      { id: 'sql_run', x: 965, y: 52, w: 285, h: 34, label: 'Ejecutar Siguiente Query SQL' },
      { id: 'sql_live', x: 18, y: 488, w: 254, h: 52, label: 'Abrir Simulador SQL Completo' }
    );
  }

  return buttons;
}

// ============================================================================
// 8. GENERADORES DE TEXTURAS PARA LAS PANTALLAS 3D
// ============================================================================
function drawMainMonitorCanvas(ctx, width, height, project, theme, subState, hoveredBtnId) {
  ctx.clearRect(0, 0, width, height);

  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#090d16');
  bgGrad.addColorStop(1, '#111827');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Barra superior tipo navegador/SO
  ctx.fillStyle = '#05080f';
  ctx.fillRect(0, 0, width, 46);

  ctx.fillStyle = hoveredBtnId === 'win_home' ? '#fca5a5' : '#ef4444';
  ctx.beginPath(); ctx.arc(24, 23, hoveredBtnId === 'win_home' ? 9 : 7, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = '#f59e0b';
  ctx.beginPath(); ctx.arc(46, 23, 7, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = hoveredBtnId === 'win_open' ? '#6ee7b7' : '#10b981';
  ctx.beginPath(); ctx.arc(68, 23, hoveredBtnId === 'win_open' ? 9 : 7, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.roundRect(105, 10, width - 360, 26, 8);
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

  ctx.fillStyle = theme.primary;
  ctx.font = 'bold 13px monospace';
  ctx.textAlign = 'right';
  ctx.fillText('● PANTALLA TÁCTIL / INTERACTIVA', width - 24, 28);
  ctx.textAlign = 'left';

  if (project.id === 'hub') {
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 46); ctx.lineTo(x, height - 68); ctx.stroke();
    }
    for (let y = 46; y < height - 68; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    ctx.fillStyle = theme.primary;
    ctx.font = 'bold 17px monospace';
    ctx.fillText('● SYSTEM READY // PORTAFOLIO DEL SEMESTRE', 60, 98);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px sans-serif';
    ctx.fillText(`${DEV_PROFILE.nombre.toUpperCase()} — DEV STUDIO`, 60, 152);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '20px sans-serif';
    ctx.fillText('Haz clic en cualquier tarjeta o usa los botones de la barra inferior de la pantalla', 60, 188);

    const cards = [
      { id: 'hub_card_1', num: '01', name: 'Pokédex Básica', sub: 'PokeAPI • Evoluciones • Megas', color: '#e3350d' },
      { id: 'hub_card_2', num: '02', name: 'PaginaWed', sub: 'HTML5 • CSS3 • GitHub Pages', color: '#38bdf8' },
      { id: 'hub_card_3', num: '03', name: 'MiniDBeaver', sub: 'SQL • Gestor Relacional', color: '#a855f7' }
    ];

    cards.forEach((c, idx) => {
      const cx = 60 + idx * 395;
      const cy = 242;
      const cw = 365;
      const ch = 295;
      const isHovered = hoveredBtnId === c.id;

      ctx.fillStyle = isHovered ? '#1b273e' : '#131c2e';
      ctx.beginPath();
      ctx.roundRect(cx, cy, cw, ch, 16);
      ctx.fill();

      ctx.strokeStyle = isHovered ? '#ffffff' : c.color;
      ctx.lineWidth = isHovered ? 4 : 3;
      ctx.stroke();

      ctx.fillStyle = c.color;
      ctx.font = 'bold 19px monospace';
      ctx.fillText(`PROYECTO ${c.num}`, cx + 24, cy + 44);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 30px sans-serif';
      ctx.fillText(c.name, cx + 24, cy + 92);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '18px sans-serif';
      ctx.fillText(c.sub, cx + 24, cy + 132);

      ctx.fillStyle = isHovered ? '#ffffff' : c.color;
      ctx.beginPath();
      ctx.roundRect(cx + 24, cy + 215, 235, 44, 10);
      ctx.fill();

      ctx.fillStyle = isHovered ? '#090d16' : '#ffffff';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('ABRIR PROYECTO →', cx + 46, cy + 243);
    });
  }

  if (project.id === 'pokedex') {
    const activePoke = MONITOR_POKEMON_PRESETS[subState.pokeIndex] || MONITOR_POKEMON_PRESETS[0];

    ctx.fillStyle = '#f0f2f5';
    ctx.fillRect(0, 46, width, height - 114);

    ctx.fillStyle = '#e3350d';
    ctx.font = 'bold 34px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Pokédex Básica — Selección Rápida en Pantalla', width / 2, 92);

    MONITOR_POKEMON_PRESETS.forEach((p, idx) => {
      const bx = 190 + idx * 145;
      const by = 112;
      const bw = 135;
      const bh = 38;
      const btnId = `poke_${idx}`;
      const selected = subState.pokeIndex === idx;
      const hovered = hoveredBtnId === btnId;

      ctx.fillStyle = selected ? '#e3350d' : hovered ? '#fee2e2' : '#ffffff';
      ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, 8); ctx.fill();
      ctx.strokeStyle = '#e3350d';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = selected ? '#ffffff' : '#1e293b';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText(p.name.toUpperCase(), bx + bw / 2, by + 24);
    });

    const liveHovered = hoveredBtnId === 'poke_live';
    ctx.fillStyle = liveHovered ? '#0f172a' : '#1e293b';
    ctx.beginPath(); ctx.roundRect(785, 112, 295, 38, 8); ctx.fill();
    ctx.strokeStyle = liveHovered ? '#38bdf8' : '#0f172a';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('▶ Abrir Pokédex Interactiva Real', 785 + 295 / 2, 136);

    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.roundRect(width / 2 - 360, 166, 720, 392, 16); ctx.fill();

    const orbGrad = ctx.createRadialGradient(width / 2, 225, 10, width / 2, 225, 48);
    orbGrad.addColorStop(0, activePoke.color1);
    orbGrad.addColorStop(1, activePoke.color2);
    ctx.fillStyle = orbGrad;
    ctx.beginPath(); ctx.arc(width / 2, 225, 42, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 25px sans-serif';
    ctx.fillText(activePoke.title, width / 2, 296);

    ctx.fillStyle = '#f8f9fa';
    ctx.beginPath(); ctx.roundRect(width / 2 - 320, 312, 640, 56, 10); ctx.fill();
    ctx.fillStyle = '#475569';
    ctx.font = 'italic 15px sans-serif';
    ctx.fillText(activePoke.desc, width / 2, 345);

    ctx.fillStyle = '#334155';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('Cadena Evolutiva & Formas Especiales', width / 2, 396);

    const startX = width / 2 - ((activePoke.evos.length - 1) * 105) / 2;
    activePoke.evos.forEach((item, i) => {
      const ex = startX + i * 105;
      if (item === '→') {
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText('→', ex, 472);
      } else {
        const isSpecial = item.includes('★') || item.includes('⚡');
        ctx.fillStyle = isSpecial ? '#fef2f2' : '#f8fafc';
        ctx.beginPath(); ctx.roundRect(ex - 48, 418, 96, 95, 10); ctx.fill();
        ctx.strokeStyle = isSpecial ? '#e3350d' : '#e2e8f0';
        ctx.lineWidth = 2; ctx.stroke();

        ctx.fillStyle = isSpecial ? '#e3350d' : activePoke.color2;
        ctx.beginPath(); ctx.arc(ex, 456, 17, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(item, ex, 498);
      }
    });
    ctx.textAlign = 'left';
  }

  if (project.id === 'paginawed') {
    const activeSecName = subState.webSection || 'Inicio';
    const secData = PAGINAWED_SECTIONS[activeSecName] || PAGINAWED_SECTIONS.Inicio;

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 46, width, 62);
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText('PaginaWed', 60, 86);

    const navItems = [
      { name: 'Inicio', x: 790, w: 95 },
      { name: 'Servicios', x: 895, w: 105 },
      { name: 'Galería', x: 1010, w: 95 },
      { name: 'Contacto', x: 1115, w: 105 }
    ];
    navItems.forEach((n) => {
      const btnId = `web_${n.name}`;
      const isSelected = activeSecName === n.name;
      const isHovered = hoveredBtnId === btnId;

      ctx.fillStyle = isSelected ? '#0284c7' : isHovered ? '#1e293b' : 'transparent';
      ctx.beginPath();
      ctx.roundRect(n.x, 58, n.w, 38, 8);
      ctx.fill();

      ctx.fillStyle = isSelected || isHovered ? '#ffffff' : '#cbd5e1';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(n.name, n.x + n.w / 2, 83);
    });
    ctx.textAlign = 'left';

    const heroGrad = ctx.createLinearGradient(60, 126, width - 60, 354);
    heroGrad.addColorStop(0, '#0284c7');
    heroGrad.addColorStop(1, '#1d4ed8');
    ctx.fillStyle = heroGrad;
    ctx.beginPath(); ctx.roundRect(60, 126, width - 120, 228, 18); ctx.fill();

    ctx.fillStyle = '#bae6fd';
    ctx.font = 'bold 16px monospace';
    ctx.fillText(secData.tag, 100, 172);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 40px sans-serif';
    ctx.fillText(secData.headline, 100, 224);

    ctx.fillStyle = '#e0f2fe';
    ctx.font = '19px sans-serif';
    ctx.fillText(secData.sub, 100, 264);

    const webLiveHovered = hoveredBtnId === 'web_live';
    ctx.fillStyle = webLiveHovered ? '#0f172a' : '#ffffff';
    ctx.beginPath(); ctx.roundRect(100, 288, 245, 44, 10); ctx.fill();
    ctx.fillStyle = webLiveHovered ? '#38bdf8' : '#0369a1';
    ctx.font = 'bold 17px sans-serif';
    ctx.fillText('Explorar Sitio en Vivo →', 120, 316);

    const cols = ['Estructura Semántica', 'Diseño Adaptable', 'Publicación Web'];
    cols.forEach((title, idx) => {
      const bx = 60 + idx * 395;
      ctx.fillStyle = '#1e293b';
      ctx.beginPath(); ctx.roundRect(bx, 376, 365, 182, 14); ctx.fill();
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath(); ctx.roundRect(bx + 24, 400, 44, 44, 10); ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 21px sans-serif';
      ctx.fillText(title, bx + 24, 480);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '15px sans-serif';
      ctx.fillText('Optimizado para escritorio y móvil', bx + 24, 512);
    });
  }

  if (project.id === 'minidbeaver') {
    const activeSql = SQL_PRESETS[subState.sqlIndex] || SQL_PRESETS[0];

    ctx.fillStyle = '#1e1b2e';
    ctx.fillRect(0, 46, width, 46);
    ctx.fillStyle = '#a855f7';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('🐘 MiniDBeaver SQL Client  |  universidad_db (MySQL)', 28, 75);

    const runHovered = hoveredBtnId === 'sql_run';
    ctx.fillStyle = runHovered ? '#9333ea' : '#7e22ce';
    ctx.beginPath(); ctx.roundRect(965, 52, 285, 34, 8); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('▶ Ejecutar Siguiente Query SQL', 965 + 285 / 2, 74);
    ctx.textAlign = 'left';

    ctx.fillStyle = '#13111c';
    ctx.fillRect(0, 92, 290, height - 160);
    ctx.fillStyle = '#c084fc';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('▾ universidad_db', 22, 124);
    const tables = ['  ▾ Tables', '    ▤ proyectos_semestre', '    ▤ estudiantes', '    ▤ materias'];
    tables.forEach((t, i) => {
      ctx.fillStyle = i === 1 ? '#ffffff' : '#94a3b8';
      ctx.font = '14px monospace';
      ctx.fillText(t, 22, 154 + i * 28);
    });

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('CONSULTAS RÁPIDAS:', 22, 298);

    SQL_PRESETS.forEach((preset, idx) => {
      const by = 315 + idx * 53;
      const btnId = `sql_${idx}`;
      const selected = subState.sqlIndex === idx;
      const hovered = hoveredBtnId === btnId;

      ctx.fillStyle = selected ? '#4c1d95' : hovered ? '#2e1065' : '#1e1b2e';
      ctx.beginPath(); ctx.roundRect(18, by, 254, 44, 8); ctx.fill();
      ctx.strokeStyle = selected || hovered ? '#c084fc' : '#312e81';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText(preset.label, 30, by + 27);
    });

    const sqlLiveHovered = hoveredBtnId === 'sql_live';
    ctx.fillStyle = sqlLiveHovered ? '#a855f7' : '#3b0764';
    ctx.beginPath(); ctx.roundRect(18, 488, 254, 52, 10); ctx.fill();
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Abrir Editor SQL Completo ↗', 18 + 254 / 2, 519);
    ctx.textAlign = 'left';

    ctx.fillStyle = '#0d0c14';
    ctx.fillRect(295, 92, width - 295, 165);
    ctx.fillStyle = '#64748b';
    ctx.font = '13px monospace';
    ctx.fillText('-- Haz clic en una consulta o en "Ejecutar Siguiente Query SQL"', 320, 122);

    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 16px monospace';
    const q = activeSql.query;
    ctx.fillText(q.slice(0, 68), 320, 160);
    if (q.length > 68) {
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(q.slice(68), 320, 190);
    }

    ctx.fillStyle = '#181626';
    ctx.fillRect(295, 260, width - 295, height - 328);

    ctx.fillStyle = '#2e2647';
    ctx.fillRect(310, 274, width - 325, 40);
    ctx.fillStyle = '#e9d5ff';
    ctx.font = 'bold 15px monospace';
    ctx.fillText(activeSql.columns.map((c) => c.toUpperCase().padEnd(18, ' ')).join(' | '), 324, 300);

    activeSql.rows.forEach((row, idx) => {
      ctx.fillStyle = idx % 2 === 0 ? '#1f1c30' : '#181626';
      ctx.fillRect(310, 314 + idx * 46, width - 325, 44);
      ctx.fillStyle = '#f8fafc';
      ctx.font = '14px monospace';
      const formattedRow = row.map((cell) => String(cell).slice(0, 17).padEnd(18, ' ')).join(' | ');
      ctx.fillText(formattedRow, 324, 342 + idx * 46);
    });
  }

  // Barra de botones inferior dentro de la pantalla de la PC
  ctx.fillStyle = 'rgba(5, 8, 17, 0.96)';
  ctx.fillRect(0, 572, width, 68);
  ctx.strokeStyle = theme.primary;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 572);
  ctx.lineTo(width, 572);
  ctx.stroke();

  const dockButtons = [
    { id: 'nav_0', x: 40, w: 165, label: 'Inicio OS', accent: '#00f5d4', active: project.id === 'hub' },
    { id: 'nav_1', x: 215, w: 175, label: '01. Pokédex', accent: '#e3350d', active: project.id === 'pokedex' },
    { id: 'nav_2', x: 400, w: 185, label: '02. PaginaWed', accent: '#38bdf8', active: project.id === 'paginawed' },
    { id: 'nav_3', x: 595, w: 195, label: '03. MiniDBeaver', accent: '#a855f7', active: project.id === 'minidbeaver' },
    { id: 'nav_rgb', x: 855, w: 165, label: '🎨 Luz RGB', accent: theme.secondary, active: false },
    { id: 'nav_launch', x: 1030, w: 210, label: '▶ Abrir Demo', accent: theme.primary, active: false }
  ];

  dockButtons.forEach((btn) => {
    const isHovered = hoveredBtnId === btn.id;
    const by = 582;
    const bh = 46;

    ctx.fillStyle = btn.active
      ? '#1e293b'
      : isHovered
      ? '#1e293b'
      : btn.id === 'nav_launch'
      ? `${theme.primary}28`
      : '#0f172a';
    ctx.beginPath();
    ctx.roundRect(btn.x, by, btn.w, bh, 11);
    ctx.fill();

    ctx.strokeStyle = isHovered ? '#ffffff' : btn.active ? btn.accent : '#334155';
    ctx.lineWidth = isHovered || btn.active ? 2.5 : 1.5;
    ctx.stroke();

    ctx.fillStyle = btn.accent;
    ctx.beginPath();
    ctx.arc(btn.x + 18, by + bh / 2, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = btn.active || isHovered ? '#ffffff' : '#cbd5e1';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(btn.label, btn.x + 32, by + 29);
  });
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

  for (let i = 0; i < 26; i++) {
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

  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.roundRect(28, height - 74, width - 56, 50, 12);
  ctx.fill();
  ctx.strokeStyle = project.accent || theme.primary;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('CLIC PARA INSPECCIONAR CÓDIGO', width / 2, height - 42);
  ctx.textAlign = 'left';
}

// ============================================================================
// 9. COMPONENTE PRINCIPAL DEL PORTAFOLIO 3D
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
  const [pcTurboMode, setPcTurboMode] = useState(false);

  const [selectedSqlIndex, setSelectedSqlIndex] = useState(0);
  const [customSqlText, setCustomSqlText] = useState(SQL_PRESETS[0].query);

  const activeProjectRef = useRef(PROJECTS[0]);
  const themeRef = useRef(RGB_THEMES[0]);
  const cameraPresetRef = useRef('overview');
  const pcTurboRef = useRef(false);
  const hoveredMonitorBtnRef = useRef(null);
  const monitorSubStateRef = useRef({
    pokeIndex: 0,
    webSection: 'Inicio',
    sqlIndex: 0
  });

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
    pcTurboRef.current = pcTurboMode;
    if (updateLightsRef.current) {
      updateLightsRef.current(themeRef.current);
    }
  }, [pcTurboMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#05050a');
    scene.fog = new THREE.FogExp2('#05050a', 0.036);

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
    renderer.toneMappingExposure = 1.18;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 1.55;
    controls.maxDistance = 8.5;
    controls.maxPolarAngle = Math.PI / 2 - 0.04;
    controls.target.set(0, 1.35, -0.4);

    const handleStartOrbit = () => {
      cameraPresetRef.current = 'free';
    };
    controls.addEventListener('start', handleStartOrbit);

    // ILUMINACIÓN DEL CUARTO OSCURO + LUCES RGB + LUZ DE LUNA
    const hemiLight = new THREE.HemisphereLight('#2a2d4a', '#09090f', 0.65);
    scene.add(hemiLight);

    const deskRgbLight = new THREE.PointLight(themeRef.current.primary, 4.2, 8);
    deskRgbLight.position.set(0, 1.4, -1.25);
    scene.add(deskRgbLight);

    const wallRgbLight = new THREE.PointLight(themeRef.current.secondary, 3.8, 9);
    wallRgbLight.position.set(-1.6, 2.7, -1.3);
    scene.add(wallRgbLight);

    const pcInteriorLight = new THREE.PointLight(themeRef.current.primary, 5.2, 3.6);
    pcInteriorLight.position.set(1.62, 1.48, -0.48);
    scene.add(pcInteriorLight);

    const pcFrontLight = new THREE.PointLight(themeRef.current.secondary, 3.8, 3.5);
    pcFrontLight.position.set(1.52, 1.44, 0.08);
    scene.add(pcFrontLight);

    const screenGlowLight = new THREE.PointLight('#60a5fa', 1.6, 4.5);
    screenGlowLight.position.set(0, 1.55, -0.1);
    scene.add(screenGlowLight);

    // Luz plateada de la Luna entrando por la ventana
    const moonBeamLight = new THREE.DirectionalLight('#bae6fd', 1.25);
    moonBeamLight.position.set(-5.55, 2.8, -1.65);
    moonBeamLight.target.position.set(-0.5, 1.0, -0.2);
    scene.add(moonBeamLight);
    scene.add(moonBeamLight.target);

    const moonLocalLight = new THREE.PointLight('#dbeafe', 2.4, 5.5);
    moonLocalLight.position.set(-4.8, 2.45, -1.1);
    scene.add(moonLocalLight);

    // HABITACIÓN (CON ABERTURA REAL EN LA PARED IZQUIERDA PARA LA VENTANA)
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

    // Muro izquierdo dividido alrededor del hueco de la ventana (y: 1.25..3.45, z: -1.20..0.80)
    const leftWallBottom = new THREE.Mesh(new THREE.PlaneGeometry(16, 1.25), wallMat);
    leftWallBottom.rotation.y = Math.PI / 2;
    leftWallBottom.position.set(-4.2, 0.625, 2);
    scene.add(leftWallBottom);

    const leftWallTop = new THREE.Mesh(new THREE.PlaneGeometry(16, 4.55), wallMat);
    leftWallTop.rotation.y = Math.PI / 2;
    leftWallTop.position.set(-4.2, 5.725, 2);
    scene.add(leftWallTop);

    const leftWallBack = new THREE.Mesh(new THREE.PlaneGeometry(4.8, 2.2), wallMat);
    leftWallBack.rotation.y = Math.PI / 2;
    leftWallBack.position.set(-4.2, 2.35, -3.6);
    scene.add(leftWallBack);

    const leftWallFront = new THREE.Mesh(new THREE.PlaneGeometry(9.2, 2.2), wallMat);
    leftWallFront.rotation.y = Math.PI / 2;
    leftWallFront.position.set(-4.2, 2.35, 5.4);
    scene.add(leftWallFront);

    // ========================================================================
    // VENTANA PANORÁMICA + LUNA 3D EN HD + CIELO NOCTURNO ESTRELLADO
    // ========================================================================
    const interactiveMeshes = [];
    const {
      colorTexture: moonColorTex,
      bumpTexture: moonBumpTex,
      glowTexture: moonGlowTex,
      skyTexture: nightSkyTex
    } = createHDMoonTextures();

    const windowGroup = new THREE.Group();
    const frameMat = new THREE.MeshStandardMaterial({ color: '#090b12', metalness: 0.6, roughness: 0.35 });

    // Marco exterior de la ventana
    const frameTop = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.08, 2.08), frameMat);
    frameTop.position.set(-4.2, 3.45, -0.2);
    windowGroup.add(frameTop);

    const frameBottom = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.08, 2.14), frameMat);
    frameBottom.position.set(-4.18, 1.25, -0.2);
    windowGroup.add(frameBottom);

    const frameLeft = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.24, 0.08), frameMat);
    frameLeft.position.set(-4.2, 2.35, -1.2);
    windowGroup.add(frameLeft);

    const frameRight = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.24, 0.08), frameMat);
    frameRight.position.set(-4.2, 2.35, 0.8);
    windowGroup.add(frameRight);

    // Divisor vertical sutil a la derecha para no tapar la Luna
    const mullion = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.16, 0.035), frameMat);
    mullion.position.set(-4.2, 2.35, 0.22);
    windowGroup.add(mullion);

    // Cristal de ventana con ligero reflejo azulado e interactividad
    const windowGlass = new THREE.Mesh(
      new THREE.PlaneGeometry(1.96, 2.14),
      new THREE.MeshPhysicalMaterial({
        color: '#bae6fd',
        transparent: true,
        opacity: 0.07,
        roughness: 0.05,
        metalness: 0.1
      })
    );
    windowGlass.rotation.y = Math.PI / 2;
    windowGlass.position.set(-4.19, 2.35, -0.2);
    windowGlass.userData = {
      partId: 'windowMoon',
      label: 'Ventana Nocturna: Clic para admirar la Luna en HD'
    };
    windowGroup.add(windowGlass);
    interactiveMeshes.push(windowGlass);

    // Fondo estrellado nocturno detrás de la ventana (cerrado para evitar huecos)
    const skyBackdrop = new THREE.Mesh(
      new THREE.PlaneGeometry(9.5, 6.2),
      new THREE.MeshBasicMaterial({ map: nightSkyTex, fog: false })
    );
    skyBackdrop.rotation.y = Math.PI / 2;
    skyBackdrop.position.set(-6.9, 2.6, -0.6);
    windowGroup.add(skyBackdrop);

    const skySideNorth = new THREE.Mesh(
      new THREE.PlaneGeometry(3.2, 6.2),
      new THREE.MeshBasicMaterial({ color: '#040814', fog: false })
    );
    skySideNorth.position.set(-5.5, 2.6, -4.6);
    windowGroup.add(skySideNorth);

    const skySideSouth = new THREE.Mesh(
      new THREE.PlaneGeometry(3.2, 6.2),
      new THREE.MeshBasicMaterial({ color: '#040814', fog: false })
    );
    skySideSouth.rotation.y = Math.PI;
    skySideSouth.position.set(-5.5, 2.6, 3.2);
    windowGroup.add(skySideSouth);

    // LUNA 3D EN HD (alineada directamente en la línea de visión de la ventana)
    const moonMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.58, 64, 64),
      new THREE.MeshStandardMaterial({
        map: moonColorTex,
        bumpMap: moonBumpTex,
        bumpScale: 0.022,
        roughness: 0.88,
        metalness: 0.02,
        emissive: new THREE.Color('#dbeafe'),
        emissiveMap: moonColorTex,
        emissiveIntensity: 0.62,
        fog: false
      })
    );
    moonMesh.position.set(-5.55, 2.46, -1.62);
    moonMesh.rotation.y = 0.68;
    moonMesh.userData = {
      partId: 'windowMoon',
      label: 'Luna HD: Clic para enfocar de cerca'
    };
    windowGroup.add(moonMesh);
    interactiveMeshes.push(moonMesh);

    // Halo luminoso alrededor de la Luna
    const moonHalo = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: moonGlowTex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        opacity: 0.85,
        depthWrite: false,
        fog: false
      })
    );
    moonHalo.position.set(-5.68, 2.46, -1.66);
    moonHalo.scale.set(2.45, 2.45, 1);
    windowGroup.add(moonHalo);

    // Nubes nocturnas suaves pasando cerca de la parte baja de la Luna
    const cloudsGroup = new THREE.Group();
    const cloudMat = new THREE.MeshBasicMaterial({
      color: '#1e3a8a',
      transparent: true,
      opacity: 0.16,
      fog: false
    });
    [
      { y: 1.88, z: -1.35, w: 1.4, h: 0.14 },
      { y: 2.02, z: -1.85, w: 1.7, h: 0.12 },
      { y: 1.76, z: -0.95, w: 1.5, h: 0.16 }
    ].forEach((c) => {
      const cloud = new THREE.Mesh(new THREE.PlaneGeometry(c.w, c.h), cloudMat);
      cloud.rotation.y = Math.PI / 2;
      cloud.position.set(-4.85, c.y, c.z);
      cloudsGroup.add(cloud);
    });
    windowGroup.add(cloudsGroup);

    scene.add(windowGroup);

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

    // 1. MONITOR CURVO ULTRAWIDE PRINCIPAL (INTERACTIVO POR UV)
    const mainCanvas = document.createElement('canvas');
    mainCanvas.width = 1280;
    mainCanvas.height = 640;
    const mainCtx = mainCanvas.getContext('2d');
    drawMainMonitorCanvas(
      mainCtx,
      1280,
      640,
      activeProjectRef.current,
      themeRef.current,
      monitorSubStateRef.current,
      null
    );
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
    mainScreenMesh.userData = { partId: 'mainMonitor', label: 'Pantalla PC: Haz clic en los botones del monitor' };
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
    sideScreenMesh.userData = { partId: 'sideMonitor', label: 'Monitor de Código: Ver código fuente completo' };
    sideGroup.add(sideScreenMesh);
    interactiveMeshes.push(sideScreenMesh);

    const sideStand = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.65, 0.08), legMat);
    sideStand.position.set(0, -0.35, -0.05);
    sideGroup.add(sideStand);
    scene.add(sideGroup);

    // 3. GABINETE PC GAMER HUECO CON CRISTAL TEMPLADO, VENTILADORES RGB Y LUCES
    const pcGroup = new THREE.Group();
    pcGroup.position.set(1.65, 1.44, -0.52);
    pcGroup.rotation.y = -0.24;

    const chassisMat = new THREE.MeshStandardMaterial({
      color: '#0d1018',
      metalness: 0.65,
      roughness: 0.3
    });

    const pcHitbox = new THREE.Mesh(
      new THREE.BoxGeometry(0.56, 1.0, 1.0),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    pcHitbox.userData = {
      partId: 'pcTower',
      label: 'PC Gamer RGB: Clic para enfocar o activar Turbo Ventiladores'
    };
    pcGroup.add(pcHitbox);
    interactiveMeshes.push(pcHitbox);

    const psuShroud = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.2, 0.96), chassisMat);
    psuShroud.position.set(0, -0.39, 0);
    pcGroup.add(psuShroud);

    const topPanel = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.06, 0.96), chassisMat);
    topPanel.position.set(0, 0.46, 0);
    pcGroup.add(topPanel);

    const backPanel = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.98, 0.05), chassisMat);
    backPanel.position.set(0, 0, -0.455);
    pcGroup.add(backPanel);

    const rightPanel = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.98, 0.96), chassisMat);
    rightPanel.position.set(0.24, 0, 0);
    pcGroup.add(rightPanel);

    [
      [-0.24, 0.46],
      [0.24, 0.46],
      [-0.24, -0.46]
    ].forEach(([px, pz]) => {
      const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.98, 0.04), chassisMat);
      pillar.position.set(px, 0, pz);
      pcGroup.add(pillar);
    });

    const pcLedPrimaryMat = new THREE.MeshBasicMaterial({ color: themeRef.current.primary });
    const pcLedSecondaryMat = new THREE.MeshBasicMaterial({ color: themeRef.current.secondary });

    const topLedStrip = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.86), pcLedPrimaryMat);
    topLedStrip.position.set(-0.22, 0.42, 0);
    pcGroup.add(topLedStrip);

    const psuLedStrip = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.86), pcLedSecondaryMat);
    psuLedStrip.position.set(-0.255, -0.28, 0);
    pcGroup.add(psuLedStrip);

    const frontLedLeft = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.9, 0.015), pcLedPrimaryMat);
    frontLedLeft.position.set(-0.25, 0, 0.482);
    pcGroup.add(frontLedLeft);

    const frontLedRight = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.9, 0.015), pcLedSecondaryMat);
    frontLedRight.position.set(0.25, 0, 0.482);
    pcGroup.add(frontLedRight);

    const mobo = new THREE.Mesh(
      new THREE.BoxGeometry(0.03, 0.62, 0.56),
      new THREE.MeshStandardMaterial({ color: '#111827', metalness: 0.4, roughness: 0.5 })
    );
    mobo.position.set(0.20, 0.06, -0.08);
    pcGroup.add(mobo);

    const cpuPump = new THREE.Mesh(
      new THREE.CylinderGeometry(0.065, 0.065, 0.05, 24),
      new THREE.MeshStandardMaterial({ color: '#090d16', metalness: 0.7, roughness: 0.2 })
    );
    cpuPump.rotation.z = Math.PI / 2;
    cpuPump.position.set(0.16, 0.16, -0.06);
    pcGroup.add(cpuPump);

    const cpuPumpRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.052, 0.01, 12, 24),
      pcLedSecondaryMat
    );
    cpuPumpRing.rotation.y = Math.PI / 2;
    cpuPumpRing.position.set(0.132, 0.16, -0.06);
    pcGroup.add(cpuPumpRing);

    [-0.17, -0.21].forEach((rz, idx) => {
      const ram = new THREE.Mesh(
        new THREE.BoxGeometry(0.035, 0.22, 0.014),
        idx === 0 ? pcLedPrimaryMat : pcLedSecondaryMat
      );
      ram.position.set(0.165, 0.17, rz);
      pcGroup.add(ram);
    });

    const gpuMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.26, 0.075, 0.62),
      new THREE.MeshStandardMaterial({ color: '#1e293b', metalness: 0.8, roughness: 0.2 })
    );
    gpuMesh.position.set(0.05, -0.08, 0.02);
    pcGroup.add(gpuMesh);

    const gpuStrip = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.022, 0.58), pcLedSecondaryMat);
    gpuStrip.position.set(-0.082, -0.08, 0.02);
    pcGroup.add(gpuStrip);

    const fans = [];
    const bladeMat = new THREE.MeshStandardMaterial({
      color: '#cbd5e1',
      emissive: themeRef.current.primary,
      emissiveIntensity: 0.35,
      roughness: 0.25,
      metalness: 0.2
    });

    function createRgbFan(radius = 0.105) {
      const fanUnit = new THREE.Group();

      const outerHousing = new THREE.Mesh(
        new THREE.TorusGeometry(radius + 0.012, 0.012, 10, 28),
        new THREE.MeshStandardMaterial({ color: '#090b10', roughness: 0.4 })
      );
      fanUnit.add(outerHousing);

      const outerRing = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.013, 14, 32),
        pcLedPrimaryMat
      );
      fanUnit.add(outerRing);

      const innerRing = new THREE.Mesh(
        new THREE.TorusGeometry(radius * 0.36, 0.008, 12, 24),
        pcLedSecondaryMat
      );
      fanUnit.add(innerRing);

      const rotor = new THREE.Group();
      const hub = new THREE.Mesh(
        new THREE.CylinderGeometry(radius * 0.3, radius * 0.3, 0.024, 20),
        new THREE.MeshStandardMaterial({ color: '#0f172a', metalness: 0.6 })
      );
      hub.rotation.x = Math.PI / 2;
      rotor.add(hub);

      const bladeCount = 7;
      for (let b = 0; b < bladeCount; b++) {
        const angle = (b * Math.PI * 2) / bladeCount;
        const bladeHolder = new THREE.Group();
        bladeHolder.rotation.z = angle;

        const blade = new THREE.Mesh(
          new THREE.BoxGeometry(radius * 0.32, radius * 0.68, 0.006),
          bladeMat
        );
        blade.position.y = radius * 0.56;
        blade.rotation.y = 0.42;
        bladeHolder.add(blade);
        rotor.add(bladeHolder);
      }

      fanUnit.add(rotor);
      fans.push(rotor);
      return fanUnit;
    }

    [0.28, 0.02, -0.24].forEach((fy) => {
      const frontFan = createRgbFan(0.112);
      frontFan.position.set(0, fy, 0.435);
      pcGroup.add(frontFan);
    });

    [0.12, -0.18].forEach((fz) => {
      const topFan = createRgbFan(0.105);
      topFan.rotation.x = Math.PI / 2;
      topFan.position.set(-0.02, 0.405, fz);
      pcGroup.add(topFan);
    });

    const rearFan = createRgbFan(0.105);
    rearFan.position.set(-0.02, 0.25, -0.415);
    pcGroup.add(rearFan);

    [0.15, -0.11].forEach((gz) => {
      const gpuFan = createRgbFan(0.082);
      gpuFan.rotation.x = Math.PI / 2;
      gpuFan.position.set(0.04, -0.125, gz);
      pcGroup.add(gpuFan);
    });

    const sideGlassPanel = new THREE.Mesh(
      new THREE.PlaneGeometry(0.88, 0.72),
      new THREE.MeshPhysicalMaterial({
        color: '#bae6fd',
        transparent: true,
        opacity: 0.11,
        roughness: 0.08,
        metalness: 0.1
      })
    );
    sideGlassPanel.rotation.y = -Math.PI / 2;
    sideGlassPanel.position.set(-0.258, 0.08, 0);
    pcGroup.add(sideGlassPanel);

    const frontGlassPanel = new THREE.Mesh(
      new THREE.PlaneGeometry(0.45, 0.88),
      new THREE.MeshPhysicalMaterial({
        color: '#bae6fd',
        transparent: true,
        opacity: 0.14,
        roughness: 0.08,
        metalness: 0.1
      })
    );
    frontGlassPanel.position.set(0, 0.02, 0.478);
    pcGroup.add(frontGlassPanel);

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
      pcLedSecondaryMat
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

    // ACTUALIZADORES DE PANTALLAS Y LUCES
    updateScreensRef.current = (proj, thm) => {
      drawMainMonitorCanvas(
        mainCtx,
        1280,
        640,
        proj,
        thm,
        monitorSubStateRef.current,
        hoveredMonitorBtnRef.current
      );
      mainTexture.needsUpdate = true;

      drawVerticalCodeCanvas(sideCtx, 720, 1280, proj, thm, 0);
      sideTexture.needsUpdate = true;
    };

    updateLightsRef.current = (thm) => {
      const turboBoost = pcTurboRef.current ? 1.55 : 1.0;
      deskRgbLight.color.set(thm.primary);
      wallRgbLight.color.set(thm.secondary);
      pcInteriorLight.color.set(thm.primary);
      pcInteriorLight.intensity = 5.2 * turboBoost;
      pcFrontLight.color.set(thm.secondary);
      pcFrontLight.intensity = 3.8 * turboBoost;

      deskLedMat.color.set(thm.primary);
      pcLedPrimaryMat.color.set(thm.primary);
      pcLedSecondaryMat.color.set(thm.secondary);
      bladeMat.emissive.set(thm.primary);
      bladeMat.emissiveIntensity = pcTurboRef.current ? 0.65 : 0.35;
      particleMat.color.set(thm.primary);

      hexMeshes.forEach((h, idx) => {
        h.material.color.set(idx % 2 === 0 ? thm.primary : thm.secondary);
      });
    };

    // RAYCASTING + DETECCIÓN DE BOTONES EN LA PANTALLA DE LA PC
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let downPos = { x: 0, y: 0 };

    const getHitDetails = (clientX, clientY) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(interactiveMeshes, false);
      if (hits.length === 0) return null;

      const hit = hits[0];
      const userData = hit.object.userData;

      if (userData.partId === 'mainMonitor' && hit.uv) {
        const cx = hit.uv.x * 1280;
        const cy = (1 - hit.uv.y) * 640;
        const btns = getMonitorButtons(activeProjectRef.current.id);
        const matchedBtn = btns.find(
          (b) => cx >= b.x && cx <= b.x + b.w && cy >= b.y && cy <= b.y + b.h
        );
        return { ...userData, monitorBtn: matchedBtn || null };
      }

      return { ...userData, monitorBtn: null };
    };

    const executeMonitorButtonAction = (btnId) => {
      if (btnId === 'win_home' || btnId === 'nav_0') {
        setActiveProjectIndex(0);
        setCameraPreset('mainMonitor');
      } else if (btnId === 'nav_1' || btnId === 'hub_card_1') {
        setActiveProjectIndex(1);
        setCameraPreset('mainMonitor');
      } else if (btnId === 'nav_2' || btnId === 'hub_card_2') {
        setActiveProjectIndex(2);
        setCameraPreset('mainMonitor');
      } else if (btnId === 'nav_3' || btnId === 'hub_card_3') {
        setActiveProjectIndex(3);
        setCameraPreset('mainMonitor');
      } else if (btnId === 'nav_rgb') {
        setThemeIndex((prev) => (prev + 1) % RGB_THEMES.length);
      } else if (btnId === 'nav_launch' || btnId === 'win_open') {
        if (activeProjectRef.current.id === 'hub') {
          setShowProfileModal(true);
        } else {
          setModalTab('preview');
          setOpenModalProject(activeProjectRef.current);
        }
      } else if (btnId.startsWith('poke_')) {
        if (btnId === 'poke_live') {
          setModalTab('preview');
          setOpenModalProject(activeProjectRef.current);
        } else {
          const idx = Number(btnId.split('_')[1]);
          monitorSubStateRef.current.pokeIndex = idx;
          updateScreensRef.current(activeProjectRef.current, themeRef.current);
        }
      } else if (btnId.startsWith('web_')) {
        if (btnId === 'web_live') {
          setModalTab('preview');
          setOpenModalProject(activeProjectRef.current);
        } else {
          const sec = btnId.replace('web_', '');
          monitorSubStateRef.current.webSection = sec;
          updateScreensRef.current(activeProjectRef.current, themeRef.current);
        }
      } else if (btnId.startsWith('sql_')) {
        if (btnId === 'sql_live') {
          setModalTab('preview');
          setOpenModalProject(activeProjectRef.current);
        } else if (btnId === 'sql_run') {
          const nextSql = (monitorSubStateRef.current.sqlIndex + 1) % SQL_PRESETS.length;
          monitorSubStateRef.current.sqlIndex = nextSql;
          setSelectedSqlIndex(nextSql);
          setCustomSqlText(SQL_PRESETS[nextSql].query);
          updateScreensRef.current(activeProjectRef.current, themeRef.current);
        } else {
          const idx = Number(btnId.split('_')[1]);
          monitorSubStateRef.current.sqlIndex = idx;
          setSelectedSqlIndex(idx);
          setCustomSqlText(SQL_PRESETS[idx].query);
          updateScreensRef.current(activeProjectRef.current, themeRef.current);
        }
      }
    };

    const onPointerMove = (e) => {
      const hit = getHitDetails(e.clientX, e.clientY);
      if (hit) {
        renderer.domElement.style.cursor = 'pointer';
        if (hit.partId === 'mainMonitor') {
          const newBtnId = hit.monitorBtn ? hit.monitorBtn.id : null;
          if (hoveredMonitorBtnRef.current !== newBtnId) {
            hoveredMonitorBtnRef.current = newBtnId;
            if (updateScreensRef.current) {
              updateScreensRef.current(activeProjectRef.current, themeRef.current);
            }
          }
          setHoveredPart(
            hit.monitorBtn
              ? `Pantalla PC → ${hit.monitorBtn.label}`
              : 'Pantalla PC: Selecciona un botón en el monitor'
          );
        } else {
          if (hoveredMonitorBtnRef.current !== null) {
            hoveredMonitorBtnRef.current = null;
            if (updateScreensRef.current) {
              updateScreensRef.current(activeProjectRef.current, themeRef.current);
            }
          }
          setHoveredPart(hit.label);
        }
      } else {
        renderer.domElement.style.cursor = 'grab';
        setHoveredPart(null);
        if (hoveredMonitorBtnRef.current !== null) {
          hoveredMonitorBtnRef.current = null;
          if (updateScreensRef.current) {
            updateScreensRef.current(activeProjectRef.current, themeRef.current);
          }
        }
      }
    };

    const onPointerDown = (e) => {
      downPos = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = (e) => {
      const dist = Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y);
      if (dist > 6) return;

      const hit = getHitDetails(e.clientX, e.clientY);
      if (!hit) return;

      if (hit.partId === 'wallPanels') {
        setThemeIndex((prev) => (prev + 1) % RGB_THEMES.length);
      } else if (hit.partId === 'mainMonitor') {
        if (hit.monitorBtn) {
          executeMonitorButtonAction(hit.monitorBtn.id);
        } else {
          setCameraPreset('mainMonitor');
        }
      } else if (hit.partId === 'sideMonitor') {
        setCameraPreset('sideMonitor');
        setModalTab('code');
        setOpenModalProject(activeProjectRef.current);
      } else if (hit.partId === 'pcTower') {
        setCameraPreset('pcTower');
        setPcTurboMode((prev) => !prev);
      } else if (hit.partId === 'windowMoon') {
        setCameraPreset('window');
      }
    };

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    const cameraTargets = {
      overview: { pos: new THREE.Vector3(0, 2.55, 5.4), target: new THREE.Vector3(0, 1.35, -0.4) },
      mainMonitor: { pos: new THREE.Vector3(0, 1.58, 1.32), target: new THREE.Vector3(0, 1.56, -0.75) },
      sideMonitor: { pos: new THREE.Vector3(-0.75, 1.62, 1.15), target: new THREE.Vector3(-1.38, 1.58, -0.62) },
      pcTower: { pos: new THREE.Vector3(0.75, 1.54, 1.32), target: new THREE.Vector3(1.65, 1.44, -0.52) },
      window: { pos: new THREE.Vector3(-2.35, 2.34, 0.42), target: new THREE.Vector3(-5.55, 2.46, -1.62) }
    };

    let codeScrollStep = 0;
    let lastCodeTick = 0;
    let animFrameId;

    const animate = (time) => {
      animFrameId = requestAnimationFrame(animate);

      const fanSpeed = pcTurboRef.current ? 0.34 : 0.16;
      fans.forEach((fan) => {
        fan.rotation.z += fanSpeed;
      });

      // Libración/rotación muy sutil de la Luna y desplazamiento suave de nubes
      moonMesh.rotation.y = 0.68 + Math.sin(time * 0.00018) * 0.06;
      cloudsGroup.position.z = Math.sin(time * 0.00025) * 0.28;

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
      moonColorTex.dispose();
      moonBumpTex.dispose();
      moonGlowTex.dispose();
      nightSkyTex.dispose();
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

          <button
            onClick={() => setCameraPreset('window')}
            title="Mirar Luna HD en la Ventana"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
              cameraPreset === 'window'
                ? 'bg-slate-800 text-sky-200 border border-sky-500/50'
                : 'text-slate-400 hover:text-sky-200'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-sky-300" />
            <span className="hidden md:inline">Luna</span>
          </button>

          <button
            onClick={() => setPcTurboMode((prev) => !prev)}
            title="Velocidad de Ventiladores e Intensidad RGB de la PC"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
              pcTurboMode
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
            }`}
          >
            <Fan className={`w-3.5 h-3.5 ${pcTurboMode ? 'animate-spin' : ''}`} />
            <span className="hidden lg:inline">{pcTurboMode ? 'Turbo RGB' : 'Fans'}</span>
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