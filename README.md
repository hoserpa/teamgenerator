# Team Generator

Aplicación web para generar equipos equilibrados aleatoriamente, creada por Hoserpa.

## Funcionalidades

### 🎯 Generación de Equipos
- **División automática**: Separa los jugadores en dos equipos equilibrados según su nivel
- **Algoritmo inteligente**: Intenta minimizar la diferencia de nivel entre equipos (< 1 punto)
- **Asignación aleatoria**: Distribuye los jugadores de forma aleatoria entre ambos equipos

### 👥 Gestión de Jugadores
- **Añadir jugadores**: Manualmente o mediante lista pegada
- **Eliminar jugadores**: Botón para eliminar individualmente
- **Nivel personalizado**: Asignar valor numérico (0-100) a cada jugador
- **Porteros especiales**: Identificación automática de porteros (Joserra, Pablo)

### 📋 Importación de Listas
- **Formato flexible**: Pega listas con diferentes formatos (numeradas, con comas, etc.)
- **Limpieza automática**: Elimina espacios, números y caracteres especiales
- **Niveles predefinidos**: Asigna niveles automáticamente a jugadores conocidos

### 📊 Estadísticas y Cuotas
- **Cálculo de media**: Muestra el nivel promedio de cada equipo
- **Sistema de cuotas**: Calcula probabilidades de victoria basadas en niveles
- **Visualización clara**: Tabla de cuotas para ambos equipos

## Uso

1. **Añadir jugadores**:
   - Manualmente: Botón "+" para añadir jugador individual
   - Por lista: Pega la lista de jugadores en el área de texto y haz clic en "Add"

2. **Configurar jugadores**:
   - Marca porteros con el interruptor verde
   - Ajusta el nivel de cada jugador (0-100)

3. **Generar equipos**:
   - Haz clic en "Generar" para crear equipos equilibrados
   - La aplicación intentará automáticamente balancear los equipos

4. **Ver resultados**:
   - Equipos generados con sus jugadores
   - Nivel promedio de cada equipo
   - Cuotas de victoria

## Tecnologías

- **Next.js**: Framework React
- **Tailwind CSS**: Estilos y diseño
- **React Transition Group**: Animaciones
- **UUID**: Identificadores únicos

## Despliegue

La aplicación está desplegada en GitHub Pages:
https://hoserpa.github.io/teamgenerator

---

Desarrollado por **Hoserpa**
