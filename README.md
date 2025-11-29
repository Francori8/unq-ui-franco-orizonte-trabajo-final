# Preguntas y respuestas - Trabajo Final UNQ UI

Aplicación de preguntas y respuestas desarrollada con React, TypeScript y Vite para la materia de Construcción de Interfaces de Usuario.

## Funcionalidades

La aplicación permite jugar a un juego de preguntas y respuestas con las siguientes características:

- **Selección de dificultad**: Se puede elegir entre cuatro niveles de dificultad (fácil, normal, difícil y extremo).
- **Preguntas de opción múltiple**: Cada pregunta presenta cuatro opciones de respuesta.
- **Sistema de puntuación**: Se lleva un registro del puntaje obtenido durante la partida.
- **Feedback visual**: Indicadores de respuestas correctas e incorrectas con colores distintivos.
- **Traducción automática**: Soporte para inglés y español utilizando la Translation API del navegador (si está disponible).
- **Reinicio de partida**: Opción para reiniciar el juego en cualquier momento.
- **Pantalla de resultados**: Al finalizar, se muestra el puntaje total y el porcentaje de aciertos.

## Instalación y uso

1. Clonar el repositorio:

```bash
git clone https://github.com/Francori8/unq-ui-franco-orizonte-trabajo-final.git
cd unq-ui-franco-orizonte-trabajo-final
```

2. Instalar las dependencias:

```bash
npm install
```

3. Ejecutar el proyecto en modo desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique Vite).

## Tecnologías utilizadas

- React 18
- TypeScript
- Vite
- TailwindCSS
- Translation API (experimental)

## Notas

La funcionalidad de traducción automática requiere que el navegador soporte la Translation API. Si no está disponible, la aplicación funcionará únicamente en inglés.
