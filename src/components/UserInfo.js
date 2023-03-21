class UserInfo {
  constructor({userNameSelector, userAboutSelector, userAvatarSelector}) {
      this._userName = document.querySelector(userNameSelector);
      this._userAbout = document.querySelector(userAboutSelector);
      this._userAvatar = document.querySelector(userAvatarSelector)
  }

  getUserInfo() {
    const userInfo = {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
      avatar: this._userAvatar.src
    };
    return userInfo;
  }

  setUserInfo(data) {
      this._userName.textContent = data.name;
      this._userAbout.textContent = data.about;
  }

  setUserAvatar(data) {
    this._userAvatar.src = data.avatar
  }
}

export {UserInfo}