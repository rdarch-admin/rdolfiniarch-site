# Schede BIM (Hotel La Palma, Ex Caserma Lupi) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aggiungere due schede a taglio BIM (Hotel La Palma — Scan-to-BIM; Ex Caserma Lupi — da preliminare a definitivo) alla griglia progetti, ognuna con pagina di dettaglio, mostrando viste 3D + tavole 2D e nessun rendering. Scaffolding con placeholder: testi definitivi, immagini in arrivo.

**Architecture:** Sito statico Jekyll/GitHub Pages. Le due card entrano nella griglia esistente di `progetti.html` con `data-category="bim"` (il filtro BIM e' gia' cablato nel JS, non si tocca). Ogni scheda ha una pagina di dettaglio clonata dal template di `progetti/casa-dd.html`, con strip meta adattata al BIM, galleria di soli placeholder e nessun blocco render. I placeholder immagine riusano `.project-card__placeholder` (gia' in `css/style.css`) per le card e una piccola classe inline `.media-ph` per hero e galleria.

**Tech Stack:** HTML statico + Liquid (Jekyll), CSS in `css/style.css` (non modificato) + `<style>` inline per pagina, JS vanilla esistente.

**Spec di riferimento:** `docs/superpowers/specs/2026-07-05-schede-bim-design.md` (testi congelati inclusi).

---

## File Structure

- **Modify** `progetti.html` — aggiunge 2 blocchi `<a class="project-card" data-category="bim">` in coda alla griglia `#projects-grid`. Nessuna modifica a filtri, CSS o JS della pagina.
- **Create** `progetti/hotel-la-palma.html` — pagina dettaglio Scan-to-BIM. `<style>` = clone di casa-dd + placeholder CSS; body con meta BIM, testo congelato, galleria placeholder.
- **Create** `progetti/ex-caserma-lupi.html` — pagina dettaglio da preliminare a definitivo. Stessa struttura, contenuti propri.
- **Non modificati:** `css/style.css`, `js/main.js`, `_includes/*`, `_config.yml`. Cache-bust resta `?v=12`.

## Nota sulla verifica (anteprima senza Jekyll)

Sulla macchina non c'e' Ruby/Jekyll: servendo l'HTML grezzo, il front matter (`--- ... ---`), gli `{% include %}` di header/footer e i `{{ ... | relative_url }}` compaiono NON espansi. Non e' un difetto delle modifiche: gli elementi che aggiungiamo (card, meta, galleria, filtro) sono nel body e finiscono comunque nel DOM. Si verifica con i **preview tool testuali** (`preview_snapshot`, `preview_inspect`), non solo screenshot, cosi' il rumore Liquid non blocca il controllo. La config `site` (`.claude/launch.json`, porta 8080, `npx http-server`) e' gia' presente. Per un rendering pulito completo: push su GitHub Pages o build `_preview` (vedi memoria `preview-senza-jekyll`).

---

## Task 1: Due card BIM nella griglia progetti

**Files:**
- Modify: `progetti.html` (dentro `<div class="projects-grid" id="projects-grid">`, dopo l'ultima card `casa-dd` e prima del `</div>` di chiusura griglia)

- [ ] **Step 1: Inserire i due blocchi card**

In `progetti.html`, individua la fine dell'ultima card esistente (Casa DD): la riga `</a>` che chiude `<a href="progetti/casa-dd.html" ...>`, seguita da `</div>` (chiusura `#projects-grid`). Inserisci i due blocchi seguenti tra quel `</a>` e il `</div>`:

```html
        <a href="progetti/hotel-la-palma.html" class="project-card" data-category="bim">
          <div class="project-card__image">
            <div class="project-card__placeholder">Immagine in arrivo</div>
            <span class="project-status-badge">BIM</span>
          </div>
          <div class="project-card__info">
            <span class="label">BIM &middot; Scan-to-BIM</span>
            <h3>Hotel La Palma</h3>
            <p>Rilievo con laser scanner e restituzione di un modello BIM ad alto LOD di un hotel a Capri: dalla nuvola di punti alla modellazione fedele di impianti, volte e finiture.</p>
          </div>
        </a>

        <a href="progetti/ex-caserma-lupi.html" class="project-card" data-category="bim">
          <div class="project-card__image">
            <div class="project-card__placeholder">Immagine in arrivo</div>
            <span class="project-status-badge">BIM</span>
          </div>
          <div class="project-card__info">
            <span class="label">BIM &middot; Da preliminare a definitivo</span>
            <h3>Ex Caserma Lupi</h3>
            <p>Sviluppo di un modello BIM esistente dal livello preliminare al definitivo, con rimodellazione dei due edifici e script Python realizzati ad hoc per reggere il ritmo delle revisioni.</p>
          </div>
        </a>
```

- [ ] **Step 2: Avviare l'anteprima**

Usa il preview tool `preview_start` con config `site`. Attendi che il server sia su (porta 8080).

- [ ] **Step 3: Verificare filtro e conteggio card**

Naviga a `http://localhost:8080/progetti.html`. Con `preview_snapshot` verifica che nella griglia siano presenti 5 card (3 progettazione + 2 BIM) con i titoli "Hotel La Palma" e "Ex Caserma Lupi".
Poi con `preview_click` clicca il filtro `button[data-filter="bim"]` e con `preview_snapshot` verifica che restino visibili SOLO le due card BIM (le 3 di progettazione hanno classe `is-hidden`).
Expected: filtro "BIM" mostra 2 card, "Tutti" le mostra tutte.

- [ ] **Step 4: Commit**

```bash
git add progetti.html
git commit -m "Add two BIM cards to projects grid (Hotel La Palma, Ex Caserma Lupi)"
```

---

## Task 2: Pagina dettaglio Hotel La Palma

**Files:**
- Create: `progetti/hotel-la-palma.html`

- [ ] **Step 1: Creare il file con front matter, head e `<style>`**

Crea `progetti/hotel-la-palma.html`. Per il blocco `<style>...</style>`: **copia integralmente** il contenuto del blocco `<style>` di `progetti/casa-dd.html` (dalla riga `<style>` fino a `</style>`, invariato) e in coda, prima di `</style>`, **aggiungi** il CSS placeholder qui sotto. Il resto della testata come segue:

```html
---
nav_active: progetti
---
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hotel La Palma — Scan-to-BIM a Capri | R.Dolfini Arch.</title>
  <meta name="description" content="Rilievo con laser scanner e restituzione di un modello BIM ad alto LOD dell'Hotel La Palma a Capri. Dalla nuvola di punti alla modellazione di impianti, volte e finiture. Arch. Roberto Dolfini.">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Hotel La Palma — Scan-to-BIM a Capri | R.Dolfini Arch.">
  <meta property="og:description" content="Rilievo laser scanner e modello BIM ad alto LOD dell'Hotel La Palma a Capri.">
  <meta property="og:url" content="https://www.rdolfiniarch.it/progetti/hotel-la-palma.html">
  <link rel="stylesheet" href="../css/style.css?v=12">

  <style>
    /* >>> QUI: incollare integralmente il blocco <style> di progetti/casa-dd.html <<< */

    /* Placeholder scaffolding — immagini in arrivo */
    .media-ph {
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #E8E8E4 0%, #D0D0CC 100%);
      color: var(--color-text-tertiary);
      font-size: var(--text-xs);
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      text-align: center;
      padding: var(--space-md);
    }
    .project-hero .media-ph { width: 100%; height: 100%; }
    .gallery-doc--placeholder .media-ph { aspect-ratio: 4 / 3; }
    .gallery-item--wide.gallery-doc--placeholder .media-ph { aspect-ratio: 16 / 7; }
  </style>
</head>
```

- [ ] **Step 2: Aggiungere il body completo**

Subito dopo `</head>`, aggiungi:

```html
<body>

  {% include header.html %}

  <!-- ========== PAGE HEADER ========== -->
  <section class="page-header">    <div class="container">
      <div class="page-header__accent">
        <span class="label">BIM &middot; Scan-to-BIM</span>
        <span class="project-status-badge">BIM</span>
      </div>
      <h1>Hotel La Palma</h1>
      <p class="page-header__subtitle">
        Rilievo con laser scanner e restituzione BIM ad alto LOD di un hotel a Capri
      </p>
    </div>
  </section>

  <!-- ========== HERO (placeholder) ========== -->
  <div class="project-hero">
    <div class="media-ph">Immagine in arrivo</div>
    <span class="project-status-badge">BIM</span>
  </div>

  <!-- ========== CONTENUTO ========== -->
  <section class="section">
    <div class="container">

      <!-- Meta -->
      <div class="project-meta">
        <div class="project-meta__grid">
          <div class="project-meta__item">
            <span class="project-meta__label">Localita</span>
            <span class="project-meta__value">Capri</span>
          </div>
          <div class="project-meta__item">
            <span class="project-meta__label">Tipologia</span>
            <span class="project-meta__value">Scan-to-BIM &middot; HBIM</span>
          </div>
          <div class="project-meta__item">
            <span class="project-meta__label">Software</span>
            <span class="project-meta__value">Revit &middot; ReCap &middot; Rhinoceros</span>
          </div>
          <div class="project-meta__item">
            <span class="project-meta__label">Progetto</span>
            <span class="project-meta__value">Arch. R. Dolfini &middot; Arch. F. Magenes</span>
          </div>
        </div>
      </div>

      <!-- Testo -->
      <div class="project-body">
        <p>
          All'Hotel La Palma di Capri il lavoro e' consistito in un sopralluogo in loco per eseguire il
          rilievo con laser scanner e restituire un modello BIM ad alto LOD. La commessa nasceva da tre
          esigenze del cliente: disporre di un modello di qualita' sufficiente per ricavarne visualizzazioni
          realistiche, progettare un nuovo intervento all'interno della struttura e catalogare gli impianti
          esistenti, da quello meccanico a quello elettrico. Il rendering era un obiettivo della committenza:
          il nostro compito e' stato consegnare il modello che lo rendesse possibile.
        </p>

        <h2>Il rilievo</h2>
        <p>
          Il lavoro e' partito dal rilievo dell'esterno a piano terra e degli ambienti interni indicati dal
          cliente. Il risultato e' una nuvola di punti affiancata alle bubble view, le panoramiche navigabili
          che permettono ai progettisti di visitare virtualmente gli spazi anche da remoto, senza dover
          tornare sul posto a ogni verifica.
        </p>

        <h2>La restituzione del modello</h2>
        <p>
          Validata la nuvola con ulteriori misure prese in loco, si e' passati alla restituzione del modello,
          seguendo fedelmente il rilievo e riportando la totalita' degli elementi: dal disegno delle
          pavimentazioni al tracciato degli impianti, fino a quei componenti che richiedevano una modellazione
          piu' attenta e accurata — volte, applique e lampadari — ricostruiti uno per uno. Attenzione
          particolare e' andata alla parte esterna, oggetto di riprogettazione per dotare l'hotel di un nuovo
          spazio outdoor.
        </p>
      </div>

      <!-- Galleria: Il progetto (placeholder) -->
      <div class="project-gallery">
        <div class="project-gallery__header">
          <span class="label">Il progetto</span>
        </div>

        <div class="project-gallery__grid">

          <figure class="gallery-item gallery-doc gallery-doc--placeholder gallery-item--wide">
            <div class="media-ph">In arrivo</div>
            <figcaption>Vista 3D &middot; Modello BIM d'insieme</figcaption>
          </figure>

          <figure class="gallery-item gallery-doc gallery-doc--placeholder">
            <div class="media-ph">In arrivo</div>
            <figcaption>Nuvola di punti &middot; Piano terra</figcaption>
          </figure>

          <figure class="gallery-item gallery-doc gallery-doc--placeholder">
            <div class="media-ph">In arrivo</div>
            <figcaption>Modello BIM &middot; Vista 3D</figcaption>
          </figure>

          <figure class="gallery-item gallery-doc gallery-doc--placeholder gallery-item--wide">
            <div class="media-ph">In arrivo</div>
            <figcaption>Vista 3D &middot; Nuovo spazio outdoor</figcaption>
          </figure>

          <figure class="gallery-item gallery-doc gallery-doc--placeholder">
            <div class="media-ph">In arrivo</div>
            <figcaption>Pianta &middot; Piano terra</figcaption>
          </figure>

          <figure class="gallery-item gallery-doc gallery-doc--placeholder">
            <div class="media-ph">In arrivo</div>
            <figcaption>Sezione &middot; Ambiente interno</figcaption>
          </figure>

        </div>
      </div>

      <!-- Navigazione -->
      <nav class="project-nav" aria-label="Navigazione progetti">
        <a href="../progetti.html" class="project-nav__back">
          <span class="project-nav__arrow">&larr;</span>
          Tutti i progetti
        </a>
        <a href="../contatti.html" class="btn btn--outline">
          Hai una commessa BIM?
          <span class="btn__arrow">&rarr;</span>
        </a>
      </nav>

    </div>
  </section>

  {% include footer.html %}

  <script src="../js/main.js?v=12"></script>
</body>
</html>
```

- [ ] **Step 3: Verificare la pagina**

Con l'anteprima attiva (Task 1), naviga a `http://localhost:8080/progetti/hotel-la-palma.html`. Con `preview_snapshot` verifica: h1 "Hotel La Palma"; label "BIM &middot; Scan-to-BIM" e badge "BIM"; strip meta con 4 voci (Localita/Tipologia/Software/Progetto) e valore Progetto "Arch. R. Dolfini &middot; Arch. F. Magenes"; tre paragrafi con i sottotitoli "Il rilievo" e "La restituzione del modello"; 6 figure in galleria con didascalie e blocchi placeholder "In arrivo".
Con `preview_inspect` su `.media-ph` verifica che il blocco placeholder abbia il background a gradiente (non un'immagine rotta).
Expected: nessuna `<img>` rotta, layout coerente col template progetto.

- [ ] **Step 4: Commit**

```bash
git add progetti/hotel-la-palma.html
git commit -m "Add Hotel La Palma BIM page (scaffold, images pending)"
```

---

## Task 3: Pagina dettaglio Ex Caserma Lupi

**Files:**
- Create: `progetti/ex-caserma-lupi.html`

- [ ] **Step 1: Creare il file con front matter, head e `<style>`**

Crea `progetti/ex-caserma-lupi.html`. Come per Hotel La Palma: **copia integralmente** il blocco `<style>` di `progetti/casa-dd.html` invariato e, prima di `</style>`, **aggiungi** lo stesso CSS placeholder. Testata:

```html
---
nav_active: progetti
---
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ex Caserma Lupi — Modello BIM da preliminare a definitivo | R.Dolfini Arch.</title>
  <meta name="description" content="Sviluppo di un modello BIM esistente dell'Ex Caserma Lupi a Firenze: dal livello preliminare al definitivo, rimodellazione dei due edifici e script Python ad hoc. Arch. Roberto Dolfini.">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Ex Caserma Lupi — Modello BIM da preliminare a definitivo | R.Dolfini Arch.">
  <meta property="og:description" content="Modello BIM dell'Ex Caserma Lupi a Firenze portato dal preliminare al definitivo.">
  <meta property="og:url" content="https://www.rdolfiniarch.it/progetti/ex-caserma-lupi.html">
  <link rel="stylesheet" href="../css/style.css?v=12">

  <style>
    /* >>> QUI: incollare integralmente il blocco <style> di progetti/casa-dd.html <<< */

    /* Placeholder scaffolding — immagini in arrivo */
    .media-ph {
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #E8E8E4 0%, #D0D0CC 100%);
      color: var(--color-text-tertiary);
      font-size: var(--text-xs);
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      text-align: center;
      padding: var(--space-md);
    }
    .project-hero .media-ph { width: 100%; height: 100%; }
    .gallery-doc--placeholder .media-ph { aspect-ratio: 4 / 3; }
    .gallery-item--wide.gallery-doc--placeholder .media-ph { aspect-ratio: 16 / 7; }
  </style>
</head>
```

- [ ] **Step 2: Aggiungere il body completo**

Subito dopo `</head>`, aggiungi:

```html
<body>

  {% include header.html %}

  <!-- ========== PAGE HEADER ========== -->
  <section class="page-header">    <div class="container">
      <div class="page-header__accent">
        <span class="label">BIM &middot; Da preliminare a definitivo</span>
        <span class="project-status-badge">BIM</span>
      </div>
      <h1>Ex Caserma Lupi</h1>
      <p class="page-header__subtitle">
        Sviluppo di un modello BIM esistente dal preliminare al definitivo — Firenze
      </p>
    </div>
  </section>

  <!-- ========== HERO (placeholder) ========== -->
  <div class="project-hero">
    <div class="media-ph">Immagine in arrivo</div>
    <span class="project-status-badge">BIM</span>
  </div>

  <!-- ========== CONTENUTO ========== -->
  <section class="section">
    <div class="container">

      <!-- Meta -->
      <div class="project-meta">
        <div class="project-meta__grid">
          <div class="project-meta__item">
            <span class="project-meta__label">Localita</span>
            <span class="project-meta__value">Firenze</span>
          </div>
          <div class="project-meta__item">
            <span class="project-meta__label">Tipologia</span>
            <span class="project-meta__value">Modellazione BIM &middot; Preliminare a definitivo</span>
          </div>
          <div class="project-meta__item">
            <span class="project-meta__label">Software</span>
            <span class="project-meta__value">Revit &middot; Python</span>
          </div>
          <div class="project-meta__item">
            <span class="project-meta__label">Progetto</span>
            <span class="project-meta__value">Arch. Roberto Dolfini</span>
          </div>
        </div>
      </div>

      <!-- Testo -->
      <div class="project-body">
        <p>
          Oggetto di questa commessa e' stato lo sviluppo di un modello BIM gia' esistente dell'Ex Caserma
          Lupi, a Firenze, portandolo dal livello preliminare a quello definitivo. La richiesta del cliente
          era semplice nell'enunciato ma tutt'altro che banale nell'esecuzione: incrementare il livello di
          dettaglio del progetto integrando nel modello, nell'arco di cinque mesi, il flusso continuo di
          informazioni e di modifiche progettuali — architettoniche, strutturali e impiantistiche — che si
          susseguivano durante la lavorazione.
        </p>

        <h2>Rimodellare da zero</h2>
        <p>
          L'incarico presentava diverse criticita', sul piano sia progettuale sia BIM, risolte mano a mano
          durante la produzione del nuovo modello. Di fatto il lavoro ha comportato una rimodellazione da zero
          dei due edifici, preservando invece l'interrato di collegamento tra loro, unico elemento mantenuto
          dal modello di partenza.
        </p>

        <h2>Script su misura</h2>
        <p>
          La difficolta' maggiore e' stata mettere a sistema, in modo efficace e con tempi stretti, le
          indicazioni provenienti in parallelo dai progettisti architettonici e impiantistici. Proprio per
          accelerare le fasi piu' ripetitive — modellazione, messa in tavola e assegnazione dei parametri —
          ho scritto una serie di script Python realizzati ad hoc per la commessa, che hanno permesso di
          reggere il ritmo delle revisioni senza sacrificare la coerenza del modello.
        </p>
      </div>

      <!-- Galleria: Il progetto (placeholder) -->
      <div class="project-gallery">
        <div class="project-gallery__header">
          <span class="label">Il progetto</span>
        </div>

        <div class="project-gallery__grid">

          <figure class="gallery-item gallery-doc gallery-doc--placeholder">
            <div class="media-ph">In arrivo</div>
            <figcaption>Modello &middot; LOD preliminare</figcaption>
          </figure>

          <figure class="gallery-item gallery-doc gallery-doc--placeholder">
            <div class="media-ph">In arrivo</div>
            <figcaption>Modello &middot; LOD definitivo</figcaption>
          </figure>

          <figure class="gallery-item gallery-doc gallery-doc--placeholder gallery-item--wide">
            <div class="media-ph">In arrivo</div>
            <figcaption>Vista 3D &middot; I due edifici e l'interrato di collegamento</figcaption>
          </figure>

          <figure class="gallery-item gallery-doc gallery-doc--placeholder">
            <div class="media-ph">In arrivo</div>
            <figcaption>Pianta &middot; Piano tipo</figcaption>
          </figure>

          <figure class="gallery-item gallery-doc gallery-doc--placeholder">
            <div class="media-ph">In arrivo</div>
            <figcaption>Sezione &middot; Edificio A</figcaption>
          </figure>

        </div>
      </div>

      <!-- Navigazione -->
      <nav class="project-nav" aria-label="Navigazione progetti">
        <a href="../progetti.html" class="project-nav__back">
          <span class="project-nav__arrow">&larr;</span>
          Tutti i progetti
        </a>
        <a href="../contatti.html" class="btn btn--outline">
          Hai una commessa BIM?
          <span class="btn__arrow">&rarr;</span>
        </a>
      </nav>

    </div>
  </section>

  {% include footer.html %}

  <script src="../js/main.js?v=12"></script>
</body>
</html>
```

- [ ] **Step 3: Verificare la pagina**

Naviga a `http://localhost:8080/progetti/ex-caserma-lupi.html`. Con `preview_snapshot` verifica: h1 "Ex Caserma Lupi"; label "BIM &middot; Da preliminare a definitivo" e badge "BIM"; strip meta 4 voci con Progetto "Arch. Roberto Dolfini"; tre paragrafi con sottotitoli "Rimodellare da zero" e "Script su misura"; 5 figure placeholder con le didascalie LOD/tavole.
Expected: layout coerente col template, nessuna immagine rotta.

- [ ] **Step 4: Commit**

```bash
git add progetti/ex-caserma-lupi.html
git commit -m "Add Ex Caserma Lupi BIM page (scaffold, images pending)"
```

---

## Task 4: Verifica di raccordo e responsive

**Files:** nessuna modifica prevista (solo eventuali fix emersi).

- [ ] **Step 1: Navigazione card -> pagina -> ritorno**

Con l'anteprima attiva, da `http://localhost:8080/progetti.html` clicca (o naviga) sulla card "Hotel La Palma": deve aprirsi `progetti/hotel-la-palma.html`. Dalla pagina, il link "Tutti i progetti" deve riportare a `progetti.html`. Ripeti per "Ex Caserma Lupi". Verifica gli `href` con `preview_snapshot`.
Expected: tutti i link risolvono ai path corretti.

- [ ] **Step 2: Controllo mobile**

Con `preview_resize` preset `mobile`, ricarica `progetti.html` e le due pagine di dettaglio. Con `preview_snapshot` verifica che la griglia progetti e la `project-meta__grid` (che a <=768px passa a 2 colonne) e la galleria (1 colonna) non rompano il layout.
Expected: nessun overflow orizzontale, meta su 2 colonne, galleria su 1 colonna.

- [ ] **Step 3: Screenshot di prova (facoltativo)**

Con `preview_screenshot` cattura `progetti.html` con filtro BIM attivo e una delle due pagine di dettaglio, come prova visiva per Roberto.

- [ ] **Step 4: Commit di eventuali fix**

Se nei passi precedenti emergono correzioni, applicale e committa:

```bash
git add -A
git commit -m "Fix layout issues on BIM cards/pages after preview check"
```

Se non emergono fix, salta il commit.

---

## Note post-scaffolding (fuori da questo piano)

Quando le immagini sono pronte, per ciascuna pagina:
1. Creare la cartella `immagini/progetti/<slug>/` (`hotel-la-palma`, `ex-caserma-lupi`).
2. Caricare `copertina_progetto.jpg` (card + hero) e le immagini di galleria (viewport 3D `.jpg`, tavole 2D `.png`).
3. Sostituire nelle card `.project-card__placeholder` con `<img src="immagini/progetti/<slug>/copertina_progetto.jpg" alt="...">`.
4. Sostituire nell'hero e nelle figure `<div class="media-ph">...</div>` con la relativa `<img>`, togliendo la classe `gallery-doc--placeholder`.
5. Rivedere i valori meta (Localita/Tipologia/Software) e le didascalie di galleria coi dati reali.
6. Pubblicare secondo la convenzione (memoria `pubblicare-render-progetto`).

## Self-review (esito)

- **Copertura spec:** collocazione (Task 1), pagine dettaglio senza render (Task 2/3), strip meta a 4 campi con Progetto (Task 2/3 Step 2), narrazione dedicata via didascalie (galleria Task 2/3), placeholder e convenzione immagini (Note post-scaffolding), fuori scope rispettato (nessuna modifica a nav/JS/CSS condiviso). Testi congelati riportati verbatim dallo spec.
- **Placeholder scan:** l'unico rimando a file esterno e' "incollare il blocco `<style>` di casa-dd" — istruzione precisa su file esistente, con CSS aggiuntivo fornito per intero; non e' un TODO.
- **Coerenza nomi:** classi (`project-card__placeholder`, `media-ph`, `gallery-doc--placeholder`, `gallery-item--wide`, `project-meta__*`) usate in modo identico in tutte le task; `data-category="bim"` combacia col `data-filter="bim"` esistente; slug/href coerenti tra card e pagine.
