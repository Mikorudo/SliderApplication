if (typeof module !== 'undefined' && module.exports) {
	module.exports = { Slider };
}

function Slider(sldrId) {

	let id = document.getElementById(sldrId);
	if(id) {
		this.sldrRoot = id
	}
	else {
		this.sldrRoot = document.querySelector('.slider')
	};

	// Slider objects
	this.sldrList = this.sldrRoot?.querySelector('.slider-list');
	this.sldrElements = this.sldrList?.querySelectorAll('.slider-element');
	this.sldrElemFirst = this.sldrList?.querySelector('.slider-element');
	this.leftArrow = this.sldrRoot?.querySelector('div.slider-arrow-left');
	this.rightArrow = this.sldrRoot?.querySelector('div.slider-arrow-right');
	this.indicatorDots = this.sldrRoot?.querySelector('div.slider-dots');

	// Initialization
	this.options = Slider.defaults;
	Slider.initialize(this)
};

Slider.defaults = {

	// Default options for the slider
	loop: true,     // Бесконечное зацикливание слайдера
	auto: true,     // Автоматическое пролистывание
	interval: 5000, // Интервал между пролистыванием элементов (мс)
	arrows: true,   // Пролистывание стрелками
	dots: true      // Индикаторные точки
};

Slider.prototype.elemPrev = function(num) {
	if (this.elemCount <= 1)
		return;

	num = num || 1;

	let prevElement = this.currentElement;
	this.currentElement -= num;
	
	if(this.currentElement < 0) this.currentElement = this.elemCount-1;

	if(!this.options.loop) {
		if(this.currentElement == 0) {
			this.leftArrow.style.display = 'none'
		};
		this.rightArrow.style.display = 'block'
	};
	
	this.sldrElements[this.currentElement].style.opacity = '1';
	this.sldrElements[prevElement].style.opacity = '0';

	if(this.options.dots) {
		this.dotOn(prevElement); this.dotOff(this.currentElement)
	}
};

Slider.prototype.elemNext = function(num) {
	if (this.elemCount <= 1)
		return;
	num = num || 1;
	
	let prevElement = this.currentElement;
	this.currentElement += num;
	if(this.currentElement >= this.elemCount) this.currentElement = 0;

	if(!this.options.loop) {
		if(this.currentElement == this.elemCount-1) {
			this.rightArrow.style.display = 'none'
		};
		this.leftArrow.style.display = 'block'
	};

	this.sldrElements[this.currentElement].style.opacity = '1';
	this.sldrElements[prevElement].style.opacity = '0';

	if(this.options.dots) {
		this.dotOn(prevElement); this.dotOff(this.currentElement)
	}
};

Slider.prototype.dotOn = function(num) {
	this.indicatorDotsAll[num].style.cssText =
             'background-color:#87CEEB; cursor:pointer;'
};

Slider.prototype.dotOff = function(num) {
	this.indicatorDotsAll[num].style.cssText =
             'background-color:#1E90FF; cursor:default;'
};

Slider.initialize = function(that) {

	// Constants
	that.elemCount = that.sldrElements ? that.sldrElements.length : 0;

	// Variables
	that.currentElement = 0;
	let bgTime = getTime();

	// Functions
	function getTime() {
		return new Date().getTime();
	};

	function setAutoScroll() {
		that.autoScroll = setInterval(function() {
			let fnTime = getTime();
			if(fnTime - bgTime + 10 > that.options.interval) {
				bgTime = fnTime; that.elemNext()
			}
		}, that.options.interval)
	};

	// Start initialization
	if (!that.leftArrow && !that.rightArrow) that.options.arrows = false;
	if(!that.indicatorDots) that.options.dots = false;

	if(that.elemCount <= 1) {   // Отключить навигацию
		that.options.auto = false;
        that.options.arrows = false;
		that.options.dots = false;
		if(that.leftArrow) that.leftArrow.style.display = 'none';
        if(that.rightArrow) that.rightArrow.style.display = 'none';
		if(that.indicatorDots) that.indicatorDots.style.display = 'none';
	};
	if(that.elemCount >= 1) {   // показать первый элемент
		that.sldrElemFirst.style.opacity = '1';
	};

	if(!that.options.loop) {
		if (that.leftArrow) that.leftArrow.style.display = 'none';  // отключить левую стрелку
		that.options.auto = false; // отключить автопркрутку
	}
	else if(that.options.auto) {   // инициализация автопрокруки
		setAutoScroll();
		// Остановка прокрутки при наведении мыши на элемент
		that.sldrList.addEventListener('mouseenter', function() {
                      clearInterval(that.autoScroll)
                }, false);
		that.sldrList.addEventListener('mouseleave', setAutoScroll, false)
	};

	if(that.options.arrows) {  // инициализация стрелок
		that.leftArrow?.addEventListener('click', function() {
			let fnTime = getTime();
			if(fnTime - bgTime > 1000) {
				bgTime = fnTime; that.elemPrev()
			}
		}, false);
		that.rightArrow?.addEventListener('click', function() {
			let fnTime = getTime();
			if(fnTime - bgTime > 1000) {
				bgTime = fnTime; that.elemNext()
			}
		}, false)
	}
	else {
		if(that.leftArrow) that.leftArrow.style.display = 'none';
        if(that.rightArrow) that.rightArrow.style.display = 'none'
	};
	if(that.options.dots) {  // инициализация индикаторных точек
		let sum = '', diffNum;
		for(let i=0; i<that.elemCount; i++) {
			sum += '<span class="dot"></span>'
		};
		that.indicatorDots.innerHTML = sum;
		that.indicatorDotsAll = that.sldrRoot.querySelectorAll('span.dot');
		// Назначаем точкам обработчик события 'click'
		for(let n=0; n<that.elemCount; n++) {
			that.indicatorDotsAll[n].addEventListener('click', function(){
				diffNum = Math.abs(n - that.currentElement);
				if(n < that.currentElement) {
					bgTime = getTime(); that.elemPrev(diffNum)
				}
				else if(n > that.currentElement) {
					bgTime = getTime(); that.elemNext(diffNum)
				}
				// Если n == that.currentElement ничего не делаем
			}, false)
		};
		that.dotOff(0);  // точка[0] выключена, остальные включены
		for(let i=1; i<that.elemCount; i++) {
			that.dotOn(i)
		}
	}
};

