const ImagePopup = ({ onClose, isOpen, ...props }) => {
  // props: сначала пустой массив card,
  // а после клика с данными выбранной карточки
  // потому что в App.js у нас пропс стоит card={selectedCard}
  // после закрытия зумпопапа - снова пустой массив - так работает сеттер
  return (
    <section className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__image-container">
        <img
          alt={props.card.name}
          className="popup__image"
          src={props.card.link}
        />
        <p className="popup__image-text">{props.card.name}</p>
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
};

export default ImagePopup;
