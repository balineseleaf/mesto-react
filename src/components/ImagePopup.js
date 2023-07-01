const ImagePopup = ({onClose, isOpen, ...props}) => {
    return ( 
        <section className={`popup popup_type_${props.name} ${isOpen ? "popup_opened" : ""}`}>
          <div className="popup__image-container">
          <img alt={props.card.name} className="popup__image" src={props.card.url}/>
          <p className="popup__image-text">{props.card.name}</p>
          <button type="button" className="popup__close" onClick={onClose}></button>
          </div>
      </section>
     );
}
 
export default ImagePopup;