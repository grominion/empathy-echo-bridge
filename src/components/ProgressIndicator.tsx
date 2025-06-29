
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Zap, Shield } from 'lucide-react';

interface ProgressStep {
  id: string;
  name: string;
  icon: React.ReactNode;
  status: 'pending' | 'processing' | 'completed' | 'error';
}

interface ProgressIndicatorProps {
  steps: ProgressStep[];
  currentStep: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep
}) => {
  const progress = (currentStep / steps.length) * 100;

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Analyse en cours...</h3>
            <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
          </div>
          
          <Progress value={progress} className="w-full" />
          
          <div className="space-y-3 mt-6">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  index < currentStep
                    ? 'bg-green-50 text-green-700'
                    : index === currentStep
                    ? 'bg-blue-50 text-blue-700'
                    : 'bg-gray-50 text-gray-500'
                }`}
              >
                <div className={`p-2 rounded-full ${
                  index < currentStep
                    ? 'bg-green-100'
                    : index === currentStep
                    ? 'bg-blue-100 animate-pulse'
                    : 'bg-gray-100'
                }`}>
                  {step.icon}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{step.name}</p>
                  <p className="text-sm opacity-75">
                    {index < currentStep
                      ? 'Terminé'
                      : index === currentStep
                      ? 'En cours...'
                      : 'En attente'
                    }
                  </p>
                </div>
                {index < currentStep && (
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const useAnalysisProgress = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  
  const steps: ProgressStep[] = [
    {
      id: 'empathy',
      name: 'Analyse empathique (Claude)',
      icon: <Brain className="w-4 h-4" />,
      status: 'pending'
    },
    {
      id: 'strategy',
      name: 'Analyse stratégique (Gemini)',
      icon: <Zap className="w-4 h-4" />,
      status: 'pending'
    },
    {
      id: 'defense',
      name: 'Préparation défensive (GPT-4)',
      icon: <Shield className="w-4 h-4" />,
      status: 'pending'
    }
  ];

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length));
  };

  const reset = () => {
    setCurrentStep(0);
  };

  return {
    steps,
    currentStep,
    nextStep,
    reset,
    isComplete: currentStep >= steps.length
  };
};
