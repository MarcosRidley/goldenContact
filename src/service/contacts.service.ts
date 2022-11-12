import { Contact } from "../database/models";

const createNewContact = async (id:string, areaCode:string, phoneNumber:string, contactName:string) => {
  const contact = await Contact.create({
    userId: id,
    areaCode,
    phoneNumber,
    contactName,
  });
  return contact;
}

const getAllContacts = async (id:string) => {
  const contacts = await Contact.findAll({where: {userId: id}});
  return contacts;
};

const deleteContact = async (id:string, contactId:string) => {
  try {
    const rows = await Contact.destroy({where: {id: contactId, userId: id}});
    if (rows > 0) {
      return true;
    } return false;
      
  } catch (e) {
    return false;
  }
};

const updateContact = async (id:string, contactId:string, areaCode:string, phoneNumber:string, contactName:string) => {
  try {
    const rows = await Contact.update({areaCode, phoneNumber, contactName}, {where: {id: contactId, userId: id}});
    if (rows.length > 0) {
      return true;
    } return false;
  } catch (e) {
    return false;
  }
};

export default { createNewContact, getAllContacts, deleteContact, updateContact };