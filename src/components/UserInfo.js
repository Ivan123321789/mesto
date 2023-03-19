class UserInfo {
  constructor({userNameSelector, userAboutSelector}) {
      this._userName = document.querySelector(userNameSelector);
      this._userAbout = document.querySelector(userAboutSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._userName.textContent,
      about: this._userAbout.textContent
    };
    return userInfo;
  }

  setUserInfo({name, about}) {
      this._userName.textContent = name;
      this._userAbout.textContent = about;
  }
}

export {UserInfo}