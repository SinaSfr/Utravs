document.addEventListener("DOMContentLoaded", function () {

    const isDesktop = window.innerWidth > 1024;
    const requiredFiles = isDesktop
      ? ["utravs.ui.min.css"]
      : ["utravs-mob.ui.min.css"];
  
    function checkAllResourcesLoaded() {
      const resources = performance.getEntriesByType("resource");
      const loadedFiles = resources
        .map((res) => res.name.split("/").pop()) 
        .filter((name) => requiredFiles.includes(name));
      
      return requiredFiles.every((file) => loadedFiles.includes(file));
    }
  
    if(document.getElementById("search-box")){
      function fetchEngine() {
        try {
          const xhrobj = new XMLHttpRequest();
          xhrobj.open("GET", "search-engine.bc");
          xhrobj.send();
    
          xhrobj.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              const container = document.getElementById("search-box");
              container.innerHTML = xhrobj.responseText;
    
              const scripts = container.getElementsByTagName("script");
              for (let i = 0; i < scripts.length; i++) {
                const scriptTag = document.createElement("script");
                if (scripts[i].src) {
                  scriptTag.src = scripts[i].src;
                  scriptTag.async = false;
                } else {
                  scriptTag.text = scripts[i].textContent;
                }
                document.head.appendChild(scriptTag).parentNode.removeChild(scriptTag);
              }
            }
          };
        } catch (error) {
          console.error("A problem has occurred. Please be patient.", error);
        }
      }

      function waitForFiles() {
        if (checkAllResourcesLoaded()) {
          fetchEngine();
        } else {
          setTimeout(waitForFiles, 500);
        }
      }
      waitForFiles();
    }
  

  
  });


  document.addEventListener("DOMContentLoaded", function () {
    const isHomePage = window.location.pathname === "/"; 
    const isNotHome = !isHomePage;
  
    const flightItem = document.querySelector('li[data-id="flight"]');
    const hotelItem = document.querySelector('li[data-id="hotel"]');
  
    if (isNotHome) {
      if (flightItem) {
        flightItem.addEventListener("click", function (e) {
          e.preventDefault();
          window.location.href = "/flight"; 
        });
      }
  
      if (hotelItem) {
        hotelItem.addEventListener("click", function (e) {
          e.preventDefault();
          window.location.href = "/hotel"; 
        });
      }
    } 
    else {
      if (flightItem) {
        flightItem.addEventListener("click", function () {
          check_searchHistory('flight');
          check_landing('flight');
        });
      }
  
      if (hotelItem) {
        hotelItem.addEventListener("click", function () {
          check_searchHistory('hotel');
          check_landing('hotel');
        });
      }
    }
  });
  

  const headerMenu = document.querySelector(".header-menu");
  const headerMenuClose = document.querySelector(".header-menu-close");
  const bars3 = document.querySelector(".bars3");
  
  if (window.innerWidth >= 1024) {
    headerMenuClose.addEventListener("click", function () {
      headerMenu.style.visibility = "hidden";
      headerMenu.style.opacity = "0";
      document.body.classList.remove("overflow-hidden");
    });
  
    bars3.addEventListener("click", function () {
      headerMenu.style.visibility = "visible";
      headerMenu.style.opacity = "1";
      document.body.classList.add("overflow-hidden");
    });
  } else {
    headerMenuClose.addEventListener("click", function () {
      headerMenu.style.transform = "translateX(-1024px)";
      document.body.classList.remove("overflow-hidden");
    });
  
    bars3.addEventListener("click", function () {
      headerMenu.style.transform = "translateX(0)";
      document.body.classList.add("overflow-hidden");
    });
  }
  
  
  
  document.addEventListener("DOMContentLoaded", function () {
    const toggleDropdowns = document.querySelectorAll(".toggle-dropdown");
    const dropdownIcons = document.querySelectorAll(".dropdown-icon");
  
    toggleDropdowns.forEach((toggle, index) => {
      const submenu = toggle.nextElementSibling;
      const dropdownIcon = dropdownIcons[index];
  
      toggle.addEventListener("click", function () {
        dropdownIcon.classList.toggle("rotate-180");
  
        if (submenu.style.maxHeight) {
          submenu.style.maxHeight = null;
          submenu.style.opacity = "0";
        } else {
          submenu.style.maxHeight = submenu.scrollHeight * 10 + "px";
          submenu.style.opacity = "1";
        }
      });
    });
  });
  
  //form contact
  function uploadDocumentContact(args) {
    document.querySelector("#contact-form-resize .Loading_Form").style.display =
      "block";
    const captcha = document
      .querySelector("#contact-form-resize")
      .querySelector("#captchaContainer input[name='captcha']").value;
    const captchaid = document
      .querySelector("#contact-form-resize")
      .querySelector("#captchaContainer input[name='captchaid']").value;
    const stringJson = JSON.stringify(args.source?.rows[0]);
    $bc.setSource("cms.uploadContact", {
      value: stringJson,
      captcha: captcha,
      captchaid: captchaid,
      run: true,
    });
  }
  
  function refreshCaptchaContact(e) {
    $bc.setSource("captcha.refreshContact", true);
  }
  
  async function OnProcessedEditObjectContact(args) {
    var response = args.response;
    var json = await response.json();
    var errorid = json.errorid;
    if (errorid == "6") {
      document.querySelector("#contact-form-resize .Loading_Form").style.display =
        "none";
      document.querySelector("#contact-form-resize .message-api").innerHTML =
        "Your request has been successfully submitted.";
    } else {
      refreshCaptchaContact();
      setTimeout(() => {
        document.querySelector(
          "#contact-form-resize .Loading_Form"
        ).style.display = "none";
        document.querySelector("#contact-form-resize .message-api").innerHTML =
          "An error occurred, please try again.";
      }, 2000);
    }
  }
  
  async function RenderFormContact() {
    var inputElementVisa7 = document.querySelector(
      " .about-form-message textarea[data-bc-text-input]"
    );
    inputElementVisa7.setAttribute("placeholder", "Message");
  
    var inputElementVisa7 = document.querySelector(
      " .about-form-email input[data-bc-text-input]"
    );
    inputElementVisa7.setAttribute("placeholder", "Email");
  }
  
  //form suggest
  function uploadDocumentSuggest(args) {
    document.querySelector("#suggest-form-resize .Loading_Form").style.display =
      "block";
    const captcha = document
      .querySelector("#suggest-form-resize")
      .querySelector("#captchaContainer input[name='captcha']").value;
    const captchaid = document
      .querySelector("#suggest-form-resize")
      .querySelector("#captchaContainer input[name='captchaid']").value;
    const stringJson = JSON.stringify(args.source?.rows[0]);
    $bc.setSource("cms.uploadSuggest", {
      value: stringJson,
      captcha: captcha,
      captchaid: captchaid,
      run: true,
    });
  }
  
  function refreshCaptchaSuggest(e) {
    $bc.setSource("captcha.refreshSuggest", true);
  }
  
  async function OnProcessedEditObjectSuggest(args) {
    var response = args.response;
    var json = await response.json();
    var errorid = json.errorid;
    if (errorid == "6") {
      document.querySelector("#suggest-form-resize .Loading_Form").style.display =
        "none";
      document.querySelector("#suggest-form-resize .message-api").innerHTML =
        "Your request has been successfully submitted.";
  
        setTimeout(() => {
          location.reload();
        }, 2000);


    } else {
      refreshCaptchaSuggest();
      setTimeout(() => {
        document.querySelector(
          "#suggest-form-resize .Loading_Form"
        ).style.display = "none";
        document.querySelector("#suggest-form-resize .message-api").innerHTML =
          "An error occurred, please try again.";
      }, 2000);
    }
  }
  
  async function RenderFormSuggest() {
    var inputElementVisa7 = document.querySelector(
      " .left-form-message textarea[data-bc-text-input]"
    );
    inputElementVisa7.setAttribute("placeholder", "Message");
  
    var inputElementVisa7 = document.querySelector(
      " .left-form-name input[data-bc-text-input]"
    );
    inputElementVisa7.setAttribute("placeholder", "Name");
  
    var inputElementVisa7 = document.querySelector(
      " .left-form-number input[data-bc-text-input]"
    );
    inputElementVisa7.setAttribute("placeholder", "Phone Number");
  
    var inputElementVisa7 = document.querySelector(
      " .left-form-payment input[data-bc-text-input]"
    );
    inputElementVisa7.setAttribute("placeholder", "invoice ");
  
    var inputElementVisa7 = document.querySelector(
      " .left-form-email input[data-bc-text-input]"
    );
    inputElementVisa7.setAttribute("placeholder", "Email");
  }
  