
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Copy, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useWorkflow } from '@/context/WorkflowContext';
import { useToast } from '@/components/ui/use-toast';

const DomainVerification = () => {
  const { domain, setDomain, selectedPackage, goToPreviousStep, goToNextStep } = useWorkflow();
  const [isVerifying, setIsVerifying] = useState(false);
  const [showDnsRecords, setShowDnsRecords] = useState(false);
  const { toast } = useToast();

  const dnsRecords = [
    { type: 'TXT', host: '@', value: 'v=emaillaunch verification=abc123' },
    { type: 'MX', host: '@', value: 'mail.emaillaunch.com', priority: '10' },
    { type: 'CNAME', host: 'mail', value: 'mail.emaillaunch.com' }
  ];

  const handleSubmitDomain = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!domain) {
      toast({
        title: "Domain Required",
        description: "Please enter a domain name to continue.",
        variant: "destructive"
      });
      return;
    }

    setShowDnsRecords(true);
  };

  const handleCopyRecord = (value: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied to clipboard",
      description: "DNS record has been copied to clipboard."
    });
  };

  const handleVerifyDomain = () => {
    setIsVerifying(true);
    
    // Simulate DNS verification
    setTimeout(() => {
      setIsVerifying(false);
      toast({
        title: "Domain verified successfully",
        description: "Your domain has been successfully verified. You can now create email accounts."
      });
      goToNextStep();
    }, 3000);
  };

  return (
    <div className="container-custom py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Domain Verification</h1>
          <p className="text-gray-600">
            Enter your domain name and follow the steps to verify ownership.
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          {!showDnsRecords ? (
            <form onSubmit={handleSubmitDomain}>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="domain">Enter your domain name</Label>
                  <p className="text-sm text-gray-500 mb-2">
                    This will be the domain used for your email addresses (e.g., yourname@yourdomain.com)
                  </p>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="domain"
                      placeholder="example.com"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      className="text-base"
                    />
                    <Button 
                      type="submit"
                      className="bg-brand-600 hover:bg-brand-700 text-white"
                    >
                      Continue
                    </Button>
                  </div>
                </div>

                <div className="bg-brand-50 p-4 rounded-lg border border-brand-100">
                  <h3 className="font-medium text-brand-900 mb-2">Your selected plan: {selectedPackage?.name}</h3>
                  <p className="text-sm text-brand-700 mb-4">
                    This plan allows you to use up to {selectedPackage?.domains} domain{selectedPackage?.domains !== 1 && 's'}.
                  </p>
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-2">Add these DNS records to your domain</h2>
                <p className="text-gray-600 mb-4">
                  To verify your domain ownership and set up email services, add the following DNS records at your domain registrar.
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Type</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Host</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Value</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Priority</th>
                        <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">Copy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dnsRecords.map((record, index) => (
                        <tr key={index} className="border-b border-gray-200">
                          <td className="py-3 px-4 text-sm font-medium">{record.type}</td>
                          <td className="py-3 px-4 text-sm">{record.host}</td>
                          <td className="py-3 px-4 text-sm text-gray-600 font-mono">{record.value}</td>
                          <td className="py-3 px-4 text-sm">{record.priority || '-'}</td>
                          <td className="py-3 px-4 text-right">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleCopyRecord(record.value)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 flex items-start space-x-3">
                <div className="text-amber-500 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-amber-800 mb-1">DNS propagation may take time</h3>
                  <p className="text-sm text-amber-700">
                    DNS changes can take up to 24-48 hours to propagate worldwide, though they often happen much faster.
                  </p>
                </div>
              </div>

              <div>
                <p className="text-gray-600 mb-4">
                  Once you've added these records at your domain registrar, click the button below to verify your domain.
                </p>
                
                <Button
                  onClick={handleVerifyDomain}
                  disabled={isVerifying}
                  className="bg-brand-600 hover:bg-brand-700 text-white"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Verify Domain
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8 flex justify-between">
          <Button
            onClick={goToPreviousStep}
            variant="outline"
            className="border-brand-600 text-brand-600 hover:bg-brand-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DomainVerification;
