"use client";

import { useStoreModal } from "@/hooks/user-store-modal";
import Modal from "@/components/ui/modal";

export const StoreModal = () => {
  const storeModal = useStoreModal();

  <Modal
    title="Create Stroe"
    description="Add a new store to manage products and categories"
    isOpen={storeModal.isOpen}
    onClose={storeModal.onClose}
  >
    {/* TODO */}
    Create Store Form
  </Modal>;
};
