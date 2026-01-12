import { auth, db } from "./firebase.js";
import { addDoc, collection, query, where, getDocs } from
"https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const addressInput = document.getElementById("address");
const bloodInput = document.getElementById("blood");
const stateSelect = document.getElementById("state");
const citySelect = document.getElementById("city");

document.getElementById("save").addEventListener("click", async () => {

  if(
    !nameInput.value ||
    !phoneInput.value ||
    !emailInput.value ||
    !addressInput.value ||
    !bloodInput.value ||
    !stateSelect.value ||
    !citySelect.value
  ){
    alert("Please fill all fields");
    return;
  }

  const user = auth.currentUser;
  if(!user){
    alert("Please login again");
    return;
  }

  const blood = bloodInput.value.trim().toUpperCase();
  const state = stateSelect.value.trim();
  const city = citySelect.value.trim();

  const bloodKey = blood;
  const stateKey = state.toLowerCase();
  const cityKey = city.toLowerCase();

  try{
    // Prevent duplicate donor per user
    const q = query(collection(db,"donors"), where("uid","==",user.uid));
    const existing = await getDocs(q);
    if(!existing.empty){
      alert("You have already registered as a donor");
      return;
    }

    await addDoc(collection(db,"donors"),{
      name: nameInput.value,
      phone: phoneInput.value,
      email: emailInput.value,
      address: addressInput.value,
      blood,
      state,
      city,
      bloodKey,
      stateKey,
      cityKey,
      uid: user.uid,
      created: new Date()
    });

    alert("Donor registered successfully!");

    nameInput.value="";
    phoneInput.value="";
    emailInput.value="";
    addressInput.value="";
    bloodInput.value="";
    stateSelect.value="";
    citySelect.value="";

  }catch(e){
    alert("Error: " + e.message);
  }
});
