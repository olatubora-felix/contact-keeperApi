import { useReducer } from "react";
import ContactContext from "./contactContext";
import contactReducer from './contactReducer';
import uuid from 'uuid';

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts : [
      {
        id: '1',
        name: 'Ola Felix',
        email: 'ola@gmail.com',
        phone: '+1234567',
        type: 'Personal'
      },
      {
        id: '2',
        name: 'James jose',
        email: 'james@gmail.com',
        phone: '+1234567',
        type: 'Personal'
      },
      {
        id: '3',
        name: 'Smith mike',
        email: 'mike@gmail.com',
        phone: '+1234567',
        type: 'Personal'
      },
      {
        id: '4',
        name: 'Okwe Brain',
        email: 'brain@gmail.com',
        phone: '+1236756559',
        type: 'Professional'
      },
      {
        id: '5',
        name: 'King Joe',
        email: 'joe@gmail.com',
        phone: '+12340007',
        type: 'Personal'
      },
      {
        id: '6',
        name: 'Joy Lebi',
        email: 'joy@gmail.com',
        phone: '+1234567',
        type: 'Personal'
      },
    ]
  };

  const [state, dispatch ] = useReducer(contactReducer, initialState);

  // ADD CONTACT

  // DELETE CONTACT

  // UPDATE CONTACT

  // SET CURRENT

  // CLEAR CURRENT

  // FILTER CONTACT

  // CLEAR FILTER


  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts
       }}
    >
      { props.children }
    </ContactContext.Provider>
  )

};

export default ContactState;