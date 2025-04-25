
import { Shield, Globe, Mail, Zap, Users, Server } from 'lucide-react';

const features = [
  {
    icon: <Globe className="h-10 w-10 text-brand-600" />,
    title: "Custom Domains",
    description: "Use your own domain for professional email addresses that match your brand."
  },
  {
    icon: <Mail className="h-10 w-10 text-brand-600" />,
    title: "Email Management",
    description: "Create unlimited email accounts and manage them all from one dashboard."
  },
  {
    icon: <Shield className="h-10 w-10 text-brand-600" />,
    title: "Advanced Security",
    description: "Enterprise-grade security with spam filtering and virus protection."
  },
  {
    icon: <Zap className="h-10 w-10 text-brand-600" />,
    title: "Easy Setup",
    description: "Set up your email in minutes with our guided step-by-step process."
  },
  {
    icon: <Users className="h-10 w-10 text-brand-600" />,
    title: "Multiple Users",
    description: "Create email accounts for your entire team or organization."
  },
  {
    icon: <Server className="h-10 w-10 text-brand-600" />,
    title: "Reliable Hosting",
    description: "99.9% uptime guarantee with our enterprise-grade infrastructure."
  }
];

const Features = () => {
  return (
    <section id="features" className="section bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for Professional Email
          </h2>
          <p className="text-lg text-gray-600">
            Our platform makes it easy to set up and manage professional email accounts with your own domain.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 p-3 inline-block bg-brand-50 rounded-lg">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
