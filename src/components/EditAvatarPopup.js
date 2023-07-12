import React from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const ref = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: ref.current.value,
    });
  }
  // очищаем инпуты
  React.useEffect(() => {
    ref.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      title={"Обновить аватар"}
      name={"edit-avatar"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <input
          ref={ref}
          id="avatar-input"
          className="popup__input popup__input_type_edit-avatar"
          name="link"
          placeholder="Ссылка на аватар"
          required
          type="url"
        />
        <span className="avatar-input-error popup__text-error">
          Вставьте ссылку на ваш аватар
        </span>
        <button type="submit" className="popup__submit popup__submitAddCard">
          Сохранить
        </button>
      </fieldset>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;