// src/hooks/useShop.js
import { useState, useEffect, useCallback } from "react";
import {
  getItems,
  addItem,
  updateItem,
  deleteItem,
} from "../services/productService";

export const useShop = (table) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getItems(table);
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [table]);

  const createItem = async (item, file) => {
    try {
      setLoading(true);
      await addItem(table, item, file);
      await fetchItems();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const editItem = async (id, updates, file) => {
    try {
      setLoading(true);
      await updateItem(table, id, updates, file);
      await fetchItems();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id) => {
    try {
      setLoading(true);
      await deleteItem(table, id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, createItem, editItem, removeItem };
};
