const Card = ({onCardClick, ...props}) => {

    function handleClick() {
        onCardClick(props);
      }

    return (
      <div className="element">
        <button type="button" className="element__delete-card-button"></button>
        <img alt={props.name} className="element__image" role="button" src={props.url} onClick={handleClick}/>
        <div className="element__caption-block">
          <h2 className="element__caption">{props.name}</h2>
          <div className="element__like-section">
            <button type="button" className="element__icon-like"></button>
            <p className="element__icon-like-counter">{props.likes}</p>
          </div>
       </div>
      </div>
    );
}
 
export default Card;