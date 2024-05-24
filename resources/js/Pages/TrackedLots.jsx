import React, { useState } from 'react';
import { router } from '@inertiajs/react'
import MenuLayout from '@/Layouts/MenuLayout';

export default function TrackedLots({lots}){
    const [favoriteLots, setFavoriteLots] = useState(lots);

    const handleDelete = (id) => {
      router.post('/wishlist/delete', { id }, {
        onSuccess: () => {
          setFavoriteLots(favoriteLots.filter(lot => lot.id !== id));
        },
        onError: (errors) => {
          console.error(errors);
        }
      });
    };
  
    return (
      <MenuLayout>
        {favoriteLots.map(lot => (
          <TrackedLot key={lot.id} lot={lot} onDelete={handleDelete} />
        ))}
      </MenuLayout>
    );
}