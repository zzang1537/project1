window.addEventListener("load", function(){

	let wrapper=document.querySelector(".wrapper");
	let footer=document.querySelector("#footer");
	let header=this.document.getElementById("header");
	let tab=this.document.querySelector(".tab");
	let gnb=this.document.getElementById("gnb");	
	let gnbUl=gnb.firstElementChild;
	let gnbLi=gnbUl.children;
	let mainV=this.document.getElementsByClassName("main_visual")[0];
	let pageLi=this.document.querySelectorAll("section[id^=contents]");
	let scrollTimer=0;
	let t=0;
	let n=0;
	let winW, winH;
	let targety;

	function init(){
		winH=this.window.innerHeight*0.25;
	}
	init();

	function scrollInteraction(t){
		
		if(t > 80){
			header.classList.add("down");
		}
		else{
			header.classList.remove("down");
		}

		if(t < pageLi[0].offsetTop-winH){
			n=0;
		}
		else if(t < pageLi[1].offsetTop-winH){
			n=1;
		}
		else if(t < pageLi[2].offsetTop-winH){
			n=2;
		}
		else if(t < pageLi[3].offsetTop-winH){
			n=3;
		}
		else if(t < pageLi[4].offsetTop-winH){
			n=4;
		}
		else {
			n=5;
		}
	
		clearTimeout(scrollTimer);
		scrollTimer=setTimeout(function(){
			for(let i=0; i<gnbLi.length; i++){
				if(i == n){
					gnbLi[i].classList.add("on");
				}
				else{
					gnbLi[i].classList.remove("on");
				}
			}
		}, 20);
	}
	for(let i=0; i<gnbLi.length; i++){
		gnbLi[i].addEventListener("click", function(e){
			e.preventDefault();
			if(i == 0){
				targety=header.offsetTop;
			}
			else if(i == gnbLi.length-1){
				targety=footer.offsetTop;
			}
			else{
				targety=pageLi[i-1].offsetTop;
			}		
			gsap.to(window, {scrollTo: targety, duration: 0.5});
	
		});
	}
	const trigger=new ScrollTrigger.default({
		trigger: {
			once: true,
			toggle: {
				class: {
					in: "active",
					out: "inactive"
				},
				offset: {
					viewport: {
						x: 0,
						y:0
					}
				}
			}
		},
		scroll: {
			sustain: 200,
			element: this.window,
			callback: (offset, dir) => { scrollInteraction(offset.y);}
		}
	});

	trigger.add(".main_visual, section[id^=contents], #footer");


	let dimmed=wrapper.querySelector(".dimmed");
	let body=this.document.body;
	let tabMenu=this.document.querySelector("#tab_menu");
	let tabInner=tabMenu.firstElementChild;
	let tabUl=tabInner.firstElementChild;
	let tabLi=tabUl.children;
	
	function tabClose() {
		tabMenu.classList.remove("open");
		tab.classList.remove("open");
		body.classList.remove("fixed");
		dimmed.classList.remove("fixed");
	}
	
	// tab 메뉴 열기
	tab.addEventListener("click",function(e){
		e.preventDefault();

		if(tabMenu.classList.contains("open") === false){
			tabMenu.classList.add("open");
			tab.classList.add("open");
			body.classList.add("fixed");
			dimmed.classList.add("fixed");
		}
		else{
			tabClose();
		}
	});

	for(let i=0; i<tabLi.length; i++){
		tabLi[i].addEventListener("click", function(e){
			e.preventDefault();

			tabClose();

			if(i == 0){
				targety=header.offsetTop;
			}
			else if(i == tabLi.length-1){
				targety=footer.offsetTop;
			}
			else {
				targety=pageLi[i-1].offsetTop;
			}		
			gsap.to(window, {scrollTo: targety, duration: 0.5});
		});
	}
	let topBtn=wrapper.lastElementChild;

	topBtn.addEventListener("click", function(e){
		e.preventDefault();
		gsap.to(window, {scrollTo: 0, duration: 0.5});
	});
	
});