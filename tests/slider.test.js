// slider.test.js
const Slider = require('../slider/slider').Slider; // Подключение модуля слайдера
const { JSDOM } = require('jsdom');

// Инициализация фейкового DOM с помощью JSDOM
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;

describe('Slider', () => {
  let slider;

  beforeEach(() => {
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    global.document = dom.window.document;

    const sliderElement = document.createElement('div');
    sliderElement.className = 'slider';

    const sliderList = document.createElement('ul');
    sliderList.className = 'slider-list';

    const sliderElement1 = document.createElement('li');
    sliderElement1.className = 'slider-element';

    const sliderElement2 = document.createElement('li');
    sliderElement2.className = 'slider-element';

    const leftArrow = document.createElement('div');
    leftArrow.className = 'slider-arrow-left';

    const rightArrow = document.createElement('div');
    rightArrow.className = 'slider-arrow-right';

    const dots = document.createElement('div');
    dots.className = 'slider-dots';

    sliderElement.appendChild(leftArrow);
    sliderElement.appendChild(rightArrow);
    sliderElement.appendChild(dots);

    sliderList.appendChild(sliderElement1);
    sliderList.appendChild(sliderElement2);
    sliderElement.appendChild(sliderList);
    document.body.appendChild(sliderElement);

    slider = new Slider("slider");
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  afterAll(() => {
    clearInterval(slider.autoScroll);
  });

  test('should initialize slider with default options', () => {
    expect(slider.options.loop).toBe(true);
    expect(slider.options.auto).toBe(true);
    expect(slider.options.interval).toBe(5000);
    expect(slider.options.arrows).toBe(true);
    expect(slider.options.dots).toBe(true);
  });

  test('should go to the next slide', () => {
    const currentElement = slider.currentElement;
    slider.elemNext();
    expect(slider.currentElement).toBe(currentElement + 1);
  });

  test('should go to the previous slide', () => {
    slider.currentElement = 1;
    slider.elemPrev();
    expect(slider.currentElement).toBe(0);
  });
});

describe('Slider without dots', () => {
  let slider;

  beforeEach(() => {
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    global.document = dom.window.document;

    const sliderElement = document.createElement('div');
    sliderElement.className = 'slider';

    const sliderList = document.createElement('ul');
    sliderList.className = 'slider-list';

    const sliderElement1 = document.createElement('li');
    sliderElement1.className = 'slider-element';

    const sliderElement2 = document.createElement('li');
    sliderElement2.className = 'slider-element';

    const leftArrow = document.createElement('div');
    leftArrow.className = 'slider-arrow-left';

    const rightArrow = document.createElement('div');
    rightArrow.className = 'slider-arrow-right';

    sliderElement.appendChild(leftArrow);
    sliderElement.appendChild(rightArrow);

    sliderList.appendChild(sliderElement1);
    sliderList.appendChild(sliderElement2);
    sliderElement.appendChild(sliderList);
    document.body.appendChild(sliderElement);

    slider = new Slider("slider");
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  afterAll(() => {
    clearInterval(slider.autoScroll);
  });

  test('should initialize slider with default options without dots', () => {
    expect(slider.options.loop).toBe(true);
    expect(slider.options.auto).toBe(true);
    expect(slider.options.interval).toBe(5000);
    expect(slider.options.arrows).toBe(true);
    expect(slider.options.dots).toBe(false);
  });

  test('should go to the next slide', () => {
    const currentElement = slider.currentElement;
    slider.elemNext();
    expect(slider.currentElement).toBe(currentElement + 1);
  });

  test('should go to the previous slide', () => {
    slider.currentElement = 1;
    slider.elemPrev();
    expect(slider.currentElement).toBe(0);
  });

  // Другие тесты...

});

describe('Slider without arrows', () => {
  let slider;

  beforeEach(() => {
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    global.document = dom.window.document;
  
    const sliderElement = document.createElement('div');
    sliderElement.className = 'slider';
  
    const sliderList = document.createElement('ul');
    sliderList.className = 'slider-list';
  
    const sliderElement1 = document.createElement('li');
    sliderElement1.className = 'slider-element';
  
    const sliderElement2 = document.createElement('li');
    sliderElement2.className = 'slider-element';
  
    const dots = document.createElement('div');
    dots.className = 'slider-dots';
  
    sliderElement.appendChild(dots);
  
    sliderList.appendChild(sliderElement1);
    sliderList.appendChild(sliderElement2);
    sliderElement.appendChild(sliderList);
    document.body.appendChild(sliderElement);
  
    slider = new Slider("slider");
  });
  

  afterEach(() => {
    document.body.innerHTML = '';
  });

  afterAll(() => {
    clearInterval(slider.autoScroll);
  });

  test('should initialize slider with default options without arrows', () => {
    expect(slider.options.loop).toBe(true);
    expect(slider.options.auto).toBe(true);
    expect(slider.options.interval).toBe(5000);
    expect(slider.options.arrows).toBe(false);
  });

  test('should go to the next slide', () => {
    const currentElement = slider.currentElement;
    slider.elemNext();
    expect(slider.currentElement).toBe(currentElement + 1);
  });

  test('should go to the previous slide', () => {
    slider.currentElement = 1;
    slider.elemPrev();
    expect(slider.currentElement).toBe(0);
  });
});

describe('Slider with one element', () => {
  let slider;

  beforeEach(() => {
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    global.document = dom.window.document;

    const sliderElement = document.createElement('div');
    sliderElement.className = 'slider';

    const sliderList = document.createElement('ul');
    sliderList.className = 'slider-list';

    const sliderElement1 = document.createElement('li');
    sliderElement1.className = 'slider-element';

    const leftArrow = document.createElement('div');
    leftArrow.className = 'slider-arrow-left';

    const rightArrow = document.createElement('div');
    rightArrow.className = 'slider-arrow-right';

    const dots = document.createElement('div');
    dots.className = 'slider-dots';

    sliderElement.appendChild(leftArrow);
    sliderElement.appendChild(rightArrow);
    sliderElement.appendChild(dots);

    sliderList.appendChild(sliderElement1);
    sliderElement.appendChild(sliderList);
    document.body.appendChild(sliderElement);

    slider = new Slider("slider");
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  afterAll(() => {
    clearInterval(slider.autoScroll);
  });

  test('should initialize slider without autoscroll, arrows, dots', () => {
    expect(slider.options.loop).toBe(true);
    expect(slider.options.auto).toBe(false);
    expect(slider.options.interval).toBe(5000);
    expect(slider.options.arrows).toBe(false);
    expect(slider.options.dots).toBe(false);
  });

  test('should go to the next slide', () => {
    const currentElement = slider.currentElement;
    slider.elemNext();
    expect(slider.currentElement).toBe(currentElement);
  });

  test('should go to the previous slide', () => {
    const currentElement = slider.currentElement;
    slider.elemPrev();
    expect(slider.currentElement).toBe(currentElement);
  });
});

describe('Slider without elements', () => {
  let slider;

  beforeEach(() => {
    const sliderElement = document.createElement('div');
    sliderElement.className = 'slider';

    const leftArrow = document.createElement('div');
    leftArrow.className = 'slider-arrow-left';

    const rightArrow = document.createElement('div');
    rightArrow.className = 'slider-arrow-right';

    const dots = document.createElement('div');
    dots.className = 'slider-dots';

    sliderElement.appendChild(leftArrow);
    sliderElement.appendChild(rightArrow);
    sliderElement.appendChild(dots);

    document.body.appendChild(sliderElement);

    slider = new Slider("slider");
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  afterAll(() => {
    slider = null;
  });

  test('should initialize slider without elements', () => {
    expect(slider.options.loop).toBe(true);
    expect(slider.options.auto).toBe(false);
    expect(slider.options.interval).toBe(5000);
    expect(slider.options.arrows).toBe(false);
    expect(slider.options.dots).toBe(false);

    expect(slider.elemCount).toBe(0);
    expect(slider.leftArrow.style.display).toBe('none');
    expect(slider.rightArrow.style.display).toBe('none');
    expect(slider.indicatorDots.style.display).toBe('none');
  });
});