'use strict';

const hiddenClassName = 'hidden';

const errorMassageElem = {
  elem: document.getElementById('error'),
  show(massage) {
    this.elem.textContent = `Oops! ${massage}`;
    this.elem.classList.remove('hidden');
  },
  hide() {
    const divClasses = this.elem.classList;
    if (!divClasses.contains(hiddenClassName)) {
      divClasses.add(hiddenClassName);
    }
  }
};

const successMassageElem = {
  elem: document.getElementById('success'),
  show() {
    const divClasses = this.elem.classList;
    if (divClasses.contains(hiddenClassName)) {
      divClasses.remove(hiddenClassName);
    }
  },
  hide() {
    const divClasses = this.elem.classList;
    if (!divClasses.contains(hiddenClassName)) {
      divClasses.add(hiddenClassName);
    }
  }
};

const userDataMapper = jsonObj => ({
  picture: jsonObj.picture.large,
  city: jsonObj.location.city,
  country: jsonObj.location.country,
  postcode: jsonObj.location.postcode,
  email: jsonObj.email
});

const addTextToNode = (node, text) => {
  node.innerHTML += `<p>${text}</p>`;
};

const createNewUserNode = userData => {
  const userNode = document.createElement('div');
  userNode.classList.add('user');

  const userPicture = document.createElement('img');
  userPicture.src = userData.picture;
  userPicture.classList.add('user-photo');

  const userInfo = document.createElement('div');
  userInfo.classList.add('user-info');
  addTextToNode(userInfo, `City: ${userData.city}`);
  addTextToNode(userInfo, `Country: ${userData.country}`);
  addTextToNode(userInfo, `Postcode: ${userData.postcode}`);
  addTextToNode(userInfo, `Email: ${userData.email}`);

  userNode.appendChild(userPicture);
  userNode.appendChild(userInfo);
  return userNode;
};

const userCounter = document.getElementById('user-counter');
userCounter.addEventListener('focusout', e => {
  const value = Number(e.target.value);
  const maxValue = Number(e.target.max);
  const minValue = Number(e.target.min);
  if (value < minValue) {
    e.target.value = minValue;
    return;
  }
  if (value > maxValue) {
    e.target.value = maxValue;
    return;
  }
});

const downloadHandler = () => {
  const userCounter = document.getElementById('user-counter');
  const usersCount = userCounter.value;
  errorMassageElem.hide();
  fetch(`https://randomuser.me/api?results=${usersCount}`)
    .then(response => response.json())
    .then(data => {
      const usersDataArr = data.results;
      const mappedUsersDataArr = usersDataArr.map(userDataMapper);
      const usersContainer = document.getElementById('users-container');
      for (const userData of mappedUsersDataArr) {
        const userNode = createNewUserNode(userData);
        usersContainer.appendChild(userNode);
      }
      successMassageElem.show();
    })
    .catch(err => {
      errorMassageElem.show(err);
      successMassageElem.hide();
    });
};

const downloadButton = document.getElementById('download');
downloadButton.addEventListener('click', downloadHandler);
