
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Save, X } from 'lucide-react';

interface EditableMessageProps {
  content: string;
  onEdit: (newContent: string) => void;
  isLastUserMessage?: boolean;
}

export const EditableMessage: React.FC<EditableMessageProps> = ({ 
  content, 
  onEdit, 
  isLastUserMessage = false 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleSave = () => {
    if (editedContent.trim() && editedContent !== content) {
      onEdit(editedContent.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-3">
        <Textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="min-h-[100px] text-base border-amber-200 focus:border-amber-400 focus:ring-amber-400/20"
          autoFocus
        />
        <div className="flex gap-2 justify-end">
          <Button
            onClick={handleCancel}
            variant="outline"
            size="sm"
            className="border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            <X className="w-4 h-4 mr-1" />
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            size="sm"
            className="bg-amber-600 hover:bg-amber-700 text-white"
            disabled={!editedContent.trim() || editedContent === content}
          >
            <Save className="w-4 h-4 mr-1" />
            Save Changes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative">
      <div className="text-amber-700 whitespace-pre-wrap leading-relaxed bg-amber-100/50 rounded-lg p-4">
        {content}
      </div>
      {isLastUserMessage && (
        <Button
          onClick={() => setIsEditing(true)}
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-amber-600 hover:text-amber-800 hover:bg-amber-100"
        >
          <Edit className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};
