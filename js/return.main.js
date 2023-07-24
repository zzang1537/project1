window.addEventListener("load", function(){

	let wrapper=document.querySelector(".wrapper");
	let footer=document.querySelector("#footer");
	let header=this.document.getElementById("header");
	let tab=header.querySelector(".tab");
	let gnb=this.document.getElementById("gnb");	
	let gnbUl=gnb.firstElementChild;
	let gnbLi=gnbUl.children;
	let mainV=this.document.getElementsByClassName("main_visual")[0];
	let tabMenu=this.document.getElementById("tab_menu");
	let conLi=this.document.querySelectorAll("section[id^=contents]");
	let t=0;
	let n=0;
	let isTablet, isMobile;
	let winW, winH;
	let targety;
	let bodyArray=[];

	for(let i=0; i<wrapper.children.length; i++){
		if(wrapper.children[i].className == "main_visual"){
			bodyArray.push(wrapper.children[1]);
		}
		else if(wrapper.children[i].className.indexOf("contents")){
			bodyArray.push(wrapper.children[i]);
		}
		else if(wrapper.children[i].className == "footer"){
			bodyArray.push(wrapper.children[i]);
		}
	}
	// console.log(bodyArray);

	this.window.addEventListener("resize",function(){		
		winW=this.window.innerWidth;

		if(winW < 940){
			isTablet=true;
		}
		else if(winW < 460){
			isMobile=true;
		}
	});

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

		if(t < conLi[0].offsetTop-winH){
			n=0;
		}
		else if(t < conLi[1].offsetTop-winH){
			n=1;
		}
		else if(t < conLi[2].offsetTop-winH){
			n=2;
		}
		else if(t < conLi[3].offsetTop-winH){
			n=3;
		}
		else if(t < conLi[4].offsetTop-winH){
			n=4;
		}
		else {
			n=5;
		}
		// console.log(n);
		for(let i=0; i<gnbLi.length; i++){
			if( i == n){
				gnbLi[i].classList.add("on");
			}
			else{
				gnbLi[i].classList.remove("on");
			}
		}
	}

	for(let i=0; i<gnbLi.length; i++){
		gnbLi[i].addEventListener("click", function(e){
			e.preventDefault();

			if(i == 0){
				targety=0;
			}
			else if(i == gnbLi.length-1){
				targety=document.getElementById("footer").offsetTop;
			}
			else{
				targety=conLi[i-1].offsetTop;
			}

			gsap.to(window, {scrollTo: targety, duration: 0.5});
		});
	}

	const trigger=new ScrollTrigger.default({
		trigger: {
			//once: true,
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

	trigger.add("section[id^=contents], #footer");

	// tab 메뉴 열기
	tab.addEventListener("click",function(e){
		e.preventDefault();

		if(tabMenu.classList.contains("open") === false){
			tabMenu.classList.add("open");
			tab.classList.add("open");
		}
		else{
			tabMenu.classList.remove("open");
			tab.classList.remove("open");
		}

	});
});