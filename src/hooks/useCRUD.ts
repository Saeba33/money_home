import { useState, useCallback } from "react";

export const useCRUD = <T extends { id: number }>(initialItems: T[] = []) => {
  const [items, setItems] = useState<T[]>(initialItems);
  const [newItem, setNewItem] = useState<Partial<T>>({});

  const updateNewItem = useCallback((updatedItem: Partial<T>) => {
    setNewItem((prev) => ({ ...prev, ...updatedItem }));
  }, []);

  const addItem = useCallback(() => {
    if (Object.keys(newItem).length > 0) {
      const itemWithId = { ...newItem, id: Date.now() } as T;
      setItems((prev) => [...prev, itemWithId]);
      setNewItem({});
    }
  }, [newItem]);

  const updateItem = useCallback((id: number, updatedItem: Partial<T>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
  }, []);

  const deleteItem = useCallback((id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return {
    items,
    newItem,
    updateNewItem,
    addItem,
    updateItem,
    deleteItem,
  };
};
