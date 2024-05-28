import React, { useState } from 'react';
import { router } from '@inertiajs/react'
import MenuLayout from '@/Layouts/MenuLayout';
import TrackedLot from '@/Components/TrackedLotPanel';
import {Head} from '@inertiajs/react';

export default function TrackedLots({ lots }) {

  function handleDelete(id) {
    router.delete(`/tracked/${id}`);
  };

  return (
    <MenuLayout>
      <Head title="Відстежувані лоти" />

      {lots.map(lot => (
        <TrackedLot key={lot.id} lot={lot} onDelete={() => handleDelete(lot.id)} />
      ))}
    </MenuLayout>
  );
}