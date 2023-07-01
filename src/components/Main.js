import editAvatar from '../images/editavatar.svg';
import api from "../utils/api";
import React from 'react';

const Main = (props) => {
    const {onEditProfile, onAddPlace, onEditAvatar, children} = props; // по клику будет передаваться ф-ия из App.js,которая меняет состояние на true
    const [userName, setUserName] = React.useState("");
    const [userDescription, setUserDescription] = React.useState("");
    const [userAvatar, setUserAvatar] = React.useState("");

    React.useEffect(() => {
        api.getUserData().then((res) => {
          setUserAvatar(res.avatar);
          setUserDescription(res.about);
          setUserName(res.name);
        }).catch((err) => console.log(`catch: ${err}`));
      }, []);

    return (
        <main className="content">
        <section className="profile">
          <div className="profile__info">
            <div className="profile__info-container" onClick={onEditAvatar}>
                <img
                  className="profile__image"
                  alt="Фотография профиля"
                  src={userAvatar}
                />
                <img className="profile__edit-icon" alt="" src={editAvatar} />
            </div>
            <div className="profile__bio">
              <div className="profile__block-info">
                <h1 className="profile__name">{userName}</h1>
                <button type="button" className="profile__edit-button" onClick={onEditProfile}></button> 
              </div>
              <p className="profile__description">{userDescription}</p>
            </div>
          </div>
          <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
        </section>
        <section className="elements">
            {children}
        </section>
      </main>
      );
}
 
export default Main;