import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/api";
import Card from "./Card";

function App() {
  // карточки
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialCards().then((res) => {
      const cardsFromApi = res.map((item) => ({
        name: item.name,
        url: item.link,
        likes: item.likes.length,
        id: item._id
      }));
      setCards(cardsFromApi);
    }).catch((err) => console.log(`catch: ${err}`));
  }, []);

  // попап редактирования
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen]=React.useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  // попап добавления
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // попап аватара
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  // попап удаления
  //const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);

 // ф-ия закрытия попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setSelectedCard({});
  }

  // зуум изображение
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);

  function handleCardClick(cardData) {
    setImagePopupOpen(true);
    setSelectedCard(cardData);
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
      >
       {cards.map(item => (
         <Card key={item.id} onCardClick={handleCardClick} {...item}/>
       ))}
      </Main>
      <Footer /> 
      <PopupWithForm title={"Редактировать профиль"} name={"edit-profile"} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <fieldset className="popup__fieldset">
          <input
            id="name-input"
            className="popup__input popup__input_type_name"
            name="name"
            placeholder="Введите ваше имя"
            required
            minLength="2"
            maxLength="40"
            type="text"
          />
          <span className="name-input-error popup__text-error"></span>
          <input
            id="description-input"
            className="popup__input popup__input_type_description"
            name="about"
            placeholder="Введите вашу профессию"
            required
            minLength="2"
            maxLength="40"
            type="text"
          />
          <span className="description-input-error popup__text-error"></span>
          <button
            type="submit"
            className="popup__submit popup__submitEditProfile">
            Сохранить
          </button>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm title={"Новое место"} name={"card-add"} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <fieldset className="popup__fieldset">
          <input
            id="placeName-input"
            className="popup__input popup__input_type_photo-link-name"
            name="name"
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
            type="text"
          />
          <span className="placeName-input-error popup__text-error"
            >Вы пропустили это поле</span>
          <input
            id="link-input"
            className="popup__input popup__input_type_photo-link"
            name="link"
            placeholder="Ссылка на картинку"
            required
            type="url"
          />
          <span className="link-input-error popup__text-error"
            >Введите адрес сайта</span>
          <button type="submit" className="popup__submit popup__submitAddCard">
            Создать
          </button>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm title={"Вы уверены?"} name={"delete-card"} onClose={closeAllPopups} >
        <button type="submit" className="popup__submit popup__submitDeleteCard">Да</button>
      </PopupWithForm>
      <PopupWithForm title={"Обновить аватар"} name={"edit-avatar"} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <fieldset className="popup__fieldset">
          <input
            id="avatar-input"
            className="popup__input popup__input_type_edit-avatar"
            name="link"
            placeholder="Ссылка на аватар"
            required
            type="url"
          />
          <span className="avatar-input-error popup__text-error"
            >Вставьте ссылку на ваш аватар</span>
          <button type="submit" className="popup__submit popup__submitAddCard">
            Сохранить
          </button>
        </fieldset>
      </PopupWithForm>
      <ImagePopup onClose={closeAllPopups} isOpen={isImagePopupOpen} card={selectedCard}/>
    </div>
  );
}

export default App;
