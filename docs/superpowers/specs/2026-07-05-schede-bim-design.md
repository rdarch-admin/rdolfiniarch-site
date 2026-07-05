# Due schede BIM nella sezione Progetti — Design

Data: 2026-07-05
Autore: Roberto Dolfini (con Claude Code)

## Contesto

Il sito `rdolfiniarch` ha una pagina `progetti.html` con una griglia di
`project-card` e quattro filtri: Tutti / Progettazione / BIM / Rendering.
Il filtro **BIM** e' gia' cablato nel JS (`data-filter="bim"` mostra le card
con `data-category="bim"`) ma **oggi non ha nessuna card**.

Le pagine di dettaglio progetto (es. `progetti/casa-dd.html`) usano un template
condiviso: hero, strip metadati, corpo testo, galleria. La galleria ha due
mattoni riutilizzabili:

- `gallery-item--photo` — immagine a piena larghezza (usata per i render);
- `gallery-doc` — elaborato mostrato intero con `figcaption` (piante, sezioni).

## Obiettivo

Aggiungere **due schede a taglio BIM** alla griglia progetti, ognuna con la
propria pagina di dettaglio. Contenuto: **viste 3D (viewport) + elaborati 2D**,
**nessun rendering**. Le due schede sono lavori reali:

1. **Hotel La Palma — Capri** — caso Scan-to-BIM (nuvola di punti -> modello BIM).
2. **Ex Caserma Lupi** — evoluzione del modello da preliminare a esecutivo (LOD).

Approccio: **struttura prima, immagini dopo**. Si costruisce lo scaffolding con
placeholder e testi; le immagini reali arrivano in un secondo momento.

## Decisioni di collocazione

- Le due schede vivono nella griglia esistente di `progetti.html`, in coda,
  con `data-category="bim"`. Riempiono il filtro BIM oggi vuoto.
- **Nessuna nuova voce di navigazione. Nessuna modifica al JS dei filtri.**
- Ogni scheda ha la sua pagina di dettaglio sotto `progetti/`.

## 1. Card nella griglia (`progetti.html`)

Due nuovi blocchi `<a class="project-card" data-category="bim">` dopo le card
esistenti. Struttura identica alle attuali (immagine copertina + badge + label +
h3 + p).

| Campo    | Hotel La Palma                     | Ex Caserma Lupi                          |
|----------|------------------------------------|------------------------------------------|
| href     | `progetti/hotel-la-palma.html`     | `progetti/ex-caserma-lupi.html`          |
| copertina| `immagini/progetti/hotel-la-palma/copertina_progetto.jpg` | `immagini/progetti/ex-caserma-lupi/copertina_progetto.jpg` |
| badge    | `BIM`                              | `BIM`                                     |
| label    | `BIM · Scan-to-BIM`                | `BIM · Da preliminare a esecutivo`        |
| h3       | Hotel La Palma                     | Ex Caserma Lupi                           |
| p        | descrizione (placeholder, da rifinire) | descrizione (placeholder, da rifinire) |

**Badge**: si usa un badge neutro `BIM` (riusa lo stile `.project-status-badge`)
al posto dello stato cantiere "Progetto / In costruzione", per distinguere il
taglio BIM dal progetto architettonico. Modificabile in seguito.

## 2. Pagine di dettaglio

Due file basati sul template di `progetti/casa-dd.html`:

- `progetti/hotel-la-palma.html`
- `progetti/ex-caserma-lupi.html`

Tre differenze rispetto al template architettonico:

### a. Niente blocco render
Nessun `gallery-item--photo` di rendering. La galleria contiene solo:
- **viewport 3D** — viste assonometriche / spaccati esportati come immagine,
  presentati come `gallery-doc` con didascalia "Vista 3D · ...";
- **tavole 2D** — piante, sezioni, prospetti come `gallery-doc`.

### b. Strip metadati adattata al BIM
Quattro campi: **Localita' / Tipologia / Software / Anno**.
Il campo *Software* e' nuovo (es. "Revit · ReCap") ma rientra nella griglia
`project-meta__grid` a 4 colonne senza modifiche di layout.

Valori meta (localita' esatta, anno, software, tipologia) = **placeholder da
compilare** con i dati reali dei due lavori.

### c. Narrazione dedicata al taglio
- **Hotel La Palma (Scan-to-BIM)**: coppia "Nuvola di punti -> Modello BIM" —
  due `gallery-doc` affiancati (nuvola grezza vs modello restituito) che
  raccontano input reale -> output modellato, poi le tavole 2D estratte.
- **Ex Caserma Lupi (Preliminare -> Esecutivo)**: sequenza di **progressione
  LOD** — stesse viste dell'oggetto che cresce di dettaglio (es. LOD 100 ->
  300/400), poi gli elaborati 2D corrispondenti.

Il corpo testo (paragrafi descrittivi) resta placeholder da rifinire.

## 3. Strategia placeholder

Finche' mancano le immagini, si introduce una variante
`gallery-doc--placeholder`: blocco neutro (sfondo `--color-border-light`,
proporzione fissa) con `figcaption` "In arrivo". Evita immagini rotte.

I path delle immagini reali sono gia' scritti nell'HTML e puntano alle cartelle
di destinazione. Quando le immagini sono pronte, si sostituisce il placeholder
con l'`<img>` reale (o si popola la cartella e si toglie la classe placeholder).

## 4. Convenzione immagini

Coerente con l'esistente (`immagini/progetti/<slug>/`):

- `immagini/progetti/hotel-la-palma/`
- `immagini/progetti/ex-caserma-lupi/`

Naming: `copertina_progetto.jpg` per la card; tavole 2D in `.png`; viewport 3D
in `.jpg` o `.png`. Le cartelle si creano al momento del caricamento immagini.

## Fuori scope

- Nessun rendering.
- Nessuna nuova voce di navigazione, nessuna pagina indice BIM dedicata.
- Nessuna modifica al JS dei filtri (gia' funzionante).
- Contenuti testuali definitivi e immagini reali (arrivano dopo lo scaffolding).

## Placeholder di contenuto da compilare in seguito

- Descrizioni card (griglia).
- Valori meta: Localita', Tipologia, Software, Anno per entrambe le schede.
- Paragrafi corpo testo di entrambe le pagine.
- Immagini: copertine, viewport 3D, tavole 2D.
