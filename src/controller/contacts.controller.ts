import { Request, Response } from 'express';
import contactsService from '../service/contacts.service';

const createNewContact = async (req:Request, res:Response) => {
  const { id, areaCode, phoneNumber, contactName  } = req.body;
  //this Id is decoded from the token payload
  //this Id is the id of the user that is logged in

  if (!id || !areaCode || !phoneNumber || !contactName) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (areaCode.length !== 2 || phoneNumber.length !== 10) {
    return res.status(400).json({ message: 'Invalid phone number or Area code: use format (XX)XXXXX-XXXX' });
  }

  if (contactName.length < 3) {
    return res.status(400).json({ message: 'Contact name must be at least 3 characters' });
  }

  const contact = await contactsService.createNewContact(id, areaCode, phoneNumber, contactName)

  return res.status(201).json(contact);

};

const getAllContacts = async (req:Request, res:Response) => {
  const { id } = req.body;
  const contacts = await contactsService.getAllContacts(id);
  res.status(200).json(contacts);
};

const updateContact = async (req:Request, res:Response) => {
  const { contactId } = req.params;
  const { id, areaCode, phoneNumber, contactName } = req.body;
  const updated = await contactsService.updateContact(id, contactId, areaCode, phoneNumber, contactName);
  if (updated) {
    return res.status(200).json({ message: 'Contact updated' });
  } 
  return res.status(404).json({ message: 'Contact not found' });
}

const deleteContact = async (req:Request, res:Response) => {
  const { contactId } = req.params;
  const { id } = req.body;
  const deleted = await contactsService.deleteContact(id, contactId);
  if (deleted) {
    return res.status(204).json({ message: 'Contact deleted' });
  } 
  return res.status(404).json({ message: 'Contact not found' });
};

export default { createNewContact, getAllContacts, deleteContact, updateContact };