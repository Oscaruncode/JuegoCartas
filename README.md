# PoliCartas 🗳️

Juego de cartas estilo Pokémon con los candidatos a la presidencia de Colombia 2026.

## Cómo jugar

1. Cada jugador recibe 4 cartas de políticos colombianos
2. Selecciona una carta de tu mano para jugar
3. La CPU elige una carta aleatoria
4. El score se calcula así: `Propuestas + Experiencia × 0.5 - Escándalos × 0.3`
5. Los tipos tienen ventajas entre sí (como piedra, papel o tijera):
   - **Izquierda** le gana a **Derecha**
   - **Derecha** le gana a **Centro**
   - **Centro** le gana a **Izquierda**
6. Gana quien acumule más rondas en 4 turnos

Políticos incluidos (Candidatos Oficiales 2026)
Nombre	Partido	Tipo
Iván Cepeda	Pacto Histórico	Izquierda
Abelardo de la Espriella	Independiente	Derecha
Paloma Valencia	Centro Democrático	Derecha
Claudia López	Alianza Verde	Centro
Sergio Fajardo	Dignidad y Compromiso	Centro
Luis Gilberto Murillo	Colombia Renaciente	Centro-Izquierda (centro)
Miguel Uribe Londoño	Centro Democrático	Derecha
Roy Barreras	La Fuerza de la Paz	Centro-Izquierda (centro)
Carlos Caicedo	Fuerza Ciudadana	Izquierda
Clara López	Todos Somos Colombia	Izquierda
Mauricio Lizcano	En Marcha	Centro
Gustavo Matamoros	Independiente (Militar r.)	Derecha
Santiago Botero	Independiente	Derecha
Sondra Macollins	Independiente	Centro-Derecha (centro)

## Stack

- **React** + **TypeScript** + **Vite**
- **Tailwind CSS** para estilos
- **Zustand** para el estado del juego

## Instalación

```bash
npm install
npm run dev
```

## Estructura del proyecto

```
src/
├── data/politicians.ts     # Datos y stats de cada político
├── types/card.ts           # Tipos TypeScript
├── store/gameStore.ts      # Estado global (Zustand)
├── logic/battle.ts         # Lógica de batalla y cálculo de scores
└── components/
    ├── Card/               # Componente visual de carta
    ├── Board/              # Tablero de juego
    └── BattleResult/       # Resultado de cada ronda
```
