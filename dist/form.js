(()=>{"use strict";const e=document.getElementById("survey-form");new class{sectionElement;backButton;nextButton;skipButton;submitPlaceholder;surveyImageElement;images;currentSection;constructor(e,t,n,i,s,o,r=["img/two.png","img/three.png","img/four.png","img/five.png"],l=1){this.sectionElement=e,this.backButton=t,this.nextButton=n,this.skipButton=i,this.submitPlaceholder=s,this.surveyImageElement=o,this.images=r,this.currentSection=l,this.backButton=document.getElementById("back-button"),this.nextButton=document.getElementById("next-button"),this.skipButton=document.getElementById("skip-button"),this.submitPlaceholder=document.getElementById("submit-placeholder"),this.surveyImageElement=document.getElementById("poll-img"),this.backButton.addEventListener("click",this.backButtonListener.bind(this)),this.nextButton.addEventListener("click",this.nextButtonListener.bind(this)),this.skipButton.addEventListener("click",this.skipButtonListener.bind(this)),this.submitPlaceholder.addEventListener("click",this.submitPlaceholderListener.bind(this)),this.sectionElement.querySelector("#section-submit-1").addEventListener("click",(e=>{e.preventDefault();const t=this.sectionElement.querySelector("#form-section-1"),n=t.querySelectorAll("select")[0],i=n.value,s=t.querySelector('input[name="market"]:checked');if(""!=i)if(s)localStorage.setItem("accountStatus",i),localStorage.setItem("operatingMarket",s.value),this.renderSection("next");else{const e=document.getElementById("operating-market-error");this.displayError(e,"Please select an option.")}else{const e=n.nextElementSibling;this.displayError(e,"Please select an option.")}})),this.sectionElement.querySelector("#section-submit-2").addEventListener("click",(e=>{e.preventDefault();const t=this.sectionElement.querySelector("#form-section-2"),n=t.querySelectorAll("select")[0],i=n.value,s=[t.querySelector("#books"),t.querySelector("#youtube"),t.querySelector("#online"),t.querySelector("#experience")],o=[];if(s.forEach((e=>{e.checked&&o.push(e.value)})),""!=i)if(0!=o.length)localStorage.setItem("investmentFrequency",i),localStorage.setItem("trainingResources",o.join()),this.renderSection("next");else{const e=document.getElementById("training-resources-error");this.displayError(e,"Please select an option.")}else{const e=n.nextElementSibling;this.displayError(e,"Please select an option.")}})),this.sectionElement.querySelector("#section-submit-3").addEventListener("click",(e=>{e.preventDefault();const t=this.sectionElement.querySelector("#form-section-3").querySelectorAll("textarea")[0],n=t.value;if(""!=n)localStorage.setItem("details",n),this.renderSection("next");else{const e=t.nextElementSibling;this.displayError(e,"Please write something.")}})),this.sectionElement.querySelector("#section-submit-4").addEventListener("click",(e=>{e.preventDefault();const t=this.sectionElement.querySelector("#form-section-4"),n=t.querySelector("#full-name"),i=n.value,s=t.querySelector("#email"),o=s.value,r=t.querySelector("#age"),l=r.value,c=/^[a-zA-Z ]+$/.test(i),u=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(o);if(c)if(u)if(""!=l&&"0"!=l)localStorage.setItem("fullName",i),localStorage.setItem("email",o),localStorage.setItem("age",l),window.location.href="/final.html";else{const e=r.nextElementSibling;this.displayError(e,"\nPlease enter your age correctly.")}else{const e=s.nextElementSibling;this.displayError(e,"Please enter your e-mail correctly.")}else{const e=n.nextElementSibling;this.displayError(e,"Please enter your full name.")}}))}renderSection(e){const t="previous"===e?this.currentSection-1:this.currentSection+1;this.surveyImageElement.src=this.images[t-1];const n=this.sectionElement.querySelector(`#form-section-${this.currentSection}`),i=this.sectionElement.querySelector(`#form-section-${t}`);n.hidden=!0,i.hidden=!1;const s=document.getElementById("submit-placeholder");if(4===t){const e=document.getElementById("button-group-1");e.style.gridTemplateColumns="auto",e.style.gridTemplateRows="1fr 1fr",e.style.gap="20%",this.skipButton.style.padding="0.5rem",this.skipButton.style.fontSize="1.3rem",this.nextButton.style.padding="0.5rem",this.nextButton.style.fontSize="1.3rem",this.skipButton.hidden=!0,this.nextButton.hidden=!0,s.hidden=!1}else{const e=document.getElementById("button-group-1");e.style.gridTemplateColumns="1fr 1fr",e.style.gridTemplateRows="auto",e.style.gap="2%",this.skipButton.style.padding="0.25rem",this.skipButton.style.fontSize="1.25rem",this.nextButton.style.padding="0.25rem",this.nextButton.style.fontSize="1.25rem",this.skipButton.hidden=!1,this.nextButton.hidden=!1,s.hidden=!0}this.currentSection=t}displayError(e,t){e.hidden=!1,e.innerText=t,setTimeout((()=>{e.hidden=!0,e.innerText=""}),5e3)}backButtonListener(e){e.preventDefault(),1===this.currentSection?window.location.href="/survey.html":this.renderSection("previous")}nextButtonListener(e){e.preventDefault(),this.submitCurrentSection()}skipButtonListener(e){e.preventDefault(),this.renderSection("next")}submitPlaceholderListener(e){e.preventDefault(),this.submitCurrentSection()}submitCurrentSection(){this.sectionElement.querySelector(`#section-submit-${this.currentSection}`).click()}}(e)})();