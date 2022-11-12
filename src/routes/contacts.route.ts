import express from 'express';
import contactsController from '../controller/contacts.controller';

const router = express.Router();

router.post('/', contactsController.createNewContact);

router.get('/', contactsController.getAllContacts);

router.delete('/:contactId', contactsController.deleteContact);

router.patch('/:contactId', contactsController.updateContact);

export default router;