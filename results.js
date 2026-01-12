import { db } from "./firebase.js";
import { collection, query, where, getDocs } from
"https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const resultsDiv = document.getElementById("results");

async function loadResults(){

  const params = new URLSearchParams(window.location.search);
  const bloodRaw = decodeURIComponent(params.get("blood") || "");
  const stateRaw = decodeURIComponent(params.get("state") || "");
  const cityRaw = decodeURIComponent(params.get("city") || "");

  if(!bloodRaw || !stateRaw || !cityRaw){
    resultsDiv.innerHTML = "Invalid search.";
    return;
  }

  const bloodKey = bloodRaw.trim().toUpperCase();
  const stateKey = stateRaw.trim().toLowerCase();
  const cityKey = cityRaw.trim().toLowerCase();

  try{
    const q = query(collection(db,"donors"),
      where("bloodKey","==",bloodKey),
      where("stateKey","==",stateKey),
      where("cityKey","==",cityKey)
    );

    const data = await getDocs(q);
    resultsDiv.innerHTML = "";

    if(data.empty){
      resultsDiv.innerHTML = `
        <div class="result">
          ❌ No donors found for <b>${bloodKey}</b> in <b>${cityRaw}</b>
        </div>
      `;
      return;
    }

    data.forEach(d=>{
      const x = d.data();
      resultsDiv.innerHTML += `
        <div class="result">
          <b>${x.name}</b><br>
          🩸 ${x.blood}<br>
          📞 ${x.phone}<br>
          📧 ${x.email}<br>
          📍 ${x.address}, ${x.city}, ${x.state}
        </div>
      `;
    });

  }catch(e){
    resultsDiv.innerHTML = "Error: " + e.message;
  }
}

loadResults();
