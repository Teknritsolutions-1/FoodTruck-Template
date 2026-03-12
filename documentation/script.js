/* copy code */

document.querySelectorAll(".copy-btn").forEach(btn => {

btn.addEventListener("click", () => {

const code = btn.nextElementSibling.innerText;

navigator.clipboard.writeText(code);

btn.innerText="Copied!";

setTimeout(()=>{
btn.innerText="Copy";
},2000);

});

});


/* simple search */

const searchBox=document.getElementById("searchBox");

searchBox.addEventListener("keyup", function(){

const text=this.value.toLowerCase();

document.querySelectorAll("section").forEach(section=>{

if(section.innerText.toLowerCase().includes(text)){
section.style.display="block";
}else{
section.style.display="none";
}

});

});