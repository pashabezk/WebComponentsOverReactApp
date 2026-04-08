const UserCard = ({name, surname, imgSrc, isSelected, onSubscribe}) => {
	const containerClass = "user-card" + (isSelected ? " selected" : "");
	return (
		<div className={containerClass}>
			<img className="user-image" src={imgSrc} alt="user photo"/>
			<div className="user-info">
				<p className="user-name">{name} {surname}</p>
				<button className="action-button" onClick={() => onSubscribe?.(name, surname)}>Подписаться</button>
			</div>
		</div>
	);
};

export default UserCard;
