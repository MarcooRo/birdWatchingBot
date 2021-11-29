<h1>Kanaria & Singular BOT</h1>
<p>Multi bot tools to observe the Kanaria and Singular markets in real-time</p>

<h2>What does it do</h2>
<p>The BOTs takes live events from the Kasuma blockchain, filtering remark::2.0.0 for Kanaria and, for the moment, remerk::1.0.0 for Singular. Each BOT has its own menu to create a filter and customize your feeds.</p>
  
<p>We have improved the experience by dividing the output into separate channels. In this way, it's possible to personalize your feed and keep it more organized. We developed this BOTs for Telegram and Discord.
Here you can find the live BOTs
</p>
  <ul>
  <li>Telegram Kanaria LIST: <a href='https://telegram.me/birdWatchingRMRKBot'>@birdWatchingRMRKBot</a></li>
    <li>Telegram Singular LIST: <a href='https://telegram.me/watchingSingularBot'>@watchingSingularBot</a></li>
    <li>Discord Kanara & Singular with channel for All LIST & BUY: <a href="https://discord.gg/Sxb8cXJD">Discord link</a></li>
  </ul>
  
<h2>Installation & Usage</h2>
<p>Note: NodeJS 16+ is required and also NPM<br><br>
<code>
  git clone https://github.com/MarcooRo/birdWatchingBot.git
</code>
<br><br>
Both the root and the folder must be initialized <code>npm i</code>
</p>
<p>The project uses docker to separate all the components that make up the project, the infrastructure is composed of containers: <code>bot1-0-0</code>, <code>bot2-0-0</code> for the user interface on telegram. <code>mysql1</code>, <code>mysql2</code> for user management and set filters. Two database monitoring services: <code>phphmyadmin1</code>, <code>phpmyadmin2</code>.
Each container is running with <code>forever.js</code> to make sure to perform an auto rebuild of the script in case of malfunction</p> 

<h4>List of commands</h4>
<p>
1. <code>docker-compose build</code> Create images from docker-compose.yml<br>
2. <code>docker-compose up -d mysql1-0-0 mysql2-0-0 phpmyadmin1 phpmyadmin2</code><br>
3. Import SQL databases via control panel phpmyadmin<br>
4. <code>docker-compose up -d bot1-0-0 bot 2-0-0</code> Activate telegram bots and interfaces<br>
5. <code>docker-compose up nodejs</code> RUN del watcher events<br>
</p>

<p>The tools is divided into several part:<br>
  <ul>
    <li><code>catchEvents.js</code><br>Observe the blocks on the Kusama network and intercept the Remerks, and filter the versions.</li>  
    <li><code>scriptUtils folder</code><br>In this folder the Remark is analyzed and the message is generated.</li>  
    <li><code>discordBot.js, discordUtils & manageDiscord.js</code><br>They manage the creation and sending of the message to the discord bots. Discord message are. Discord messages are sent in embed. They are always divided into remerk 1.0.0 and 2.0.0. a channel for the list and one for the buy.</li> 
    <li><code>dumpbuild folder</code><br>
      We have built a script that destructures the dump provided by the official remerk documentation, here, this creates subfolders categorized, at the moment by type of object and all bird, in the folder thare is JSON file with the fields that you want to keep from the original metadata. In the script you can select which fields to keep. At the moment we hold: thumb, slot and metadata. This is just an example, we use the SOLT to determine what type of object is in the remark. We did this to create a much lighter file that is easy to pars.
  </ul>
</p>
  
 <h2>Possibility</h2>
  <p>We have split the scripts so that the bots are highly customizable, we invite you to visit the page of <a href="https://github.com/rmrk-team/rmrk-spec" target="_blank">Remerk Spec</a> where to find all the events that can be intercepted in the block, such as MINT and the others. Have fun!</p>
  
 <h2>Note</h2>
 <p>At the moment only Kanaria use the 2.0.0 protocol, when there is integration in Singular this bot will be updated to allow the correct sending of the message.</p>
