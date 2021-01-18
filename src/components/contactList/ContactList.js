import PropTypes from 'prop-types';
import style from './ContactList.module.css';

const ContactList = ({ contacts, onDeleteContact }) => {
    return (
        <ul >
            {contacts.map(({ id, name, number }) => (
                <li key={id} className={style.item}>
                    <p >
                        {name}: {number}
                    </p>
                    <button
                        type="button"
                        onClick={() => onDeleteContact(id)}
                        className={style.button}
                    >
                        Delete
          </button>
                </li>
            ))}
        </ul>
    );
}

export default ContactList;

ContactList.propTypes = {
    onDeleteContact: PropTypes.func,
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            number: PropTypes.string,
        }),
    ),
};