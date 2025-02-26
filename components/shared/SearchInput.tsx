"use client";

import React, { useState } from "react";
import {
  Input,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  Button,
} from "@heroui/react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useBrandStore } from "@/store/useBrandStore";

interface SearchInputProps {
  onSearch?: (term: string) => void;
}

export function SearchInput({ onSearch }: SearchInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const { setLoading, setSearchTerm: setGlobalSearchTerm } = useBrandStore();

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      setLoading(true);
      setGlobalSearchTerm(searchTerm.trim());

      // Close modal and reset local state
      setIsOpen(false);
      setSearchTerm("");

      // Navigate to explore page with search term
      router.push(`/explore?search=${encodeURIComponent(searchTerm.trim())}`);

      // Call the onSearch prop if provided
      if (onSearch) {
        onSearch(searchTerm.trim());
      }
    } catch (error) {
      console.error("Search error:", error);
      // You might want to add error handling UI here
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      {/* Trigger Input */}
      <div className="max-w-[300px] w-full">
        <Input
          placeholder="Search..."
          startContent={<FiSearch className="text-slate-400" />}
          onClick={() => setIsOpen(true)}
          readOnly
          className="cursor-pointer"
        />
      </div>

      {/* Search Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="2xl">
        <ModalContent>
          <ModalHeader className="text-xl font-bold">Search</ModalHeader>
          <ModalBody className="p-6">
            <div className="flex flex-col gap-4">
              <Input
                autoFocus
                label="Search"
                placeholder="Type to search..."
                startContent={<FiSearch className="text-slate-400" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full"
              />
              <div className="flex justify-end gap-2">
                <Button
                  color="default"
                  variant="light"
                  onPress={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={handleSearch}
                  isDisabled={!searchTerm.trim()}
                >
                  Search
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
