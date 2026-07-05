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
2. **Ex Caserma Lupi** — evoluzione del modello da preliminare a definitivo (LOD).

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
| label    | `BIM · Scan-to-BIM`                | `BIM · Da preliminare a definitivo`       |
| h3       | Hotel La Palma                     | Ex Caserma Lupi                           |
| p        | vedi "Testi congelati" (blurb A)   | vedi "Testi congelati" (blurb B)          |

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
Quattro campi: **Localita' / Tipologia / Software / Progetto**.
I campi *Software* (es. "Revit · ReCap") e *Progetto* (autore/team, come nelle
pagine progetto) sostituiscono l'Anno, poco informativo su una commessa BIM.
Rientrano nella griglia `project-meta__grid` a 4 colonne senza modifiche di
layout.

Valori del campo *Progetto*:
- Hotel La Palma  -> `Arch. R. Dolfini · Arch. F. Magenes`
- Ex Caserma Lupi -> `Arch. Roberto Dolfini`

Valori Localita' / Tipologia / Software = da compilare con i dati reali.
L'accredito a Federico Magenes vive **solo** in questo campo, non nel corpo testo.

### c. Narrazione dedicata al taglio
- **Hotel La Palma (Scan-to-BIM)**: coppia "Nuvola di punti -> Modello BIM" —
  due `gallery-doc` affiancati (nuvola grezza vs modello restituito) che
  raccontano input reale -> output modellato, poi le tavole 2D estratte.
- **Ex Caserma Lupi (Preliminare -> Definitivo)**: sequenza di **progressione
  LOD** — stesse viste dell'oggetto che cresce di dettaglio (es. LOD 100 ->
  300), poi gli elaborati 2D corrispondenti.

Il corpo testo e' congelato (vedi "Testi congelati" in fondo).

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
- Immagini reali (arrivano dopo lo scaffolding).

## Placeholder di contenuto da compilare in seguito

- Valori meta: Localita', Tipologia, Software per entrambe le schede
  (il campo *Progetto* e' gia' definito sopra).
- Immagini: copertine, viewport 3D, tavole 2D.

## Testi congelati

Testi definitivi da inserire nelle pagine. Accenti ammessi (copy web).

### Blurb card

**Hotel La Palma (blurb A):** Rilievo con laser scanner e restituzione di un
modello BIM ad alto LOD di un hotel a Capri: dalla nuvola di punti alla
modellazione fedele di impianti, volte e finiture.

**Ex Caserma Lupi (blurb B):** Sviluppo di un modello BIM esistente dal livello
preliminare al definitivo, con rimodellazione dei due edifici e script Python
realizzati ad hoc per reggere il ritmo delle revisioni.

### Corpo pagina — Hotel La Palma

All'Hotel La Palma di Capri il lavoro e' consistito in un sopralluogo in loco per
eseguire il rilievo con laser scanner e restituire un modello BIM ad alto LOD.
La commessa nasceva da tre esigenze del cliente: disporre di un modello di
qualita' sufficiente per ricavarne visualizzazioni realistiche, progettare un
nuovo intervento all'interno della struttura e catalogare gli impianti esistenti,
da quello meccanico a quello elettrico. Il rendering era un obiettivo della
committenza: il nostro compito e' stato consegnare il modello che lo rendesse
possibile.

Il lavoro e' partito dal rilievo dell'esterno a piano terra e degli ambienti
interni indicati dal cliente. Il risultato e' una nuvola di punti affiancata alle
bubble view, le panoramiche navigabili che permettono ai progettisti di visitare
virtualmente gli spazi anche da remoto, senza dover tornare sul posto a ogni
verifica.

Validata la nuvola con ulteriori misure prese in loco, si e' passati alla
restituzione del modello, seguendo fedelmente il rilievo e riportando la totalita'
degli elementi: dal disegno delle pavimentazioni al tracciato degli impianti,
fino a quei componenti che richiedevano una modellazione piu' attenta e accurata
— volte, applique e lampadari — ricostruiti uno per uno. Attenzione particolare
e' andata alla parte esterna, oggetto di riprogettazione per dotare l'hotel di un
nuovo spazio outdoor.

### Corpo pagina — Ex Caserma Lupi

Oggetto di questa commessa e' stato lo sviluppo di un modello BIM gia' esistente
dell'Ex Caserma Lupi, a Firenze, portandolo dal livello preliminare a quello
definitivo. La richiesta del cliente era semplice nell'enunciato ma tutt'altro
che banale nell'esecuzione: incrementare il livello di dettaglio del progetto
integrando nel modello, nell'arco di cinque mesi, il flusso continuo di
informazioni e di modifiche progettuali — architettoniche, strutturali e
impiantistiche — che si susseguivano durante la lavorazione.

L'incarico presentava diverse criticita', sul piano sia progettuale sia BIM,
risolte mano a mano durante la produzione del nuovo modello. Di fatto il lavoro
ha comportato una rimodellazione da zero dei due edifici, preservando invece
l'interrato di collegamento tra loro, unico elemento mantenuto dal modello di
partenza.

La difficolta' maggiore e' stata mettere a sistema, in modo efficace e con tempi
stretti, le indicazioni provenienti in parallelo dai progettisti architettonici e
impiantistici. Proprio per accelerare le fasi piu' ripetitive — modellazione,
messa in tavola e assegnazione dei parametri — ho scritto una serie di script
Python realizzati ad hoc per la commessa, che hanno permesso di reggere il ritmo
delle revisioni senza sacrificare la coerenza del modello.
