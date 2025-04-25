import { useState } from 'react';
import { ArrowLeft, ArrowRight, Plus, Trash2, Info, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useWorkflow } from '@/context/WorkflowContext';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface EmailAccount {
  username: string;
  password: string;
  isDefaultAddress: boolean;
}

const EmailSetup = () => {
  const { domain, selectedPackage, emailAccounts, setEmailAccounts, goToPreviousStep, goToNextStep } = useWorkflow();
  const [newEmail, setNewEmail] = useState<EmailAccount>({
    username: '',
    password: '',
    isDefaultAddress: emailAccounts.length === 0
  });
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const handleAddEmail = () => {
    if (!newEmail.username || !newEmail.password) {
      toast({
        title: "Missing information",
        description: "Please provide both username and password.",
        variant: "destructive"
      });
      return;
    }

    if (emailAccounts.some(account => account.username === newEmail.username)) {
      toast({
        title: "Email already exists",
        description: "This username is already in use.",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);

    // Simulate API request
    setTimeout(() => {
      setIsCreating(false);
      setEmailAccounts([...emailAccounts, newEmail]);
      setNewEmail({
        username: '',
        password: '',
        isDefaultAddress: false
      });
      toast({
        title: "Email created",
        description: `${newEmail.username}@${domain} has been created successfully.`
      });
    }, 1000);
  };

  const handleDeleteEmail = (username: string) => {
    setEmailAccounts(emailAccounts.filter(account => account.username !== username));
    toast({
      title: "Email deleted",
      description: `${username}@${domain} has been deleted.`
    });
  };

  const handleContinue = () => {
    if (emailAccounts.length === 0) {
      toast({
        title: "No email accounts",
        description: "Please create at least one email account before proceeding.",
        variant: "destructive"
      });
      return;
    }

    goToNextStep();
  };

  return (
    <div className="container-custom py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Create Email Accounts</h1>
          <p className="text-gray-600">
            Create email accounts for your domain. You can add up to {selectedPackage?.emails} email accounts with your {selectedPackage?.name} plan.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Create a new email account</CardTitle>
                <CardDescription>
                  Create email addresses for you and your team at {domain}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="username">Username</Label>
                      <div className="flex items-center mt-1">
                        <Input
                          id="username"
                          value={newEmail.username}
                          onChange={(e) => setNewEmail({...newEmail, username: e.target.value})}
                          className="rounded-r-none"
                        />
                        <div className="bg-gray-100 px-3 py-2 border border-l-0 border-input rounded-r-md text-gray-500">
                          @{domain}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={newEmail.password}
                        onChange={(e) => setNewEmail({...newEmail, password: e.target.value})}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="default"
                      checked={newEmail.isDefaultAddress}
                      onChange={(e) => setNewEmail({...newEmail, isDefaultAddress: e.target.checked})}
                      className="rounded border-gray-300 text-brand-600 focus:ring-brand-600"
                    />
                    <Label htmlFor="default" className="text-sm text-gray-700">
                      Set as default email address
                    </Label>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button
                  onClick={handleAddEmail}
                  disabled={isCreating || !newEmail.username || !newEmail.password}
                  className="bg-brand-600 hover:bg-brand-700 text-white"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {isCreating ? "Creating..." : "Create Email"}
                </Button>
              </CardFooter>
            </Card>
            
            {emailAccounts.length > 0 && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Your Email Accounts ({emailAccounts.length}/{selectedPackage?.emails})</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {emailAccounts.map((account, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-md"
                      >
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-brand-600" />
                          <div>
                            <div className="font-medium">{account.username}@{domain}</div>
                            {account.isDefaultAddress && (
                              <span className="text-xs bg-brand-100 text-brand-800 px-2 py-0.5 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteEmail(account.username)}
                          className="text-gray-500 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Email Access</CardTitle>
                <CardDescription>
                  How to access your email accounts
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="webmail">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="webmail">Webmail</TabsTrigger>
                    <TabsTrigger value="client">Email Client</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="webmail" className="space-y-4 mt-4">
                    <p className="text-sm text-gray-600">
                      Access your email through our web interface from any browser.
                    </p>
                    <Button className="w-full" variant="outline">
                      Open Webmail
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="client" className="mt-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium">IMAP Settings</h3>
                        <div className="mt-1 text-sm text-gray-600">
                          <p>Server: mail.{domain}</p>
                          <p>Port: 993</p>
                          <p>Encryption: SSL/TLS</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium">SMTP Settings</h3>
                        <div className="mt-1 text-sm text-gray-600">
                          <p>Server: smtp.{domain}</p>
                          <p>Port: 587</p>
                          <p>Encryption: STARTTLS</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              
              <div className="bg-blue-50 p-4 mx-6 mb-6 rounded-lg border border-blue-100 flex space-x-3">
                <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-700">
                  Need help setting up your email client? Check out our detailed guides for Outlook, Apple Mail, and Gmail.
                </div>
              </div>
            </Card>
          </div>
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
          
          <Button
            onClick={handleContinue}
            className="bg-brand-600 hover:bg-brand-700 text-white"
            disabled={emailAccounts.length === 0}
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailSetup;
