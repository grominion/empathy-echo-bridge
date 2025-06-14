
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface StartNewConversationFabProps {
  onStartNew: () => void;
  isVisible: boolean;
}

export const StartNewConversationFab: React.FC<StartNewConversationFabProps> = ({ 
  onStartNew, 
  isVisible 
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-full px-4 py-2"
          >
            <Plus className="w-4 h-4 mr-2" />
            New
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Start New Conversation?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to start a new conversation? Your current progress will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onStartNew}>
              Start New
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
