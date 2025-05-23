import React from 'react';
import { Item } from '../types/types';
import ItemCard from './ItemCard';

interface ItemListProps {
  items: Item[];
  onItemUpdated: () => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onItemUpdated }) => {
  return (
    <div className="item-list">
      {items.length === 0 ? (
        <p>No items found</p>
      ) : (
        items.map((item) => (
          <ItemCard 
            key={item.id} 
            item={item} 
            onItemUpdated={onItemUpdated} 
          />
        ))
      )}
    </div>
  );
};

export default ItemList;