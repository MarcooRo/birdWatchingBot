<h1>Kanaria & Singular BOT</h1>
<h2>Multi bot tools per osservare in tempo reale i movimenti nei market di Kanaria e Singular</h2>

<p>I BOT leggono gli standards remerk 2.0.0 per Kanaria e 1.0.0 per Singular, interactions con il LIST and BUY<br>
Su Telegram è possibile creare feed personalizzati in base alle prorpie esigenze e ricevere gli eventi live.</p>
  
<p>Per avere un feed ordinato abbiamo pensato di dividere i canali. Per tanto potete trovare le versioni funzionantei a questi indirizzi:</p>
  <ul>
    <li>Telegram Kanaria LIST (personalizzabile):</li>
    <li>Telegram Singular LIST (personalizzabile):</li>
    <li>Discord Kanara All LIST:</li>
    <li>Discord Kanaria All BUY:</li>
  </ul>


<h3>Come funziona</h3>
<p>Il tools si divide in diversi script.<br>

  <b>catchEvents.js</b><br>
  Questo script ha il compito di osservare i blocchi sulla rete Kusama. successivamene vengono bandati a due funzioni che verificano la presenza di RMRK 2.0.0 o 1.0.0. Queste funzioni smistano i Remerk al seconod script, il generatore di messaggio.
  
  <b>Filter.js</b>
  Questo script analizza il remark e ne crea un messaggio testuale.
  Questa parte è altamente castomizzabile, e si può modificare a piacimento si usando il remark che interfacciandosi con un dump.
  
  <b>Bot.js</b>
  Lato BOT abbiamo creato un sistema che possa fare i much tra il remerk arrivato e il filtro ipostato dell'utente.
  Questo prevede la creazione di un DB per immagazzinare il filtri degli utenti.
  Quando il much tra la tipologia di remark (es: 2.0.0 + LIST + Kanaria Brids) e il fitlro dell'utenti il bot invia il feed. 
