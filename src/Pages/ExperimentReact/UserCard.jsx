const UserCard = ({name, surname, imgSrc, onSubscribe}) => {
	return (
		<div className="user-card">
			<img className="user-image" src={imgSrc} alt="user photo"/>
			<div className="user-info">
				<p className="user-name">{name} {surname}</p>
				<button className="action-button" onClick={() => onSubscribe?.(name, surname)}>Подписаться</button>
			</div>
		</div>
	);
};

export default UserCard;
