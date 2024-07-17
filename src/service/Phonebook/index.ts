import Api from "../Api";
import { apiUrl } from "../../constants/config";
import { Phonebook } from "../../types/phonebook";

export async function getAllPhonebook() {
  const res = await Api({
    method: "GET",
    url: `${apiUrl}/phonebook`,
  });
  return res;
}

export async function getPhonebookById(id: number) {
  const res = await Api({
    method: "GET",
    url: `${apiUrl}/phonebook/${id}`,
  });
  return res;
}

export async function createPhonebookEntry(data: Phonebook) {
  const res = await Api({
    method: "POST",
    url: `${apiUrl}/phonebook`,
    data,
  });
  return res;
}

export async function updatePhonebookEntry(
  id: number,
  data: Partial<Phonebook>
) {
  const res = await Api({
    method: "PUT",
    url: `${apiUrl}/phonebook/${id}`,
    data,
  });
  return res;
}

export async function deletePhonebookEntry(id: number) {
  const res = await Api({
    method: "DELETE",
    url: `${apiUrl}/phonebook/${id}`,
  });
  return res;
}
