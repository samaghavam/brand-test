'use client';

import { useState, KeyboardEvent } from 'react';
import { cn } from '@/app/lib/utils';
import { Tag } from '@/app/brand/types';

interface TagInputProps {
  value: Tag[];
  onChange: (tags: Tag[]) => void;
  label?: string;
  placeholder?: string;
  error?: string;
}

export default function TagInput({
  value,
  onChange,
  label,
  placeholder = 'Type and press Enter to add tags',
  error,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      const newTag = { tag_name: inputValue.trim() };
      onChange([...value, newTag]);
      setInputValue('');
    }
  };

  const handleRemoveTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className={cn(
        'flex flex-wrap gap-2 p-2 border rounded-md',
        error ? 'border-red-300' : 'border-gray-300'
      )}>
        {value.map((tag, index) => (
          <div 
            key={index} 
            className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-md"
          >
            {tag.tag_name}
            <button
              type="button"
              className="ml-1 text-blue-600 hover:text-blue-800"
              onClick={() => handleRemoveTag(index)}
            >
              ×
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-grow outline-none bg-transparent min-w-[120px] py-1"
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
