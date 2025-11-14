document.addEventListener('DOMContentLoaded',()=>{
  const displayNameEl = document.getElementById('displayName');
  const btnLogin = document.getElementById('btnLogin');
  const loginSection = document.getElementById('login');
  const trackerSection = document.getElementById('tracker');
  const addRunForm = document.getElementById('addRun');
  const runsEl = document.getElementById('runs');

  function loadRuns(){
    const raw = localStorage.getItem('souls_runs')||'[]';
    return JSON.parse(raw);
  }
  function saveRuns(r){
    localStorage.setItem('souls_runs', JSON.stringify(r));
  }
  function render(){
    runsEl.innerHTML='';
    const runs = loadRuns();
    runs.forEach((run,i)=>{
      const li = document.createElement('li');
      li.textContent = `${run.boss} — ${run.time} (${run.by})`;
      runsEl.appendChild(li);
    });
  }

  btnLogin.addEventListener('click', ()=>{
    const name = displayNameEl.value.trim()||'Anonymous';
    localStorage.setItem('souls_user', name);
    loginSection.classList.add('hidden');
    trackerSection.classList.remove('hidden');
    render();
  });

  addRunForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const boss = document.getElementById('boss').value.trim();
    const time = document.getElementById('time').value.trim();
    const by = localStorage.getItem('souls_user')||'Anonymous';
    if(!boss||!time) return;
    const runs = loadRuns();
    runs.unshift({boss,time,by,ts:Date.now()});
    saveRuns(runs);
    render();
    addRunForm.reset();
  });

  // auto-login if user exists
  const existing = localStorage.getItem('souls_user');
  if(existing){
    loginSection.classList.add('hidden');
    trackerSection.classList.remove('hidden');
    render();
  }
});
