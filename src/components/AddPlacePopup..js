import React from "react";
import PopupWithForm from "./PopupWithForm";
const AddPlacePopup = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit({
      name: name,
      link: link,
    });
  }

  // очищаем инпуты в попапе
  React.useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      title={"Новое место"}
      name={"card-add"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
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
          onChange={handleNameChange}
        />
        <span className="placeName-input-error popup__text-error">
          Вы пропустили это поле
        </span>
        <input
          id="link-input"
          className="popup__input popup__input_type_photo-link"
          name="link"
          placeholder="Ссылка на картинку"
          required
          type="url"
          onChange={handleLinkChange}
        />
        <span className="link-input-error popup__text-error">
          Введите адрес сайта
        </span>
        <button type="submit" className="popup__submit popup__submitAddCard">
          Создать
        </button>
      </fieldset>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
