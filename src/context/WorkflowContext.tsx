
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Package = {
  id: string;
  name: string;
  price: number;
  domains: number;
  storage: number;
  emails: number;
  features: string[];
};

type User = {
  id: string;
  email: string;
  name: string;
};

type EmailAccount = {
  username: string;
  password: string;
  isDefaultAddress: boolean;
};

type WorkflowStep = 'landing' | 'packages' | 'auth' | 'domain' | 'email' | 'complete';

interface WorkflowContextType {
  currentStep: WorkflowStep;
  setCurrentStep: (step: WorkflowStep) => void;
  selectedPackage: Package | null;
  setSelectedPackage: (pkg: Package | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  domain: string;
  setDomain: (domain: string) => void;
  emailAccounts: EmailAccount[];
  setEmailAccounts: (emails: EmailAccount[]) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

const workflowSteps: WorkflowStep[] = ['landing', 'packages', 'auth', 'domain', 'email', 'complete'];

export const WorkflowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<WorkflowStep>('landing');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [domain, setDomain] = useState<string>('');
  const [emailAccounts, setEmailAccounts] = useState<EmailAccount[]>([]);

  const goToNextStep = () => {
    const currentIndex = workflowSteps.indexOf(currentStep);
    if (currentIndex < workflowSteps.length - 1) {
      setCurrentStep(workflowSteps[currentIndex + 1]);
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = workflowSteps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(workflowSteps[currentIndex - 1]);
    }
  };

  return (
    <WorkflowContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        selectedPackage,
        setSelectedPackage,
        user,
        setUser,
        domain,
        setDomain,
        emailAccounts,
        setEmailAccounts,
        goToNextStep,
        goToPreviousStep,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = (): WorkflowContextType => {
  const context = useContext(WorkflowContext);
  if (context === undefined) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
};

