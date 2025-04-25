
import { useState } from 'react';
import { Check, ArrowLeft, ArrowRight } from 'lucide-react';
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

const PackageSelection = () => {
  const { selectedPackage, setSelectedPackage, setCurrentStep } = useWorkflow();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const handleSelectPackage = (pkg: any) => {
    setSelectedPackage(pkg);
  };

  const handleContinue = () => {
    setCurrentStep('auth');
  };

  const handleBack = () => {
    setCurrentStep('landing');
  };

  return (
    <div className="container-custom py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Package</h1>
          <p className="text-lg text-gray-600">
            Select the email hosting package that best fits your needs.
          </p>
        </div>

        <div className="mb-8">
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

        <div className="grid grid-cols-1 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => handleSelectPackage(pkg)}
              className={`bg-white rounded-xl overflow-hidden border ${
                selectedPackage?.id === pkg.id 
                  ? 'border-brand-600 ring-2 ring-brand-100' 
                  : 'border-gray-200'
              } p-6 cursor-pointer hover:shadow-md transition-shadow`}
            >
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-gray-900">
                      ${billingPeriod === 'yearly' 
                        ? (pkg.price * 0.8).toFixed(2)
                        : pkg.price.toFixed(2)}
                    </span>
                    <span className="text-gray-600 ml-1">
                      /month
                    </span>
                  </div>
                  {billingPeriod === 'yearly' && (
                    <div className="mt-1 text-green-600 text-sm font-medium">
                      Save 20% with annual billing
                    </div>
                  )}
                </div>

                <div className="md:w-2/4 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-semibold text-brand-600">{pkg.domains}</div>
                    <div className="text-sm text-gray-600">Domains</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-brand-600">{pkg.storage} GB</div>
                    <div className="text-sm text-gray-600">Storage</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-brand-600">{pkg.emails}</div>
                    <div className="text-sm text-gray-600">Email accounts</div>
                  </div>
                </div>

                <div className="md:w-1/4 md:text-right mt-4 md:mt-0">
                  <Button 
                    onClick={() => handleSelectPackage(pkg)}
                    className={`w-full md:w-auto ${
                      selectedPackage?.id === pkg.id
                        ? 'bg-brand-600 hover:bg-brand-700 text-white'
                        : 'bg-white border-brand-600 text-brand-600 hover:bg-brand-50'
                    }`}
                    variant={selectedPackage?.id === pkg.id ? "default" : "outline"}
                  >
                    {selectedPackage?.id === pkg.id ? 'Selected' : 'Select'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <Button
            onClick={handleBack}
            variant="outline"
            className="border-brand-600 text-brand-600 hover:bg-brand-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!selectedPackage}
            className="bg-brand-600 hover:bg-brand-700 text-white"
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PackageSelection;
