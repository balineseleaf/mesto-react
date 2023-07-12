import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  // изменение инпута имени
  function handleNameChange(evt) {
    setName(evt.target.value);
  }
  // изменения инпута описания
  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name ?? "");
    setDescription(currentUser.about ?? "");
  }, [currentUser]);

  //сабмит формы
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"edit-profile"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
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
          value={name}
          onChange={handleNameChange}
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
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="description-input-error popup__text-error"></span>
        <button
          type="submit"
          className="popup__submit popup__submitEditProfile"
        >
          Сохранить
        </button>
      </fieldset>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
