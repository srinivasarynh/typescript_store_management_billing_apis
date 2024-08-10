import { Item } from "../models/item";
import { createOne, deleteOne, updateOne, getOne, getAll } from "./handleFactory";



export const addItem = createOne(Item);
export const getAllItems = getAll(Item)
export const getItem = getOne(Item)
export const updateItem = updateOne(Item)
export const deleteItem = deleteOne(Item)