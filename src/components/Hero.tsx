
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWorkflow } from '@/context/WorkflowContext';

const Hero = () => {
  const { setCurrentStep } = useWorkflow();

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-brand-50 to-blue-50">
      <div className="container-custom mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 space-y-6 mb-12 lg:mb-0 animate-slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
              <span className="block">Launch Your Email</span>
              <span className="block mt-2 text-brand-600">Domain in Minutes</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-lg">
              Simple, professional email hosting with your own domain. Easy setup, no technical skills required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={() => setCurrentStep('packages')} 
                size="lg"
                className="bg-brand-600 hover:bg-brand-700 text-white font-medium"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-brand-600 text-brand-600 hover:bg-brand-50"
              >
                View Pricing
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative animate-fade-in">
            <div className="rounded-2xl bg-white shadow-xl overflow-hidden border border-gray-100">
              <div className="h-10 bg-gray-100 flex items-center px-4 border-b">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="h-8 bg-brand-100 rounded-md w-3/4"></div>
                  <div className="h-4 bg-gray-100 rounded-md"></div>
                  <div className="h-4 bg-gray-100 rounded-md w-5/6"></div>
                  <div className="h-12 bg-brand-500 rounded-md w-1/3"></div>
                  
                  <div className="mt-6 border-t pt-6 border-dashed">
                    <div className="flex space-x-4">
                      <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-brand-400 rounded-full"></div>
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="h-5 bg-gray-100 rounded-md w-1/2"></div>
                        <div className="h-4 bg-gray-100 rounded-md w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-400 to-brand-600 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-indigo-400 to-blue-600 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
