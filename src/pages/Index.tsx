
import { WorkflowProvider, useWorkflow } from '@/context/WorkflowContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import PricingSection from '@/components/PricingSection';
import Workflow from '@/components/Workflow';
import Footer from '@/components/Footer';
import PackageSelection from '@/components/PackageSelection';
import AuthForm from '@/components/AuthForm';
import DomainVerification from '@/components/DomainVerification';
import EmailSetup from '@/components/EmailSetup';

const WorkflowContent = () => {
  const { currentStep } = useWorkflow();

  return (
    <>
      <Navbar />
      
      {currentStep === 'landing' && (
        <>
          <Hero />
          <Features />
          <PricingSection />
          <Workflow />
        </>
      )}
      
      {currentStep === 'packages' && <PackageSelection />}
      
      {currentStep === 'auth' && <AuthForm />}
      
      {currentStep === 'domain' && <DomainVerification />}
      
      {currentStep === 'email' && <EmailSetup />}
      
      {currentStep === 'complete' && (
        <div className="min-h-[50vh] flex items-center justify-center bg-brand-50">
          <div className="text-center px-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Setup Complete!</h1>
            <p className="text-lg text-gray-600 max-w-lg mx-auto mb-8">
              Your email service has been successfully set up. You can now access your email through webmail or configure your email client.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#"
                className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-md font-medium"
              >
                Access Webmail
              </a>
              <a 
                href="#"
                className="border border-brand-600 text-brand-600 hover:bg-brand-50 px-6 py-2 rounded-md font-medium"
              >
                View Dashboard
              </a>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </>
  );
};

const Index = () => {
  return (
    <WorkflowProvider>
      <WorkflowContent />
    </WorkflowProvider>
  );
};

export default Index;
