'use strict';
const fourthElem = document.getElementById('fourth-elem');
const nextElem = document.querySelector('#fourth-elem + * > *');
const zoomScale = 1.3;

fourthElem.addEventListener('click', e => {
  const className = 'on-click-id';
  changingElementClasses(e.target, className);
});

nextElem.addEventListener('click', e => {
  const className = 'on-click-selector';
  changingElementClasses(e.target, className);
});

const changingElementClasses = (element, className) => {
  const elemClassList = element.classList;
  if (!elemClassList.contains(className)) {
    elemClassList.add(className);
    return;
  }
  elemClassList.remove(className);
};

const addImage = () => {
  const sourceImageId = 'lviv-img';
  const addedImgClass = 'added-img';
  const imgWrapperClassName = 'img-wrapper';

  const sourceImageElem = document.getElementById(sourceImageId);
  const imgElem = document.createElement('img');
  imgElem.src = sourceImageElem.src;
  imgElem.classList.add(addedImgClass);

  const containerId = 'imgs-container';
  const imgsContainer = document.getElementById(containerId);

  const wrapper = document.createElement('div');
  wrapper.classList.add(imgWrapperClassName);
  wrapper.appendChild(imgElem);
  imgsContainer.appendChild(wrapper);
};

const removeImage = () => {
  const imgWrapperClassName = 'img-wrapper';

  const imgContainers = document.querySelectorAll(`.${imgWrapperClassName}`);

  if (imgContainers.length !== 0) {
    const lastImgContainer = imgContainers[imgContainers.length - 1];
    lastImgContainer.remove();
  }
};

const zoomImg = (img, zoomScale) => {
  const imgStyle = window.getComputedStyle(img);
  const transform = imgStyle.getPropertyValue('transform');
  if (!transform) {
    img.style.transform = `scale(${zoomScale})`;
    return;
  }

  if (!transform.includes('scale')) {
    img.style.transform += ` scale(${zoomScale})`;
    return;
  }

  transform.replace('scale([-]{0,1}[0-9]+[.]*[0-9]+)', `scale(${zoomScale})`);
};

const zoomLastImg = scale => {
  const imgWrapperClassName = 'img-wrapper';
  const sourceImageId = 'lviv-img';

  const addedImgs = document.querySelectorAll(`div.${imgWrapperClassName} img `);

  if (addedImgs.length !== 0) {
    const lastImg = addedImgs[addedImgs.length - 1];
    zoomImg(lastImg, scale);
    return;
  }

  const sourceImage = document.getElementById(sourceImageId);
  zoomImg(sourceImage, scale);
};

document.querySelector('button#add').addEventListener('click', addImage);
document.querySelector('button#delete').addEventListener('click', removeImage);

document.querySelector('button#zoom-in').addEventListener('click', () => {
  zoomLastImg(zoomScale);
});

document.querySelector('button#zoom-out').addEventListener('click', () => {
  zoomLastImg(1 / zoomScale);
});
