import { useState } from 'react';
import { Apple, Twitter } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWorkflow } from '@/context/WorkflowContext';
import { useToast } from '@/components/ui/use-toast';

const AuthForm = () => {
  const { setUser, goToPreviousStep, goToNextStep } = useWorkflow();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      setUser({
        id: '123',
        email: loginData.email,
        name: loginData.email.split('@')[0]
      });
      toast({
        title: "Logged in successfully",
        description: `Welcome back, ${loginData.email.split('@')[0]}!`,
      });
      goToNextStep();
    }, 1500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      setUser({
        id: '123',
        email: registerData.email,
        name: registerData.name
      });
      toast({
        title: "Account created",
        description: `Welcome, ${registerData.name}!`
      });
      goToNextStep();
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      setUser({
        id: '123',
        email: `user@${provider}.com`,
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`
      });
      toast({
        title: "Logged in successfully",
        description: `Welcome, ${provider.charAt(0).toUpperCase() + provider.slice(1)} User!`,
      });
      goToNextStep();
    }, 1500);
  };

  return (
    <div className="container-custom py-8 md:py-12">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Account Access</h1>
          <p className="text-gray-600">
            Sign in to your account or create a new one to continue.
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <div className="space-y-4 mb-6">
            <Button 
              onClick={() => handleSocialLogin('google')}
              variant="outline" 
              className="w-full"
              disabled={isLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81Z"/>
              </svg>
              Continue with Google
            </Button>
            
            <Button 
              onClick={() => handleSocialLogin('apple')}
              variant="outline"
              className="w-full"
              disabled={isLoading}
            >
              <Apple className="mr-2 h-4 w-4" />
              Continue with Apple
            </Button>
            
            <Button 
              onClick={() => handleSocialLogin('x')}
              variant="outline"
              className="w-full"
              disabled={isLoading}
            >
              <Twitter className="mr-2 h-4 w-4" />
              Continue with X
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="login">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={loginData.email}
                      onChange={handleLoginChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Button variant="link" className="p-0 h-auto text-xs text-brand-600">
                        Forgot password?
                      </Button>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={loginData.password}
                      onChange={handleLoginChange}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      required
                      value={registerData.name}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="registerEmail">Email address</Label>
                    <Input
                      id="registerEmail"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={registerData.email}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="registerPassword">Password</Label>
                    <Input
                      id="registerPassword"
                      name="password"
                      type="password"
                      required
                      value={registerData.password}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
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

export default AuthForm;
