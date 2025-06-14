
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

export const LoadingBubble: React.FC = () => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-xl rounded-2xl rounded-tl-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full">
            <MessageSquare className="w-5 h-5 text-blue-600" />
          </div>
          ECHO Coach Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 text-slate-600">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <span className="text-sm">Thinking...</span>
        </div>
      </CardContent>
    </Card>
  );
};
