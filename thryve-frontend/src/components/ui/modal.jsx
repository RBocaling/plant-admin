'use client';

import React from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Button } from '@/components/ui/button';

export default function Modal({ isOpen, onClose, title, onSave, children, saveLabel = 'Save', cancelLabel = 'Cancel' }) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <DialogPanel className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <DialogTitle className="text-lg font-bold mb-4">{title}</DialogTitle>

          <div className="space-y-3">{children}</div>

          <div className="mt-4 flex justify-end gap-2"> 
            {onSave && (
              <Button onClick={onSave} className="bg-[#4A7C59] text-white">
                {saveLabel}
              </Button>
            )}
             {cancelLabel && (
              <Button onClick={onClose} className="bg-red-500 text-white">
                {cancelLabel}
              </Button>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
