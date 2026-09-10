# Sistema prenotazioni — Google Calendar

Il sito legge la disponibilità da un calendario Google e scrive gli appuntamenti
confermati su un altro. **Nessun database.**

- Calendario **Disponibilità** → lo staff ci mette gli eventi "aperto alle prenotazioni"
- Calendario **Appuntamenti** → il sito ci scrive gli appuntamenti confermati (può essere
  il calendario principale dell'account)

Finché le variabili d'ambiente non sono configurate, la pagina `/prenota` mostra un
messaggio di cortesia e non blocca il resto del sito.

---

## 1. Google Cloud — service account (una tantum, ~10 min)

1. Vai su <https://console.cloud.google.com/> con l'account Google dell'attività.
2. In alto, selettore progetti → **Nuovo progetto** → nome es. `MP Prenotazioni` → **Crea**.
3. Barra di ricerca → **Google Calendar API** → **Abilita**.
4. Menu ☰ → **IAM e amministrazione → Account di servizio** → **Crea account di servizio**
   - Nome: `prenotazioni-sito` → **Crea e continua** → (nessun ruolo) → **Fine**.
5. Apri l'account di servizio creato → scheda **Chiavi** → **Aggiungi chiave → Crea nuova
   chiave → JSON**. Si scarica un file `.json`: **tienilo privato**.
6. Dal JSON ti servono due campi:
   - `client_email` — es. `prenotazioni-sito@mp-prenotazioni.iam.gserviceaccount.com`
   - `private_key` — il blocco `-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n`

## 2. Google Calendar — 2 calendari + condivisione

1. <https://calendar.google.com> → colonna sinistra → **Altri calendari** → **+** →
   **Crea nuovo calendario** → nome `MP – Disponibilità` → **Crea**.
   (Per gli appuntamenti puoi creare un secondo calendario `MP – Appuntamenti` oppure
   usare il calendario principale dell'account.)
2. Per **ciascuno** dei due calendari:
   - Passa il mouse sul nome → **⋮ → Impostazioni e condivisione**
   - **Condividi con persone e gruppi specifici → Aggiungi persone** → incolla la
     `client_email` → permesso **"Apportare modifiche agli eventi"** → **Invia**
   - **Integra il calendario** → copia **ID calendario**
     (es. `abcd1234@group.calendar.google.com`; per il calendario principale è l'indirizzo Gmail)

## 3. Variabili d'ambiente su Vercel

Progetto **mpwelnesslounge** → **Settings → Environment Variables** (ambiente Production e Preview):

| Nome | Valore |
|---|---|
| `GOOGLE_CLIENT_EMAIL` | la `client_email` del service account |
| `GOOGLE_PRIVATE_KEY` | la `private_key` (incolla tutto, anche `\n` e `BEGIN/END`) |
| `GOOGLE_CALENDAR_AVAILABILITY_ID` | ID del calendario **Disponibilità** |
| `GOOGLE_CALENDAR_APPOINTMENTS_ID` | ID del calendario **Appuntamenti** |
| `BOOKING_TIMEZONE` | `Europe/Rome` (opzionale) |

Poi **Deployments → ⋮ sull'ultimo → Redeploy**.

Per lo sviluppo locale: copia `.env.example` in `.env.local` e compila gli stessi valori.

## 4. Uso quotidiano

- **Aprire fasce prenotabili:** crea un evento sul calendario **Disponibilità** nella
  fascia desiderata (es. `Aperto` mer 14:00–20:00). Il titolo è libero.
- Il sito propone gli orari **dentro** quelle fasce, con passo 15 min, durata pari al
  servizio scelto, 10 min di margine tra un appuntamento e l'altro, preavviso minimo 12 h,
  fino a 45 giorni avanti.
- **Bloccare:** accorcia/elimina l'evento in Disponibilità, oppure metti un evento
  occupato sul calendario Appuntamenti (blocca comunque quella fascia).
- Ogni prenotazione crea un evento sul calendario Appuntamenti con nome, telefono, email
  e note del cliente.

## 5. Parametri e limiti

- Buffer, preavviso, passo e orizzonte: `src/lib/booking.ts` → `BOOKING_CONFIG`.
- Catalogo servizi e durate: `src/lib/services.ts`.
- **Un solo flusso**: non c'è ancora la scelta della professionista.
- **Email al cliente**: l'invito parte dal calendario Appuntamenti. Con un account Gmail
  gratuito e un calendario secondario, gli inviti automatici potrebbero non partire
  (serve Google Workspace o Domain-Wide Delegation). In quel caso il sistema registra
  comunque l'appuntamento e mostra "ti contatteremo per confermare"; come passo
  successivo si può aggiungere l'invio email dedicato (es. Resend).
