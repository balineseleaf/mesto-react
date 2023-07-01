
const PopupWithForm = (props) => {
    const {isOpen, onClose} = props; // если нам пришло true из App.js после отработки ф-ии handle... , то здесь мы уже добавляем класс с открытым попапом
    return (  
      <section className={`popup popup_type_${props.name} ${isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container">
          <h2 className="popup__header">{props.title}</h2>
            <form
              id="formEditProfile"
              name={`form-${props.name}`}
              className={`popup__form popup__form_${props.name}`}
              noValidate
            >
              {props.children}
            </form>
            <button type="button" className="popup__close" onClick={onClose}></button>
        </div>
    </section>
  );
}
 
export default PopupWithForm;