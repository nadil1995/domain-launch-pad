
import { CheckCircle } from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "Choose a Plan",
    description: "Select the email hosting package that best suits your needs."
  },
  {
    number: "02",
    title: "Register or Login",
    description: "Create an account or login to manage your email services."
  },
  {
    number: "03",
    title: "Verify Your Domain",
    description: "Confirm ownership of your domain by adding our DNS records."
  },
  {
    number: "04",
    title: "Create Email Accounts",
    description: "Set up email addresses for yourself and your team."
  },
  {
    number: "05",
    title: "Start Using Your Email",
    description: "Access your email through our webmail or connect to your favorite client."
  }
];

const Workflow = () => {
  return (
    <section id="workflow" className="section bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple Setup Process
          </h2>
          <p className="text-lg text-gray-600">
            Get your professional email up and running in minutes with our easy setup process.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 bg-brand-600 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Why Our Process is Different</h3>
              <p className="mb-6">
                Unlike other providers, we've simplified the email setup process to get you up and running quickly and easily.
              </p>
              
              <ul className="space-y-4">
                {[
                  "No technical expertise required",
                  "Step-by-step guided process",
                  "Automatic DNS verification",
                  "Instant email account creation",
                  "Support available at every step"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="space-y-10">
              {steps.map((step, index) => (
                <div key={index} className="flex">
                  <div className="mr-6 flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold">
                      {step.number}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="h-full w-0.5 bg-gray-200 mx-auto my-2"></div>
                    )}
                  </div>
                  <div className="pt-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                    
                    {index === 0 && (
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="grid grid-cols-3 gap-4">
                          {['Basic', 'Business', 'Enterprise'].map((plan) => (
                            <div key={plan} className="text-center p-3 bg-white rounded-md border border-gray-200">
                              <div className="font-medium text-gray-900">{plan}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {index === 2 && (
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Type</span>
                            <span className="text-sm font-medium">Value</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white rounded-md">
                            <span className="text-sm">TXT</span>
                            <span className="text-sm text-gray-600">verify.emaillaunch.com</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white rounded-md">
                            <span className="text-sm">MX</span>
                            <span className="text-sm text-gray-600">mail.emaillaunch.com</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflow;
