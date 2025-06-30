
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Share2, 
  Download, 
  Copy, 
  Link2, 
  FileText, 
  Image,
  Mail,
  MessageSquare
} from 'lucide-react';
import { AnalysisResult } from '@/pages/Conversation';

interface ShareExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: AnalysisResult;
  conflictDescription: string;
  title: string;
}

export const ShareExportModal: React.FC<ShareExportModalProps> = ({
  isOpen,
  onClose,
  analysis,
  conflictDescription,
  title
}) => {
  const [shareUrl, setShareUrl] = useState('');
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const { toast } = useToast();

  const generateShareableLink = async () => {
    setIsGeneratingLink(true);
    try {
      // Simuler la génération d'un lien partageable
      const shareId = Math.random().toString(36).substring(7);
      const url = `${window.location.origin}/shared/${shareId}`;
      setShareUrl(url);
      
      toast({
        title: "Lien généré ! 🔗",
        description: "Votre analyse peut maintenant être partagée"
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer le lien",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingLink(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copié ! 📋",
        description: "Le contenu a été copié dans le presse-papiers"
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de copier le contenu",
        variant: "destructive"
      });
    }
  };

  const exportAsText = () => {
    const content = `
ECHO - Analyse de Communication
===============================

Titre: ${title}
Date: ${new Date().toLocaleDateString('fr-FR')}

Description du conflit:
${conflictDescription}

Analyse Empathique:
${analysis.empathyAnalysis || 'Non disponible'}

${analysis.strategyAnalysis ? `Analyse Stratégique:
${analysis.strategyAnalysis}` : ''}

${analysis.devilsAdvocateAnalysis ? `Préparation Défensive:
${typeof analysis.devilsAdvocateAnalysis === 'string' ? analysis.devilsAdvocateAnalysis : JSON.stringify(analysis.devilsAdvocateAnalysis, null, 2)}` : ''}

---
Généré par ECHO - AI Communication Coach
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `echo-analysis-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export réussi ! 📥",
      description: "Votre analyse a été téléchargée"
    });
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`ECHO - ${title}`);
    const body = encodeURIComponent(`Découvrez cette analyse de communication :\n\n${conflictDescription}\n\nAnalysé avec ECHO - AI Communication Coach`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const shareViaSocial = (platform: string) => {
    const text = encodeURIComponent(`J'ai utilisé ECHO pour analyser un conflit de communication. Cet outil IA m'aide à mieux comprendre les perspectives des autres ! 🧠✨`);
    const url = encodeURIComponent(window.location.href);
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-blue-600" />
            Partager & Exporter
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="share" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="share">Partager</TabsTrigger>
            <TabsTrigger value="export">Exporter</TabsTrigger>
          </TabsList>

          <TabsContent value="share" className="space-y-4">
            <div className="space-y-3">
              <Button
                onClick={generateShareableLink}
                disabled={isGeneratingLink}
                className="w-full justify-start"
                variant="outline"
              >
                <Link2 className="h-4 w-4 mr-2" />
                {isGeneratingLink ? 'Génération...' : 'Générer un lien'}
              </Button>

              {shareUrl && (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input value={shareUrl} readOnly className="text-xs" />
                    <Button
                      size="sm"
                      onClick={() => copyToClipboard(shareUrl)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <Badge className="text-xs bg-green-50 text-green-700">
                    Lien valide 7 jours
                  </Badge>
                </div>
              )}

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Partager via :</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={shareViaEmail}
                    className="justify-start"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => shareViaSocial('whatsapp')}
                    className="justify-start"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            <div className="space-y-3">
              <Button
                onClick={exportAsText}
                className="w-full justify-start"
                variant="outline"
              >
                <FileText className="h-4 w-4 mr-2" />
                Exporter en TXT
              </Button>

              <Button
                onClick={() => copyToClipboard(`${conflictDescription}\n\n${analysis.empathyAnalysis || ''}`)}
                className="w-full justify-start"
                variant="outline"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copier l'analyse
              </Button>

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-700">
                  💡 <strong>Astuce :</strong> Sauvegardez vos meilleures analyses pour les consulter plus tard !
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
