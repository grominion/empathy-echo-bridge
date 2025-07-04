
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, TrendingUp, Clock, Heart, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface QuickActionTemplatesProps {
  onTemplateSelect: (template: string) => void;
}

export const QuickActionTemplates: React.FC<QuickActionTemplatesProps> = ({ onTemplateSelect }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const quickTemplates = [
    {
      title: "Express Conflict ⚡",
      description: "Quick 30-second analysis",
      icon: <Zap className="h-6 w-6" />,
      template: "I just had a disagreement with someone close to me. I'd like to understand their perspective and find a solution quickly. How can I approach them constructively?"
    },
    {
      title: "Alternative Perspective 🔄", 
      description: "See the other person's viewpoint",
      icon: <TrendingUp className="h-6 w-6" />,
      template: "I had a disagreement with someone and I can't understand their reaction. Can you help me see things from their perspective and identify what might have hurt or frustrated them?"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {quickTemplates.map((template, index) => (
        <Card key={index} className="hover:shadow-lg transition-all cursor-pointer group border-2 hover:border-blue-200">
          <CardContent className="p-4">
            <Button
              variant="ghost"
              className="w-full h-full p-0 flex flex-col items-center gap-3 group-hover:bg-transparent"
              onClick={() => onTemplateSelect(template.template)}
            >
              <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                {template.icon}
              </div>
              <div className="text-center">
                <h4 className="font-medium text-gray-800 text-sm mb-1">
                  {template.title}
                </h4>
                <p className="text-xs text-gray-600">
                  {template.description}
                </p>
              </div>
            </Button>
          </CardContent>
        </Card>
      ))}

      {/* History Button */}
      <Card className="hover:shadow-lg transition-all cursor-pointer group border-2 hover:border-blue-200">
        <CardContent className="p-4">
          <Button
            variant="ghost"
            className="w-full h-full p-0 flex flex-col items-center gap-3 group-hover:bg-transparent"
            onClick={() => user ? navigate('/history') : navigate('/auth')}
          >
            <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              <Clock className="h-6 w-6" />
            </div>
            <div className="text-center">
              <h4 className="font-medium text-gray-800 text-sm mb-1">
                Recent History 📚
              </h4>
              <p className="text-xs text-gray-600">
                {user ? 'Review your analyses' : 'Sign in to access'}
              </p>
            </div>
          </Button>
        </CardContent>
      </Card>

      {/* Progress Motivation */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart className="h-5 w-5 text-purple-600" />
            <Users className="h-5 w-5 text-pink-600" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2 text-sm">
            Build Better Relationships
          </h3>
          <p className="text-xs text-gray-600 mb-3">
            Each analysis improves your emotional intelligence
          </p>
          <Button 
            size="sm" 
            className="w-full text-xs"
            onClick={() => user ? navigate('/dashboard') : navigate('/auth')}
          >
            {user ? 'View Progress' : 'Create Free Account'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
