
import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWorkflow } from '@/context/WorkflowContext';

const packages = [
  {
    id: "basic",
    name: "Basic",
    price: 4.99,
    domains: 1,
    storage: 5,
    emails: 5,
    features: [
      "Custom domain email",
      "Webmail access",
      "5 GB storage per mailbox",
      "Mobile and desktop access",
      "Basic spam protection",
      "24/7 email support"
    ]
  },
  {
    id: "business",
    name: "Business",
    price: 9.99,
    domains: 3,
    storage: 15,
    emails: 25,
    popular: true,
    features: [
      "Everything in Basic",
      "Up to 3 domains",
      "15 GB storage per mailbox",
      "Advanced spam & virus protection",
      "Email forwarding",
      "Priority support"
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 19.99,
    domains: 10,
    storage: 50,
    emails: 100,
    features: [
      "Everything in Business",
      "Up to 10 domains",
      "50 GB storage per mailbox",
      "Email archiving",
      "Advanced security features",
      "Dedicated account manager"
    ]
  }
];

const PricingSection = () => {
  const { setSelectedPackage, setCurrentStep } = useWorkflow();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const handleSelectPackage = (pkg: any) => {
    setSelectedPackage(pkg);
    setCurrentStep('packages');
  };

  return (
    <section id="pricing" className="section bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Choose the right plan for your email hosting needs.
          </p>
          
          <div className="inline-flex items-center p-1 bg-gray-100 rounded-lg mb-8">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                billingPeriod === 'monthly'
                  ? 'bg-white text-brand-600 shadow-sm'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                billingPeriod === 'yearly'
                  ? 'bg-white text-brand-600 shadow-sm'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Yearly <span className="text-green-600 font-medium">Save 20%</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white rounded-xl overflow-hidden border ${
                pkg.popular ? 'border-brand-600 ring-2 ring-brand-100' : 'border-gray-200'
              } shadow-sm hover:shadow-md transition-shadow`}
            >
              {pkg.popular && (
                <div className="bg-brand-600 text-white text-center py-1.5 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {pkg.name}
                </h3>
                
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ${billingPeriod === 'yearly' 
                      ? (pkg.price * 0.8).toFixed(2)
                      : pkg.price.toFixed(2)}
                  </span>
                  <span className="text-gray-600 ml-1">
                    /month{billingPeriod === 'yearly' ? ' (billed annually)' : ''}
                  </span>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600 mr-3">
                      <span className="font-medium">{pkg.domains}</span>
                    </div>
                    <span className="text-gray-700">Domains</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600 mr-3">
                      <span className="font-medium">{pkg.storage}</span>
                    </div>
                    <span className="text-gray-700">GB Storage</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600 mr-3">
                      <span className="font-medium">{pkg.emails}</span>
                    </div>
                    <span className="text-gray-700">Email Accounts</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleSelectPackage(pkg)}
                  className={`w-full ${
                    pkg.popular
                      ? 'bg-brand-600 hover:bg-brand-700 text-white'
                      : 'bg-white border-brand-600 text-brand-600 hover:bg-brand-50'
                  }`}
                  variant={pkg.popular ? "default" : "outline"}
                >
                  Choose {pkg.name}
                </Button>
                
                <ul className="mt-6 space-y-2">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
