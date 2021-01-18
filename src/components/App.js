import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from "./contactForm/ContactForm";
import ContactList from "./contactList/ContactList";
import Filter from "./filter/Filter";

export default class App extends Component {
    state = {
        contacts: [
            { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
            { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
            { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
            { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ],
        filter: '',
    };

    addContact = (name, number) => {
        const contact = {
            id: uuidv4(),
            name,
            number,
        };

        this.setState(({ contacts }) => ({
            contacts: [contact, ...contacts],
        }));
    };

    changeFilter = event => {
        this.setState({ filter: event.currentTarget.value });
    };

    getVisibleContacts = () => {
        const { filter, contacts } = this.state;
        const normalizedFilter = filter.toLowerCase();

        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizedFilter),
        );
    };

    deleteContact = contactId => {
        this.setState(prevState => ({
            contacts: prevState.contacts.filter(contact => contact.id !== contactId),
        }));
    };

    componentDidMount() {
        const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
        if (parsedContacts) {
            this.setState({ contacts: parsedContacts });
        };
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.contacts !== prevState.contacts) {
            localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
        };
    };

    render() {
        const { filter, contacts } = this.state;
        const visibleContacts = this.getVisibleContacts();
        return (
            <>
                <h1>Phonebook</h1>
                <ContactForm onSubmit={this.addContact} contacts={contacts} />
                <h2>Contacts</h2>
                <Filter value={filter} onChange={this.changeFilter} />
                <ContactList
                    contacts={visibleContacts}
                    onDeleteContact={this.deleteContact}
                />
            </>
        );
    }
}
