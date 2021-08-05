"use strict";

var _jigsaw = _interopRequireDefault(require("./jigsaw.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var w = 310; // canvas宽度

var h = 155; // canvas高度

var l = 42; // 滑块边长

var r = 9; // 滑块半径

var PI = Math.PI;
var L = l + r * 2 + 3; // 滑块实际边长

function getRandomNumberByRange(start, end) {
  return Math.round(Math.random() * (end - start) + start);
}

function createCanvas(width, height) {
  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function createImg(onload) {
  var img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = onload;

  img.onerror = function () {
    img.setSrc(getRandomImgSrc()); // 图片加载失败的时候重新加载其他图片
  };

  img.setSrc = function (src) {
    var isIE = window.navigator.userAgent.indexOf('Trident') > -1;

    if (isIE) {
      // IE浏览器无法通过img.crossOrigin跨域，使用ajax获取图片blob然后转为dataURL显示
      var xhr = new XMLHttpRequest();

      xhr.onloadend = function (e) {
        var file = new FileReader(); // FileReader仅支持IE10+

        file.readAsDataURL(e.target.response);

        file.onloadend = function (e) {
          img.src = e.target.result;
        };
      };

      xhr.open('GET', src);
      xhr.responseType = 'blob';
      xhr.send();
    } else img.src = src;
  };

  img.setSrc(getRandomImgSrc());
  return img;
}

function createElement(tagName, className) {
  var element = document.createElement(tagName);
  className && (element.className = _jigsaw["default"][className]);
  return element;
}

function setClass(element, className) {
  element.className = _jigsaw["default"][className];
}

function addClass(element, className) {
  element.classList.add(_jigsaw["default"][className]);
}

function removeClass(element, className) {
  element.classList.remove(_jigsaw["default"][className]);
}

function getRandomImgSrc() {
  return "https://picsum.photos/id/".concat(getRandomNumberByRange(0, 1084), "/").concat(w, "/").concat(h);
}

function drawPath(ctx, x, y, operation) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
  ctx.lineTo(x + l, y);
  ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
  ctx.lineTo(x + l, y + l);
  ctx.lineTo(x, y + l);
  ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
  ctx.lineTo(x, y);
  ctx.lineWidth = 2;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.stroke();
  ctx.globalCompositeOperation = 'destination-over';
  operation === 'fill' ? ctx.fill() : ctx.clip();
}

function drawPath1(ctx, x, y, operation) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + l / 2, y);
  ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
  ctx.lineTo(x + l / 2, y);
  ctx.lineTo(x + l, y);
  ctx.lineTo(x + l, y + l / 2);
  ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
  ctx.lineTo(x + l, y + l / 2);
  ctx.lineTo(x + l, y + l);
  ctx.lineTo(x, y + l);
  ctx.lineTo(x, y);
  ctx.lineWidth = 2;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.stroke();
  ctx.globalCompositeOperation = 'destination-over';
  operation === 'fill' ? ctx.fill() : ctx.clip();
}

function drawPath2(ctx, x, y, operation) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + l / 2, y);
  ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
  ctx.lineTo(x + l / 2, y);
  ctx.lineTo(x + l, y);
  ctx.lineTo(x + l, y + l / 2);
  ctx.lineTo(x + l, y + l / 2);
  ctx.lineTo(x + l, y + l);
  ctx.lineTo(x, y + l);
  ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
  ctx.lineTo(x, y);
  ctx.lineWidth = 2;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.stroke();
  ctx.globalCompositeOperation = 'destination-over';
  operation === 'fill' ? ctx.fill() : ctx.clip();
}

function sum(x, y) {
  return x + y;
}

function square(x) {
  return x * x;
}

var Jigsaw =
/*#__PURE__*/
function () {
  function Jigsaw(_ref) {
    var el = _ref.el,
        _ref$width = _ref.width,
        width = _ref$width === void 0 ? w : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? h : _ref$height,
        tranlateX = _ref.tranlateX,
        tranlateY = _ref.tranlateY,
        onSuccess = _ref.onSuccess,
        onFail = _ref.onFail,
        onRefresh = _ref.onRefresh;

    _classCallCheck(this, Jigsaw);

    Object.assign(el.style, {
      position: 'relative',
      width: width + 'px',
      margin: '0 auto'
    });
    this.width = width;
    this.height = height;
    this.tranlateX = tranlateX;
    this.tranlateY = tranlateY;
    this.el = el;
    this.onSuccess = onSuccess;
    this.onFail = onFail;
    this.onRefresh = onRefresh;
  }

  _createClass(Jigsaw, [{
    key: "init",
    value: function init() {
      this.initDOM();
      this.initImg();
      this.bindEvents();
    }
  }, {
    key: "initDOM",
    value: function initDOM() {
      var width = this.width,
          height = this.height;
      var canvas = createCanvas(width, height); // 画布

      var block = createCanvas(width, height); // 滑块

      setClass(block, 'block');
      var sliderContainer = createElement('div', 'sliderContainer');
      sliderContainer.style.width = width + 'px';
      sliderContainer.style.pointerEvents = 'none';
      var refreshIcon = createElement('div', 'refreshIcon');
      var sliderMask = createElement('div', 'sliderMask');
      var slider = createElement('div', 'slider');
      var sliderIcon = createElement('span', 'sliderIcon');
      var text = createElement('span', 'sliderText');
      text.innerHTML = '向右滑动填充拼图'; // 增加loading

      var loadingContainer = createElement('div', 'loadingContainer');
      loadingContainer.style.width = width + 'px';
      loadingContainer.style.height = height + 'px';
      var loadingIcon = createElement('div', 'loadingIcon');
      var loadingText = createElement('span');
      loadingText.innerHTML = '加载中...';
      loadingContainer.appendChild(loadingIcon);
      loadingContainer.appendChild(loadingText);
      var el = this.el;
      el.appendChild(loadingContainer);
      el.appendChild(canvas);
      el.appendChild(refreshIcon);
      el.appendChild(block);
      slider.appendChild(sliderIcon);
      sliderMask.appendChild(slider);
      sliderContainer.appendChild(sliderMask);
      sliderContainer.appendChild(text);
      el.appendChild(sliderContainer);
      Object.assign(this, {
        canvas: canvas,
        block: block,
        sliderContainer: sliderContainer,
        loadingContainer: loadingContainer,
        refreshIcon: refreshIcon,
        slider: slider,
        sliderMask: sliderMask,
        sliderIcon: sliderIcon,
        text: text,
        canvasCtx: canvas.getContext('2d'),
        blockCtx: block.getContext('2d')
      });
    }
  }, {
    key: "setLoading",
    value: function setLoading(isLoading) {
      this.loadingContainer.style.display = isLoading ? '' : 'none';
      this.sliderContainer.style.pointerEvents = isLoading ? 'none' : '';
    }
  }, {
    key: "initImg",
    value: function initImg() {
      var _this = this;

      var img = createImg(function () {
        _this.setLoading(false);

        _this.draw(img);
      });
      this.img = img;
    }
  }, {
    key: "draw",
    value: function draw(img) {
      var width = this.width,
          height = this.height; // 随机位置创建拼图形状

      this.x = this.tranlateX !== 'undefined' ? this.tranlateX : getRandomNumberByRange(L + 10, width - (L + 10));
      this.y = this.tranlateY !== 'undefined' ? this.tranlateY : getRandomNumberByRange(10 + r * 2, height - (L + 10));
      var randomNuber = Math.floor(Math.random() * 3) + 1;

      if (randomNuber == 1) {
        drawPath(this.canvasCtx, this.x, this.y, 'fill');
        drawPath(this.blockCtx, this.x, this.y, 'clip');
      } else if (randomNuber == 2) {
        drawPath1(this.canvasCtx, this.x, this.y, 'fill');
        drawPath1(this.blockCtx, this.x, this.y, 'clip');
      } else {
        drawPath2(this.canvasCtx, this.x, this.y, 'fill');
        drawPath2(this.blockCtx, this.x, this.y, 'clip');
      } // 画入图片


      this.canvasCtx.drawImage(img, 0, 0, width, height);
      this.blockCtx.drawImage(img, 0, 0, width, height); // 提取滑块并放到最左边

      var y = this.y - r * 2 - 1;
      var ImageData = this.blockCtx.getImageData(this.x - 3, y, L, L);
      this.block.width = L;
      this.blockCtx.putImageData(ImageData, 0, y);
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var _this2 = this;

      this.el.onselectstart = function () {
        return false;
      };

      this.refreshIcon.onclick = function () {
        _this2.reset();

        typeof _this2.onRefresh === 'function' && _this2.onRefresh();
      };

      var originX,
          originY,
          trail = [],
          isMouseDown = false;

      var handleDragStart = function handleDragStart(e) {
        originX = e.clientX || e.touches[0].clientX;
        originY = e.clientY || e.touches[0].clientY;
        isMouseDown = true;
      };

      var width = this.width;
      var height = this.height;

      var handleDragMove = function handleDragMove(e) {
        if (!isMouseDown) return false;
        e.preventDefault();
        var eventX = e.clientX || e.touches[0].clientX;
        var eventY = e.clientY || e.touches[0].clientY;
        var moveX = eventX - originX;
        var moveY = eventY - originY;
        if (moveX < 0 || moveX + 38 >= width) return false;
        _this2.slider.style.left = moveX + 'px';
        _this2.blockLeft = (width - 40 - 20) / (width - 40) * moveX;
        _this2.block.style.left = _this2.blockLeft + 'px';
        addClass(_this2.sliderContainer, 'sliderContainer_active');
        _this2.sliderMask.style.width = moveX + 'px';
        trail.push(moveY);
      };

      var handleDragEnd = function handleDragEnd(e) {
        if (!isMouseDown) return false;
        isMouseDown = false;
        var eventX = e.clientX || e.changedTouches[0].clientX;
        if (eventX === originX) return false;
        removeClass(_this2.sliderContainer, 'sliderContainer_active');
        _this2.trail = trail;

        var _this2$verify = _this2.verify(),
            spliced = _this2$verify.spliced,
            verified = _this2$verify.verified;

        if (spliced) {
          if (verified) {
            addClass(_this2.sliderContainer, 'sliderContainer_success');
            typeof _this2.onSuccess === 'function' && _this2.onSuccess(parseInt(_this2.blockLeft), _this2.y);
          } else {
            addClass(_this2.sliderContainer, 'sliderContainer_fail');
            _this2.text.innerHTML = '请再试一次';

            _this2.reset();
          }
        } else {
          addClass(_this2.sliderContainer, 'sliderContainer_fail');
          typeof _this2.onFail === 'function' && _this2.onFail();
          setTimeout(_this2.reset.bind(_this2), 1000);
        }
      };

      this.slider.addEventListener('mousedown', handleDragStart);
      this.slider.addEventListener('touchstart', handleDragStart);
      this.block.addEventListener('mousedown', handleDragStart);
      this.block.addEventListener('touchstart', handleDragStart);
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('touchmove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
      document.addEventListener('touchend', handleDragEnd);
    }
  }, {
    key: "verify",
    value: function verify() {
      var arr = this.trail; // 拖动时y轴的移动距离

      var average = arr.reduce(sum) / arr.length;
      var deviations = arr.map(function (x) {
        return x - average;
      });
      var stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length);
      var left = parseInt(this.block.style.left);
      return {
        spliced: Math.abs(left - this.x) < 10,
        verified: stddev !== 0 // 简单验证拖动轨迹，为零时表示Y轴上下没有波动，可能非人为操作

      };
    }
  }, {
    key: "reset",
    value: function reset() {
      var width = this.width,
          height = this.height; // 重置样式

      setClass(this.sliderContainer, 'sliderContainer');
      this.slider.style.left = 0 + 'px';
      this.block.width = width;
      this.block.style.left = 0 + 'px';
      this.sliderMask.style.width = 0 + 'px'; // 清空画布

      this.canvasCtx.clearRect(0, 0, width, height);
      this.blockCtx.clearRect(0, 0, width, height); // 重新加载图片

      this.setLoading(true);
      this.img.setSrc(getRandomImgSrc());
    }
  }]);

  return Jigsaw;
}();

window.jigsaw = {
  init: function init(opts) {
    return new Jigsaw(opts).init();
  }
};