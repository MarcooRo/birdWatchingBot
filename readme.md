<h1>Kanaria & Singular BOT</h1>
<p>Multi bot tools per osservare in tempo reale i movimenti nei market di Kanaria e Singular</p>

<h2>Che cosa Fa</h2>
<p>The BOTs takes live events from the Kasuma blockchain, filtering remark::2.0.0 for Kanaria and for the moment Singular at remerk::1.0.0. We track LIST and BUY. Each BOT has its own menu to create a filter and customize your feeds.<br>
</p>
  
<p>We have improved the experience by dividing the output into separate channels. In this way, it's possible to personalize your feed and keep it more organized. We developed this BOTs for Telegram and Discord.
Here you can find the live BOTs
</p>
  <ul>
    <li>Telegram Kanaria LIST:</li>
    <li>Telegram Singular LIST:</li>
    <li>Discord Kanara All LIST:</li>
    <li>Discord Kanaria All BUY:</li>
  </ul>
  
<h2>Installazione</h2>
<p>Occorre inizializzare si la root principale `npm i` che la root del bot sempre con `npm i`</p>

<h2>Come funziona</h2>
<p>Il tools si divide in diversi script.<br>

  <b>catchEvents.js</b><br>
  Ha il compito di osservare i blocchi sulla rete Kusama e intercettare i Remerk, e filtrare le versioni.
  
  <b>scriptUtils</b>
  In questa cartella viene analizzato il Remark e generato il messaggio.
  
  <b>Bot1-0-0 & Bot2-0-0</b>
  E dove si gestisce l'invio del messaggio ai bot.
  
  <h2>Possibilità</h2>
  <p>Abbiamo diviso gli script in modo che i bot siano altamente personalizzabili, vi invito a visitare la pagina di <a href="https://github.com/rmrk-team/rmrk-spec" target="_blank">Remerk Spec</a> dove trovare tutti gli eventi che si possono intercettare dal blocco, come il MINT e gli altri. Buon divertimento!</p>
  
 <h2>Importante</h2>
 <p>Al momento solo Kanaria utilizza il protocollo 2.0.0, quando ci sarà l'integrazione in Singular questo bot andrà aggiornato per permettere il corretto invio del messaggio.<br>
  Per fortuna sarà una cosa semplice!</p>
