# Agile Team Maturity Assessment

**By Hill + Gliga — Agile & Engineering Advisory**

Interactive assessment tool: 21 questions across 8 dimensions of team maturity. Helps engineering leaders understand how autonomous their team really is.

## Local Development

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```

Output goes to `dist/` folder.

## Integration

The main component is `src/AgileMaturityV2.jsx` — a self-contained React component with no external dependencies beyond React itself. Can be imported into any React project:

```jsx
import AgileMaturityV2 from './AgileMaturityV2'

function App() {
  return <AgileMaturityV2 />
}
```
