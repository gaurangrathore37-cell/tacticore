/* TactiCore: interactive football-learning starter.
   Local progress uses localStorage. Real Google login/cloud sync needs a backend configuration. */
const STORE_KEY = "tacticore_v1";
const defaultState = { lessons: [], bestScore: 0, savedFormations: [], lastFormation: "433" };
let state = loadState();
function loadState(){try{return {...defaultState,...JSON.parse(localStorage.getItem(STORE_KEY)||"{}")}}catch(e){return {...defaultState}}}
function persist(){try{localStorage.setItem(STORE_KEY,JSON.stringify(state));renderDashboard()}catch(e){showToast("Could not save locally. Browser storage may be full.")}}
function showToast(message){const t=document.getElementById("toast");t.textContent=message;t.classList.add("show");clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>t.classList.remove("show"),2400)}
document.getElementById("year").textContent=new Date().getFullYear();

const lessons={
 fundamentals:{title:"Football Fundamentals",intro:"Start with the structure and rules of the game.",sections:[["The objective","Two teams try to score by getting the ball into the opponent's goal. The team with more goals at the end wins, unless competition rules require extra time or a shoot-out."],["The pitch and players","Each team can have up to eleven players on the pitch, including a goalkeeper. A match is generally played in two 45-minute halves, with additional time added by the referee."],["Offside in simple terms","A player is not penalised simply for standing in an offside position. Offside is judged when a teammate plays or touches the ball, and involvement in active play matters. The second-last opponent and the ball help determine the position."],["Restarts","Kick-offs start halves and restart after goals. Throw-ins restart play when the whole ball crosses a touchline. Goal kicks and corner kicks restart play after the ball crosses the goal line, depending on who touched it last."]] },
 positions:{title:"Positions & Roles",intro:"A position gives you responsibilities, not a fixed spot to stand in.",sections:[["Goalkeeper (GK)","Protect the goal, communicate with defenders, and help start attacks with distribution."],["Defenders (CB, LB, RB)","Centre-backs protect central areas and defend the box. Full-backs defend wide areas and may support attacks when it is safe to do so."],["Midfielders (DM, CM, AM)","Defensive midfielders screen the defence. Central midfielders connect defence and attack, offer passing options, scan for pressure, and help maintain team shape. Attacking midfielders create chances between the lines."],["Forwards (LW, RW, ST)","Wingers stretch the defence and create chances. Strikers threaten space behind, link play, and look for scoring opportunities."],["Simple midfielder habit","Before receiving, scan your surroundings. Offer a clear passing angle, check your shoulder, and move to support the next pass. When defending, stay connected to teammates and press when the team can support you."]] },
 tactics:{title:"Team Tactics",intro:"Tactics describe how a team uses space and works together.",sections:[["Possession","Keep the ball with purposeful passes, good spacing, and options in front, beside, and behind the ball."],["High press","Try to win the ball high up the pitch by pressing together and closing passing lanes. One player pressing alone can be bypassed easily."],["Counterattack","After winning the ball, look for a safe forward pass or space before the opponent reorganises. If the counter is not on, keep possession."],["Defensive block","Stay compact, protect dangerous central spaces, communicate, and move as a unit toward the ball."],["Transitions","The moments just after losing or winning the ball are important. Decide quickly whether to press, recover shape, counter, or keep the ball."]] },
 passing:{title:"Passing & Movement",intro:"Good passing depends on what happens before and after the ball arrives.",sections:[["Scan before receiving","Look over your shoulder before the ball reaches you. Knowing where pressure and teammates are helps you choose your next action."],["Create angles","Do not hide directly behind an opponent. Move a few steps sideways or diagonally so the passer can see you."],["Pass and move","After passing, reposition to offer a new option, draw a marker away, or create space for a teammate."],["First touch","Try to take your first touch toward useful space, away from pressure when possible. Practise with both feet at a comfortable speed."],["Communication","Use clear words and simple signals. Tell teammates when you are available, under pressure, or want the ball played into space."]] },
 training:{title:"Training Ground",intro:"Build reliable habits with safe, repeatable practice.",sections:[["First-touch practice","With a partner or wall, pass gently and control the return. Alternate feet and focus on a calm first touch into space."],["Passing accuracy","Place two markers as a gate and practise passing through it from short distances. Increase distance only when control stays consistent."],["Scanning habit","Before receiving each pass, glance around to identify a target. Say the target aloud, then receive and pass."],["Position-specific learning","Midfielders can practise receiving on the half-turn and choosing a forward or safe pass. Defenders can practise body shape and communication with a partner. For goalkeepers and advanced drills, learn with a qualified coach."],["Practice smart","Warm up, use a suitable playing area, take breaks, and stop if you feel pain or dizziness. Technique and consistency matter more than trying to train at maximum intensity every time."]] },
 history:{title:"Football History & Culture",intro:"Explore how the sport grew into a global game.",sections:[["The modern game","The Football Association in England was formed in 1863 and helped codify a common set of association-football rules."],["Club football","Clubs develop identities, styles, academies, and rivalries. A club's history can include domestic leagues, cups, and continental competitions."],["International football","National teams represent countries in competitions such as the FIFA World Cup and continental championships."],["Legends and eras","Players should be understood in the context of their roles, teammates, tactics, opponents, and era. Simple comparisons can be fun, but no single statistic tells the whole story."],["Keep facts current","Records, squads, standings, and season statistics change. Check official competition, club, and governing-body sources for current information."]] }
};
const lessonDialog=document.getElementById("lessonDialog");let currentLesson="";
document.querySelectorAll(".lesson-open").forEach(b=>b.addEventListener("click",()=>openLesson(b.dataset.lesson)));
function openLesson(id){const l=lessons[id];if(!l)return;currentLesson=id;document.getElementById("lessonTitle").textContent=l.title;document.getElementById("lessonBody").innerHTML=`<p>${l.intro}</p>`+l.sections.map(s=>`<h3>${escapeHtml(s[0])}</h3><p>${escapeHtml(s[1])}</p>`).join("");document.getElementById("markLesson").textContent=state.lessons.includes(id)?"Already explored ✓":"Mark as explored ✓";lessonDialog.showModal()}
document.getElementById("closeLesson").onclick=()=>lessonDialog.close();
document.getElementById("markLesson").onclick=()=>{if(currentLesson&&!state.lessons.includes(currentLesson)){state.lessons.push(currentLesson);persist()}document.getElementById("markLesson").textContent="Explored ✓";showToast("Lesson progress saved on this device.");lessonDialog.close()};
document.getElementById("loginButton").onclick=()=>document.getElementById("loginDialog").showModal();
document.getElementById("closeLogin").onclick=()=>document.getElementById("loginDialog").close();
document.getElementById("loginOkay").onclick=()=>document.getElementById("loginDialog").close();
document.getElementById("menuToggle").addEventListener("click",()=>{const n=document.getElementById("mainNav");n.classList.toggle("open");document.getElementById("menuToggle").setAttribute("aria-expanded",n.classList.contains("open"))});
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("mainNav").classList.remove("open")));

const shapes={
 "433":[["GK",50,91],["RB",15,75],["CB",38,75],["CB",62,75],["LB",85,75],["DM",50,58],["CM",32,44],["CM",68,44],["RW",15,20],["ST",50,13],["LW",85,20]],
 "4231":[["GK",50,91],["RB",15,75],["CB",38,75],["CB",62,75],["LB",85,75],["DM",40,58],["DM",60,58],["RW",15,34],["AM",50,30],["LW",85,34],["ST",50,13]],
 "41212":[["GK",50,91],["RB",15,75],["CB",38,75],["CB",62,75],["LB",85,75],["DM",50,58],["CM",30,43],["CM",70,43],["AM",50,29],["ST",38,13],["ST",62,13]]
};
const shapeNames={"433":"4-3-3","4231":"4-2-3-1","41212":"4-1-2-1-2 Narrow"};
let boardPlayers=[];
function setFormation(key,custom=null){state.lastFormation=key;document.getElementById("formationSelect").value=key;document.getElementById("currentFormationLabel").textContent=shapeNames[key];boardPlayers=custom?custom.map(p=>({...p})):shapes[key].map((p,i)=>({role:p[0],x:p[1],y:p[2],id:i}));renderPlayers();persist()}
function renderPlayers(){const layer=document.getElementById("playersLayer");layer.innerHTML="";boardPlayers.forEach((p,i)=>{const b=document.createElement("button");b.className="tactic-player"+(selectedPlayer===i?" selected":"");b.style.left=p.x+"%";b.style.top=p.y+"%";b.innerHTML=`${escapeHtml(p.role)}<span class="role-label">${escapeHtml(p.role)}</span>`;b.title="Tap to select; double-click to rename";b.setAttribute("aria-label",`Player ${p.role}; position ${Math.round(p.x)} percent across and ${Math.round(p.y)} percent down`);b.addEventListener("click",e=>{e.stopPropagation();if(Date.now()-lastMoved<180)return;selectedPlayer=i;renderPlayers()});b.addEventListener("dblclick",e=>{e.preventDefault();const role=prompt("Enter a short role or player label:",p.role);if(role&&role.trim()){boardPlayers[i].role=role.trim().slice(0,14);renderPlayers()}});layer.appendChild(b)})}
let selectedPlayer=null,lastMoved=0;
document.getElementById("bigPitch").addEventListener("click",e=>{if(e.target.closest(".tactic-player"))return;if(selectedPlayer===null){showToast("Select a player first.");return}const rect=e.currentTarget.getBoundingClientRect();boardPlayers[selectedPlayer].x=Math.max(5,Math.min(95,((e.clientX-rect.left)/rect.width)*100));boardPlayers[selectedPlayer].y=Math.max(5,Math.min(95,((e.clientY-rect.top)/rect.height)*100));lastMoved=Date.now();renderPlayers()});
document.getElementById("formationSelect").addEventListener("change",e=>setFormation(e.target.value));
document.querySelectorAll(".use-formation").forEach(b=>b.addEventListener("click",()=>{setFormation(b.dataset.formation);document.getElementById("builder").scrollIntoView({behavior:"smooth"});showToast(shapeNames[b.dataset.formation]+" loaded on the board.")}));
document.getElementById("saveFormation").addEventListener("click",()=>{const name=prompt("Name this formation:",shapeNames[state.lastFormation]+" setup");if(!name||!name.trim())return;state.savedFormations.unshift({name:name.trim().slice(0,50),shape:state.lastFormation,players:boardPlayers.map(p=>({...p})),date:new Date().toISOString()});state.savedFormations=state.savedFormations.slice(0,30);persist();showToast("Formation saved in this browser.")});
document.getElementById("resetFormation").addEventListener("click",()=>{selectedPlayer=null;setFormation(document.getElementById("formationSelect").value);showToast("Board reset.")});
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}

const playerData={
 ronaldo:{name:"Cristiano Ronaldo",role:"Forward",scores:{Finishing:99,Movement:98,Speed:92,Creation:82,Pressing:70}},
 messi:{name:"Lionel Messi",role:"Forward / Creator",scores:{Finishing:96,Movement:96,Speed:85,Creation:99,Pressing:68}},
 modric:{name:"Luka Modrić",role:"Central Midfielder",scores:{Finishing:76,Movement:92,Speed:78,Creation:94,Pressing:87}},
 mbappe:{name:"Kylian Mbappé",role:"Forward",scores:{Finishing:94,Movement:95,Speed:99,Creation:84,Pressing:75}}
};
function renderComparison(){const a=playerData[document.getElementById("playerOne").value],b=playerData[document.getElementById("playerTwo").value];const root=document.getElementById("comparisonResult");root.innerHTML=[a,b].map(p=>`<article class="compare-card"><div class="compare-head"><div><h3>${escapeHtml(p.name)}</h3><span class="muted">${escapeHtml(p.role)}</span></div><div class="compare-initial">${p.name.split(" ").map(x=>x[0]).join("").slice(0,2)}</div></div>${Object.entries(p.scores).map(([k,v])=>`<div class="metric"><span>${k}</span><div class="metric-track"><div class="metric-fill" style="width:${v}%"></div></div><strong>${v}</strong></div>`).join("")}</article>`).join("")}
document.getElementById("playerOne").addEventListener("change",renderComparison);document.getElementById("playerTwo").addEventListener("change",renderComparison);renderComparison();

const questions=[
 {q:"Which player usually protects the space directly in front of the centre-backs?",a:["Striker","Defensive midfielder","Winger","Goalkeeper"],correct:1,why:"A defensive midfielder often screens the defence and helps protect central spaces."},
 {q:"What is the main purpose of a high press?",a:["To keep every player in the penalty area","To waste time","To pressure the opponent high up the pitch","To avoid passing"],correct:2,why:"A coordinated high press tries to force mistakes or win the ball near the opponent's goal."},
 {q:"When is offside position judged for an attacker?",a:["When a teammate plays or touches the ball","Whenever the attacker enters the opponent's half","Only after a shot","Whenever the goalkeeper leaves the goal"],correct:0,why:"Offside position is assessed when a teammate plays or touches the ball; an offence also requires involvement in active play."},
 {q:"What should a midfielder do before receiving a pass?",a:["Always face their own goal","Scan their surroundings","Stand still no matter what","Close their eyes"],correct:1,why:"Scanning helps a midfielder know where teammates, opponents, and open space are."},
 {q:"What is a key advantage of a 4-3-3 shape?",a:["It has no defenders","It guarantees a win","It removes the midfield","It can provide width and several midfield passing options"],correct:3,why:"A 4-3-3 can provide width through forwards and useful passing triangles in midfield, depending on player roles."}
];
let quizIndex=0,quizScore=0,quizAnswered=false;
function renderQuiz(){const q=questions[quizIndex];document.getElementById("quizCounter").textContent=`QUESTION ${String(quizIndex+1).padStart(2,"0")} / ${String(questions.length).padStart(2,"0")}`;document.getElementById("quizProgressBar").style.width=(quizIndex/questions.length*100)+"%";document.getElementById("questionText").textContent=q.q;document.getElementById("answers").innerHTML="";document.getElementById("answerFeedback").textContent="";document.getElementById("answerFeedback").className="answer-feedback";quizAnswered=false;document.getElementById("quizNext").disabled=true;document.getElementById("quizNext").textContent="Choose an answer";q.a.forEach((answer,i)=>{const b=document.createElement("button");b.className="answer-option";b.innerHTML=`<span>${String.fromCharCode(65+i)}</span>${escapeHtml(answer)}`;b.addEventListener("click",()=>answerQuestion(i));document.getElementById("answers").appendChild(b)})}
function answerQuestion(i){if(quizAnswered)return;quizAnswered=true;const q=questions[quizIndex],buttons=[...document.querySelectorAll(".answer-option")];buttons.forEach((b,j)=>{b.disabled=true;if(j===q.correct)b.classList.add("correct");if(j===i&&i!==q.correct)b.classList.add("wrong")});const correct=i===q.correct;if(correct)quizScore++;const fb=document.getElementById("answerFeedback");fb.textContent=(correct?"Correct! ":"Not quite. ")+q.why;fb.classList.add(correct?"good":"bad");const next=document.getElementById("quizNext");next.disabled=false;next.textContent=quizIndex===questions.length-1?"See results":"Next question"}
document.getElementById("quizNext").addEventListener("click",()=>{if(!quizAnswered)return;if(quizIndex<questions.length-1){quizIndex++;renderQuiz()}else{const score=Math.round(quizScore/questions.length*100);state.bestScore=Math.max(state.bestScore,score);persist();document.getElementById("questionText").textContent=`You scored ${quizScore} out of ${questions.length} (${score}%).`;document.getElementById("answers").innerHTML=`<p>${score>=80?"Excellent football knowledge. Keep learning!":score>=60?"Good effort. Review the lessons and try again.":"Good start. Explore the learning hub, then give it another go."}</p>`;document.getElementById("answerFeedback").textContent="Your best score is saved in this browser.";document.getElementById("answerFeedback").className="answer-feedback good";document.getElementById("quizProgressBar").style.width="100%";document.getElementById("quizCounter").textContent="QUIZ COMPLETE";document.getElementById("quizNext").textContent="Try again";document.getElementById("quizNext").onclick=()=>{quizIndex=0;quizScore=0;document.getElementById("quizNext").onclick=null;renderQuiz()}}});
function renderDashboard(){document.getElementById("lessonsCount").textContent=state.lessons.length;document.getElementById("bestScore").textContent=state.bestScore+"%";document.getElementById("dashboardBest").textContent=state.bestScore+"%";document.getElementById("savedCount").textContent=state.savedFormations.length;const root=document.getElementById("savedFormationsList");if(!state.savedFormations.length){root.innerHTML='<div class="empty-state">No saved formations yet. Create one in the tactical board above.</div>';return}root.innerHTML=state.savedFormations.map((s,i)=>`<div class="saved-item"><span><strong>${escapeHtml(s.name)}</strong><br><span class="muted">${escapeHtml(shapeNames[s.shape]||s.shape)} · ${new Date(s.date).toLocaleDateString()}</span></span><span><button data-load="${i}">Load</button> <button data-delete="${i}">Delete</button></span></div>`).join("");root.querySelectorAll("[data-load]").forEach(b=>b.addEventListener("click",()=>{const s=state.savedFormations[+b.dataset.load];selectedPlayer=null;setFormation(s.shape,s.players);document.getElementById("builder").scrollIntoView({behavior:"smooth"});showToast("Saved formation loaded.")}));root.querySelectorAll("[data-delete]").forEach(b=>b.addEventListener("click",()=>{state.savedFormations.splice(+b.dataset.delete,1);persist();showToast("Saved formation deleted.")}))}
document.getElementById("exportData").addEventListener("click",()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="tacticore-my-data.json";a.click();URL.revokeObjectURL(url);showToast("Your data export has been prepared.")});
document.getElementById("clearData").addEventListener("click",()=>{if(!confirm("Clear all TactiCore progress and saved formations from this browser? This cannot be undone unless you exported your data."))return;state={...defaultState,lessons:[],savedFormations:[]};persist();showToast("Local progress cleared.")});
setFormation(state.lastFormation||"433");renderQuiz();renderDashboard();
// TactiCore Supabase Email Authentication
(function () {
  const emailInput = document.getElementById("authEmail");
  const passwordInput = document.getElementById("authPassword");
  const authForm = document.getElementById("authForm");
  const submitButton = document.getElementById("authSubmit");
  const createButton = document.getElementById("loginOkay");
  const signOutButton = document.getElementById("signOutButton");
  const message = document.getElementById("authMessage");
  const loginDialog = document.getElementById("loginDialog");

  if (!authForm || !emailInput || !passwordInput) return;

  let client;
  let isSignUp = false;

  function showMessage(text) {
    message.textContent = text;
  }

  const sdk = document.createElement("script");
  sdk.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js";

  sdk.onload = function () {
    client = window.supabase.createClient(
      "https://vykhzurogtlfanhlhsqh.supabase.co",
      "sb_publishable_oRl89Tsiv1GmWHk-381RZQ_3UE4hcwy"
    );

    client.auth.onAuthStateChange(function (_event, session) {
      signOutButton.hidden = !session;
    });

    authForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const email = emailInput.value.trim();
      const password = passwordInput.value;

      submitButton.disabled = true;
      showMessage("Please wait...");

      try {
        let result;

        if (isSignUp) {
          result = await client.auth.signUp({ email, password });
        } else {
          result = await client.auth.signInWithPassword({
            email,
            password
          });
        }

        if (result.error) throw result.error;

        if (isSignUp && !result.data.session) {
          showMessage("Account created! Check your email to confirm it.");
        } else {
          showMessage(isSignUp ? "Account created!" : "Login successful!");
          if (result.data.session) {
            setTimeout(function () {
              loginDialog.close();
            }, 1000);
          }
        }
      } catch (error) {
        showMessage(error.message || "Something went wrong.");
      } finally {
        submitButton.disabled = false;
      }
    });

    createButton.onclick = function () {
      isSignUp = !isSignUp;
      submitButton.textContent = isSignUp ? "Create account" : "Sign in";
      createButton.textContent = isSignUp ? "Back to sign in" : "Create account";
      passwordInput.autocomplete = isSignUp ? "new-password" : "current-password";
      showMessage("");
    };

    signOutButton.onclick = async function () {
      const { error } = await client.auth.signOut();
      showMessage(error ? error.message : "Signed out successfully.");
    };
  };

  sdk.onerror = function () {
    showMessage("Could not load login service. Check your internet connection.");
  };

  document.head.appendChild(sdk);
})();
