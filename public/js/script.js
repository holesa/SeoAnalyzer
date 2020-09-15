const submitBtn     = document.getElementById("form-submit-btn"),
      formInputUrl  = document.getElementById("form-input-url"),
      preloader     = document.getElementById("preloader"),
      homepage      = document.getElementById("homepage"),
      logo          = document.getElementById("logo");

// Load preloader CSS after submitting a form
submitBtn.addEventListener("click",()=>{
    if(formInputUrl.value !== ""){
       preloader.style.display = "flex"; 
       homepage.style.display = "none"; 
       logo.style.display = "none"; 
     }
})


