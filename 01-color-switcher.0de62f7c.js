!function(){var e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]"),o=document.querySelector("body");e.addEventListener("click",(function(){e.disabled=!0,t.disabled=!1,r=setInterval((function(){o.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})),t.addEventListener("click",(function(){e.disabled=!1,t.disabled=!0,clearInterval(r)}));var r=0;e.style.backgroundColor="green",t.style.backgroundColor="red"}();
//# sourceMappingURL=01-color-switcher.0de62f7c.js.map
