import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState("");
    const [about, setAbout] = React.useState("");

    React.useEffect(() => {
        if (currentUser.name !== undefined) {
            setName(currentUser.name);
            setAbout(currentUser.about);
        }
    }, [currentUser]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setAbout(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: about,
        });
    }

    return (
        <PopupWithForm
            name="popupProfile"
            id="form-edit"
            title="Редактировать профиль"
            isLoading={props.isLoading ? "Сохранение..." : "Сохранить"}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <label className="form__field">
                <input
                    id="name-input"
                    className="form__item form__item_name"
                    type="text"
                    placeholder="Имя"
                    minLength="2"
                    maxLength="40"
                    value={name}
                    onChange={handleChangeName}
                    required
                />
                <span id="name-input-error" className="form__item-error" />
            </label>
            <label className="form__field form__field-info">
                <input
                    id="about-input"
                    className="form__item form__item_about"
                    type="text"
                    placeholder="О себе"
                    minLength="2"
                    maxLength="200"
                    value={about}
                    onChange={handleChangeDescription}
                    required
                />
                <span id="about-input-error" className="form__item-error" />
            </label>
        </PopupWithForm>
    );
}

export default EditProfilePopup;