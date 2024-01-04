const DELETED_ITEMS_STORAGE_KEY = "deletedItems";

export const getDeletedItemIds = (resource) => {
    const storedItems = localStorage.getItem(DELETED_ITEMS_STORAGE_KEY);
    const parsedItems = storedItems ? JSON.parse(storedItems) : {};
    return parsedItems[resource] || [];
};

export const addDeletedItemId = (resource, id) => {
    const currentItems = getDeletedItemIds(resource);
    const updatedItems = {
        ...currentItems,
        [resource]: [...(currentItems[resource] || []), id],
    };
    localStorage.setItem(DELETED_ITEMS_STORAGE_KEY, JSON.stringify(updatedItems));
};

export const clearDeletedItemIds = () => {
    localStorage.removeItem(DELETED_ITEMS_STORAGE_KEY);
};