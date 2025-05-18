# Tablero retail

Es un tablero de control para retail donde incluye listado de productos con paginación, filtros por categoría y precio y las estadísticas básicas
de los productos.

---

## Tecnología usadas

- Axios
- Vue 3
- Vue Router
- Pinia para manejo de estado
- Tailwind CSS 
- Javascript
- PostCSS
- Vite
  
## Instalación

  * Clona el repositorio y accede a la carpeta del proyecto:

    git clone https://github.com/Enriquegonzalezz/Prueba-Vue.git

    cd Prueba-Vue

   * instala las dependencias con:

    npm install o yarn install


---

## Ejecución

Para levantar el servidor de desarrollo con hot-reload:

   npm run dev o yarn dev

---

## Decisiones Técnicas Relevantes

- Se usó Vue 3 con Composition API para una mejor organización y reactividad.
- El manejo de estado global se realiza con Pinia, facilitando la gestión de productos y filtros.
- Se implementó persistencia de filtros usando `localStorage` para mejorar la experiencia de usuario.
- El filtrado y paginación de productos se realiza en el componente padre para mantener la lógica centralizada.
- Se usa Vue Router para manejar rutas dinámicas por categoría, sincronizando filtros con la URL.
- La conversión de moneda y formateo se abstrajo en la carpeta aditional donde se personalizó.
- Tailwind CSS se emplea para estilos rápidos y responsivos.
- Se usan dos APIs externas: FakeStoreAPI para productos y categorías, y PyDolarVenezuela para la tasa de cambio. Axios permite un manejo sencillo de peticiones y errores.
- El proyecto está dividido en componentes reutilizables: tarjetas de producto, paginación, estadísticas, barra de filtros, loader y mensajes de error, siguiendo buenas prácticas de diseño de interfaces.
-Se cuidan detalles como el uso de loading="lazy" en imágenes, manejo de estados de carga y error, y controles accesibles para filtros y paginación.
-Se implementan componentes dedicados para mostrar mensajes de error y loaders, viendo así el manejo de errores y el estado de carga.

---

## Estructura del Proyecto

📁 **src**  
├── 📁 **components**  
│   ├── 📁 **Products**  
│   │   ├── 📄 ProductTarjet.vue  
│   │   ├── 📄 ProductGrid.vue  
│   │   └── 📄 Pagination.vue  
│   ├── 📁 **tablero**  
│   │   ├── 📄 FiltersBar.vue  
│   │   └── 📄 Stats.vue  
│   └── 📁 **UI**  
│       ├── 📄 Loader.vue  
│       ├── 📄 ErrorMessage.vue  
│       └── 📄 mmodal.vue  
├── 📁 **store**  
│   └── 📄 Products.js  
├── 📁 **aditionals**  
│   └── 📄 ChangeCurrency.js  
├── 📁 **router**  
│   └── 📄 index.js  
├── 📄 App.vue  
└── 📄 main.js  


    ¡Gracias por usar este proyecto! dudas, preguntas o puntos oscuros contacta conmigo estaré atento.
