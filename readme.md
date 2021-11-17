<h1>Kanaria & Singular BOT</h1>
<p>Multi bot tools to observe the Kanaria and Singular markets in real-time</p>

<h2>What does it do</h2>
<p>The BOTs takes live events from the Kasuma blockchain, filtering remark::2.0.0 for Kanaria and, for the moment, remerk::1.0.0 for Singular. Each BOT has its own menu to create a filter and customize your feeds.</p>
  
<p>We have improved the experience by dividing the output into separate channels. In this way, it's possible to personalize your feed and keep it more organized. We developed this BOTs for Telegram and Discord.
Here you can find the live BOTs
</p>
  <ul>
    <li>Telegram Kanaria LIST:</li>
    <li>Telegram Singular LIST:</li>
    <li>Discord Kanara All LIST:</li>
    <li>Discord Kanaria All BUY:</li>
  </ul>
  
<h2>Installation</h2>
<p>Note: NodeJS 14+ is required and also NPM<br>
<code>
  git clone https://github.com/MarcooRo/birdWatchingBot.git
</code>
 <br>Both the root and the folder must be initialized <code>npm i</code></p>

<h2>Usage</h2>
<p>The tools is divided into several part:<br>
  <ul>
    <li><b>catchEvents.js</b><br>Observe the blocks on the Kusama network and intercept the Remerks, and filter the versions.</li>  
    <li><b>scriptUtils folder</b><br>In this folder the Remark is analyzed and the message is generated.</li>  
    <li><b>Bot1-0-0 & Bot2-0-0 folder</b><br>Is where you manage the bot and send messages.</li>
  </ul>
  
 <h2>Possibilità</h2>
  <p>We have split the scripts so that the bots are highly customizable, we invite you to visit the page of <a href="https://github.com/rmrk-team/rmrk-spec" target="_blank">Remerk Spec</a> where to find all the events that can be intercepted in the block, such as MINT and the others. Have fun!</p>
  
 <h2>Note</h2>
 <p>At the moment only Kanaria use the 2.0.0 protocol, when there is integration in Singular this bot will be updated to allow the correct sending of the message.</p>
