const wrap = document.querySelector('.wrap');
const header = document.querySelector(".header");
const islogo = document.querySelector(".logo > img");
const navBtns = document.querySelectorAll(".gnb > li > a");
const makingEl = document.querySelector("#making");

// 스크롤을 하단으로 이동시 클래스추가되고, 상단으로 이동시 클래스가 삭제된다.
document.addEventListener("scroll", () => {
	let activeCurrentPositionTop = makingEl.offsetTop;
	if(document.documentElement.scrollTop > 1){
		header.classList.add('scroll');
	}else{
		header.classList.remove('scroll');
	}
	if(document.documentElement.scrollTop >= activeCurrentPositionTop){
		makingEl.classList.add("active");
	}
});

// 네비게이션 버튼을 클릭시 해당 영역으로 움직인다.
navBtns.forEach((btn) => {
	btn.addEventListener("click", (event) => {
		event.preventDefault();
		let currentButton = event.currentTarget;
		let parent = currentButton.parentNode;
		let target = currentButton.getAttribute("href");
		let sectionID = document.getElementById(target)
		let scrollOffset = sectionID.offsetTop;
		window.scrollTo({
			top: scrollOffset,
			behavior: 'smooth'
		});
		document.querySelectorAll(".gnb > li").forEach((el) => {
			el.classList.remove("active");
		});
		parent.classList.add("active");
		if(window.outerWidth < 1024){
			gnbmenuBar.classList.remove("open");
			gnbWrap.style.right = "-85%"
			gnbWrap.classList.remove("open");
			header.classList.remove('on');
			document.querySelector(".black_mask").remove();
			document.body.style.overflow = 'auto';
		}
	});
});
// 스크롤 될 때 해당 영역의 메뉴가 활성화 된다.
window.addEventListener("scroll", offsetScroller);
function offsetScroller(){
	let windowOffset = window.pageYOffset;
	navBtns.forEach((button, index) => {
		let target = button.getAttribute("href");
		let sectionID = document.getElementById(target);
		let sectionOffset = sectionID.offsetTop;
		let nextSectionOffset = (index < navBtns.length - 1) ? document.getElementById(navBtns[index + 1].getAttribute("href")).offsetTop : document.body.scrollHeight;
		if (windowOffset >= sectionOffset && windowOffset < nextSectionOffset) {
			document.querySelectorAll(".gnb > li").forEach((el) => {
				el.classList.remove("active");
			});
			button.parentNode.classList.add("active");
		}
	});

	if (windowOffset < document.querySelector(".main_section").scrollHeight){
		let parent = navBtns[0].parentNode;
		parent.classList.remove("active");
	}
}

// 상단 슬라이드 이미지
let swiper = new Swiper('.main_slide', {
	autoplay: { 
		delay: 5500, 
		disableOnInteraction: false,
	},
	effect: 'fade',
	loop: true,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	}
});

// 탭메뉴
let tabMenuList = document.querySelectorAll(".intabNav > li > a");
let tabcoNt = document.querySelectorAll(".tabcoNt");
let activeTab = document.querySelectorAll(".intabNav > li.active > a");

activeTab.forEach((active_section) => {
	let activeTarget = active_section.getAttribute("href");
	document.querySelector("#" + activeTarget).style.display = "block";
});

tabMenuList.forEach((el) => {
	el.addEventListener('click', activeTabs);
});

function activeTabs(el){
	el.preventDefault();
	let tabTarget = el.currentTarget;
	let cNt = tabTarget.getAttribute("href");
	let parents = tabTarget.closest(".inner_wrap");
	let parentTabs = tabTarget.closest(".intabNav");
	let tabsChild = Array.from(parentTabs.children);
	let childcoNt = Array.from(parents.children).filter(child => child.classList.contains("tabcoNt"));
	childcoNt.forEach((el) => {
		el.style.display = "none";
	});
	tabsChild.forEach((el) => {
		el.classList.remove("active");
	});
	document.querySelector("#" + cNt).style.display = "block";
	tabTarget.parentNode.classList.add("active");
}

// 포트폴리오 슬라이드
let portFolioSwiper = new Swiper('.portFolioSlide', {
		centeredSlides: true,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		},
		slidesPerView: 4,
		spaceBetween: 15,
		breakpoints: {
			// 모바일
			320: {
				slidesPerView: 1,
				spaceBetween: 10,
			},
			// 태블릿
			768: {
				slidesPerView: 2,
				spaceBetween: 15,
			},
			// PC
			1024: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			// PC
			1100: {
				slidesPerView: 4,
				spaceBetween: 30,
			}
		}
	});

// map 
// window.onload = function mapContainer(){
// 	let mapContainerBox = document.getElementById('map');
// 	let options = {
// 		center: new kakao.maps.LatLng(37.579495254844964, 126.87057864438388),
// 		level: 3
// 	};
// 	let map = new window.kakao.maps.Map(mapContainerBox, options);

// 	let markerPosition = new kakao.maps.LatLng(
// 		37.579495254844964,
// 		126.87057864438388
// 	);

// 	let marker = new kakao.maps.Marker({
// 		position: markerPosition,
// 	});

// 	marker.setMap(map);

// 	let iwContent = '<div style="letter-spacing:-1.5px;">경기고양시덕양구으뜸로130</div>',
// 		iwPosition = new kakao.maps.LatLng(37.579495254844964, 126.87057864438388);

// 	// 인포윈도우를 생성합니다
// 	let infowindow = new kakao.maps.InfoWindow({
// 		position : iwPosition,
// 		content : iwContent
// 	});

// 	infowindow.open(map, marker);
// }


// 모바일 메뉴버튼 클릭시 활성화
const gnbmenuBar = document.querySelector(".menubar_btn");
const gnbWrap = document.querySelector(".gnb_wrap");
const container = document.querySelector('.container');

gnbmenuBar.addEventListener("click", menuOpenHandler);
let prevScrollPosition;

function menuOpenHandler(){
	scrollTop = window.scrollY;
	this.classList.toggle('open');
	let layerMask = document.createElement("div");
	layerMask.className = "black_mask";

	if(gnbWrap.classList.contains("open")){
		gnbWrap.style.right = "-85%"
		gnbWrap.classList.remove("open");
		header.classList.remove('on');
		document.querySelector(".black_mask").remove();
		document.body.style.overflow = 'auto';
		// window.scrollTo(0, scrollTop);
	}else{
		header.insertBefore(layerMask, header.firstChild);
		gnbWrap.style.right = "0";
		gnbWrap.classList.add("open");
		header.classList.add('on');
		document.body.style.overflow = 'hidden';
	}
}

window.addEventListener("resize", () => {
	let mask = document.querySelector(".black_mask");
	document.addEventListener("scroll", () => {
		if(document.documentElement.scrollTop > 1){
			header.classList.add('scroll');
		}else{
			header.classList.remove('scroll');
		}
	});
	if(window.outerWidth > 1024){
		gnbmenuBar.classList.remove("open");
		gnbWrap.style.right = "-85%";
		gnbWrap.classList.remove("open");
		header.classList.remove('on');
	}else if(mask){
		mask.remove();
	}
});