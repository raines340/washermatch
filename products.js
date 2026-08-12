<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>WasherMatch — Find Your Pressure Washer</title>
<style>
body{font-family:Arial,sans-serif;margin:0;background:#f4f6f8;color:#17202a}.wrap{max-width:900px;margin:auto;padding:48px 20px}.hero{background:#fff;padding:42px;border-radius:18px;box-shadow:0 8px 30px #0001}h1{font-size:42px;margin:0 0 12px}p{line-height:1.6}.question{margin-top:28px}.options{display:flex;flex-wrap:wrap;gap:10px}.options button{padding:12px 16px;border:1px solid #ccd3da;background:white;border-radius:10px;cursor:pointer}.options button.selected{border-color:#111;background:#111;color:white}.next{margin-top:30px;padding:14px 24px;border:0;border-radius:10px;background:#111;color:white;font-weight:bold;cursor:pointer}.result{margin-top:30px;padding:24px;background:#eef6ff;border-radius:14px}.muted{color:#64707d}
</style></head>
<body><div class="wrap"><section class="hero">
<div class="muted">WASHERMATCH</div><h1>Find the right pressure washer for the job.</h1><p>Answer a few questions and WasherMatch will compare machines based on what you actually need to clean.</p>
<div id="app"></div></section></div>
<script>
const questions=[
 {key:'job',title:'What are you cleaning?',opts:[['car','Cars & vehicles'],['patio','Patio'],['deck','Deck'],['driveway','Driveway'],['house','House exterior'],['furniture','Outdoor furniture']]},
 {key:'power',title:'Electric or gas?',opts:[['electric','Electric'],['gas','Gas'],['','I am not sure']]},
 {key:'budget',title:'What is your budget?',opts:[[200,'Under $200'],[300,'$200–$300'],[500,'$300–$500'],[800,'$500+']]},
 {key:'portability',title:'How important is portability?',opts:[[5,'Very important'],[3,'Somewhat important'],[1,'Not important']]}
];
let i=0, answers={}; const root=document.getElementById('app');
function render(){let q=questions[i];root.innerHTML=`<div class="question"><h2>${q.title}</h2><div class="options">${q.opts.map(o=>`<button class="${answers[q.key]===o[0]?'selected':''}" onclick="pick(${JSON.stringify(o[0])})">${o[1]}</button>`).join('')}</div><button class="next" onclick="next()">${i===questions.length-1?'See My Matches':'Next'}</button></div>`}
function pick(v){answers[questions[i].key]=v;render()}
function next(){if(answers[questions[i].key]===undefined)return alert('Choose an option first.');if(i<questions.length-1){i++;render()}else{root.innerHTML=`<div class="result"><h2>Recommendation engine ready</h2><p>Your answers have been collected. The next build step is connecting this interface to the product scoring engine and live affiliate catalog.</p><p class="muted">Answers: ${JSON.stringify(answers)}</p></div>`}}
render();
</script></body></html>
