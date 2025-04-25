
export const packages = [
  {
    id: "basic",
    name: "Basic Plan",
    price: 5.99,
    domains: 1,
    storage: 10,
    emails: 5,
    features: ["5 Email Accounts", "10GB Storage", "Webmail Access", "24/7 Support"]
  },
  {
    id: "pro",
    name: "Professional Plan",
    price: 12.99,
    domains: 3,
    storage: 50,
    emails: 20,
    features: ["20 Email Accounts", "50GB Storage", "Custom Domain", "Priority Support"]
  }
];

export const users = [
  {
    id: "1",
    email: "demo@example.com",
    name: "Demo User",
    password: "demo123" // In a real app, this would be hashed
  }
];

export const domains = [
  {
    id: "1",
    name: "example.com",
    userId: "1",
    verified: true
  }
];

export const emailAccounts = [
  {
    username: "admin",
    password: "admin123",
    isDefaultAddress: true,
    domainId: "1"
  }
];
