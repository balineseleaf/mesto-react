import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup.";
import { CurrentUserContext } from "../contexts/CurrentUserContext"; // импортируем объект контекста

function App() {
  // карточки
  const [cards, setCards] = React.useState([]);
  // инфо о пользователе
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser({
          name: userData?.name,
          about: userData?.about,
          avatar: userData?.avatar,
          _id: userData?._id,
        });
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  // React.useEffect(() => {
  //   api
  //     .getUserData()
  //     .then((userdata) => {
  //       setCurrentUser({
  //         name: userdata?.name,
  //         about: userdata?.about,
  //         avatar: userdata?.avatar,
  //         _id: userdata?._id,
  //       });
  //     })
  //     .catch((err) => console.log(`catch: ${err}`));
  // }, []);

  // React.useEffect(() => {
  //   api
  //     .getInitialCards()
  //     .then((cards) => {
  //       setCards(cards);
  //     })
  //     .catch((err) => console.log(`catch: ${err}`));
  // }, []);

  // попап редактирования
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  // попап добавления
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // попап аватара
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  // попап удаления
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);

  function handleDeleteCardClick() {
    setIsDeletePopupOpen(true);
  }

  // зуум изображение
  const [selectedCard, setSelectedCard] = React.useState({});

  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);

  function handleCardClick(cardData) {
    setImagePopupOpen(true);
    setSelectedCard(cardData);
  }

  // ф-ия закрытия попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setSelectedCard({});
  }

  // лайк карточек
  //эта функция в параметре содержит текущее состояние стейта , state - массив карточек
  //дальше проходим по всем текущим карточкам, и если у нее id равен тому что ты лайкнули, то карточка подменяется на ту что пришла в ответе с сервера
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards(
            (state) => state.map((c) => (c._id === card._id ? newCard : c)) //
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    }
  }
  // удаление карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((newCard) => {
        const newCards = cards.filter((c) =>
          c._id === card._id ? "" : newCard
        );
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  // апдейт пользователя
  function handleUpdateUser(data) {
    api
      .setUpdateUserData(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  // апдейт аватара
  function handleUpdateAvatar(avatar) {
    // наша ссылка с инпута
    api
      .setNewAvatar(avatar)
      .then((newAvatar) => {
        // newAvatar - это объект с данными пользователя
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //добавление карточек
  function handleAddPlaceSubmit(data) {
    // name , link с инпутов
    api
      .postNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]); // исп ... для расширения текущего массива
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // закрытие попапа на Esc c useEffect
  // Слушатель Esc необходимо устанавливать не при монтировании компонента, а при открытии попапов.
  const isAnyPopupOpen = React.useMemo(() => {
    return (
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      isEditAvatarPopupOpen ||
      selectedCard
    );
  }, [
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    selectedCard,
  ]);

  React.useEffect(() => {
    if (isAnyPopupOpen) {
      const closePopupByEsc = (evt) => {
        if (evt.key === "Escape") {
          closeAllPopups();
        }
      };
      document.addEventListener("keydown", closePopupByEsc);
      return () => {
        document.removeEventListener("keydown", closePopupByEsc);
      };
    }
  }, [isAnyPopupOpen]);

  return (
    <CurrentUserContext.Provider
      value={
        currentUser /*Мы будем использовать контекст, чтобы все компоненты приложения могли получить доступ к этим данным.*/
      }
    >
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onConfirmDeleteCard={handleDeleteCardClick}
        ></Main>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleAddPlaceSubmit}
        />
        <PopupWithForm
          title={"Вы уверены?"}
          name={"delete-card"}
          onClose={closeAllPopups}
          isOpen={isDeletePopupOpen}
        >
          <button
            type="submit"
            className="popup__submit popup__submitDeleteCard"
          >
            Да
          </button>
        </PopupWithForm>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
          card={selectedCard}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
