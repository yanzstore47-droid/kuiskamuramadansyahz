const questions = [
  {
    icon:"🫧",
    q:"Kalau aku punya waktu luang, aktivitas mana yang paling cocok?",
    a:["Main game","Baca buku","Olahraga","Tidur seharian"],
    correct:0
  },
  {
    icon:"🎮",
    q:"Kalau diajak bikin konten, tema mana yang paling seru?",
    a:["Konten kuis","Konten masak","Konten otomotif","Konten berita"],
    correct:0
  },
  {
    icon:"📱",
    q:"Benda yang paling sering ada di dekatku adalah...",
    a:["Kamera","HP","Radio","Kalkulator"],
    correct:1
  },
  {
    icon:"🍜",
    q:"Kalau lapar, pilihan yang paling menggoda biasanya...",
    a:["Mie","Salad saja","Es batu","Buah lemon saja"],
    correct:0
  },
  {
    icon:"🎨",
    q:"Warna yang paling cocok dengan tema Kuis Buble ini adalah...",
    a:["Biru","Cokelat tua","Hitam pekat","Abu-abu"],
    correct:0
  },
  {
    icon:"🌙",
    q:"Suasana yang paling cocok untuk ngobrol santai adalah...",
    a:["Malam","Tengah hari panas","Saat hujan es","Subuh sekali"],
    correct:0
  },
  {
    icon:"🚀",
    q:"Kalau punya kesempatan belajar sesuatu baru, aku lebih tertarik...",
    a:["Teknologi","Koleksi batu","Menghafal nomor acak","Tidak mencoba apa pun"],
    correct:0
  },
  {
    icon:"🎬",
    q:"Jenis konten yang paling cocok dibuat dengan Kuis Buble adalah...",
    a:["Interaktif","Dokumen hukum","Laporan keuangan","Katalog suku cadang"],
    correct:0
  },
  {
    icon:"💙",
    q:"Menurut kamu, ciri khas Kuis Buble yang paling menonjol adalah...",
    a:["Bubble lucu","Tampilan serba hitam","Teks kecil tanpa warna","Tidak ada animasi"],
    correct:0
  },
  {
    icon:"🏆",
    q:"Setelah menyelesaikan semua pertanyaan, apa yang kamu dapatkan?",
    a:["Skor dan gelar","Password akun","Hadiah uang otomatis","Tiket pesawat"],
    correct:0
  }
];

let current = 0;
let score = 0;
let playerName = "";
let answered = false;

const $ = id => document.getElementById(id);
const screens = document.querySelectorAll(".screen");

function showScreen(id){
  screens.forEach(s => s.classList.remove("active"));
  $(id).classList.add("active");
  window.scrollTo({top:0,behavior:"smooth"});
}

function createBubbles(){
  const bg = $("bubbleBg");
  for(let i=0;i<26;i++){
    const b = document.createElement("span");
    b.className="bubble";
    const size = 14 + Math.random()*58;
    b.style.width = size+"px";
    b.style.height = size+"px";
    b.style.left = Math.random()*100+"%";
    b.style.animationDuration = (8+Math.random()*13)+"s";
    b.style.animationDelay = (-Math.random()*16)+"s";
    b.style.setProperty("--drift",(Math.random()*180-90)+"px");
    bg.appendChild(b);
  }
}

function loadQuestion(){
  const item = questions[current];
  answered = false;
  $("questionNumber").textContent = current+1;
  $("progressText").textContent = `${current+1} / ${questions.length}`;
  $("progressBar").style.width = `${((current+1)/questions.length)*100}%`;
  $("questionArt").textContent = item.icon;
  $("questionText").textContent = item.q;

  const answers = $("answers");
  answers.innerHTML="";
  item.a.forEach((text,index)=>{
    const btn=document.createElement("button");
    btn.className="answer";
    btn.textContent=text;
    btn.addEventListener("click",()=>selectAnswer(index,btn));
    answers.appendChild(btn);
  });
}

function selectAnswer(index,button){
  if(answered) return;
  answered=true;
  const item=questions[current];
  const buttons=[...document.querySelectorAll(".answer")];
  buttons.forEach(b=>b.disabled=true);

  if(index===item.correct){
    score += 10;
    button.classList.add("correct");
  }else{
    button.classList.add("wrong");
    buttons[item.correct].classList.add("correct");
  }

  setTimeout(()=>{
    current++;
    if(current<questions.length){
      loadQuestion();
    }else{
      showResult();
    }
  },650);
}

function showResult(){
  $("scoreValue").textContent=score;
  $("resultName").textContent=playerName;
  $("resultBar").style.width=score+"%";

  let title="",message="";
  if(score>=90){
    title="Bestie Banget! 💙";
    message="Gila, kamu benar-benar kenal banget! Hampir semua jawaban kamu tepat.";
  }else if(score>=70){
    title="Kamu Lumayan Kenal! 🫧";
    message="Kamu sudah cukup tahu tentang aku. Tinggal sedikit lagi jadi bestie sejati!";
  }else if(score>=50){
    title="Masih Perlu Kenalan 😆";
    message="Jawabanmu belum banyak yang tepat. Coba ulangi dan lihat apakah skor kamu naik.";
  }else{
    title="Kita Kayaknya Baru Kenalan 😂";
    message="Waduh, masih banyak yang belum kamu tahu. Jangan menyerah, coba lagi!";
  }
  $("resultTitle").textContent=title;
  $("resultMessage").textContent=message;
  showScreen("resultScreen");
}

$("startBtn").addEventListener("click",()=>showScreen("nameScreen"));

$("nameNext").addEventListener("click",()=>{
  const value=$("nameInput").value.trim();
  if(!value){
    $("nameError").textContent="Nama belum diisi ya 🫧";
    $("nameInput").focus();
    return;
  }
  playerName=value;
  current=0;score=0;
  $("nameError").textContent="";
  showScreen("quizScreen");
  loadQuestion();
});

$("nameInput").addEventListener("keydown",e=>{
  if(e.key==="Enter") $("nameNext").click();
});

document.querySelectorAll("[data-back]").forEach(btn=>{
  btn.addEventListener("click",()=>showScreen(btn.dataset.back));
});

$("restartBtn").addEventListener("click",()=>{
  current=0;score=0;showScreen("quizScreen");loadQuestion();
});

$("shareBtn").addEventListener("click",async()=>{
  const text=`Aku dapat ${score}/100 di Kuis Buble! 🫧🏆\nCoba tebak seberapa kenal kamu sama aku!`;
  try{
    if(navigator.share){
      await navigator.share({title:"Kuis Buble",text});
    }else{
      await navigator.clipboard.writeText(text);
      $("toast").classList.add("show");
      setTimeout(()=>$("toast").classList.remove("show"),1800);
    }
  }catch(e){}
});

createBubbles();
