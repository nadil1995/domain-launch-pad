
import { packages, users, domains, emailAccounts } from './mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
}

export interface DomainData {
  name: string;
  userId: string;
}

export interface EmailAccountData {
  username: string;
  password: string;
  isDefaultAddress: boolean;
}

class MockApi {
  async login({ email, password }: LoginData) {
    await delay(1000);
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error("Invalid credentials");
    }
    
    return { ...user, password: undefined };
  }

  async register({ email, password, name }: RegisterData) {
    await delay(1000);
    if (users.find(u => u.email === email)) {
      throw new Error("Email already exists");
    }

    const newUser = {
      id: String(users.length + 1),
      email,
      password,
      name
    };
    users.push(newUser);
    
    return { ...newUser, password: undefined };
  }

  async getPackages() {
    await delay(500);
    return packages;
  }

  async verifyDomain(domain: string) {
    await delay(2000);
    // Simulate domain verification check
    const valid = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(domain);
    
    if (!valid) {
      throw new Error("Invalid domain format");
    }
    
    return { verified: true };
  }

  async createEmailAccount(domainName: string, data: EmailAccountData) {
    await delay(1000);
    const domain = domains.find(d => d.name === domainName);
    
    if (!domain) {
      throw new Error("Domain not found");
    }

    if (emailAccounts.find(email => 
      email.username === data.username && email.domainId === domain.id
    )) {
      throw new Error("Email account already exists");
    }

    const newEmailAccount = {
      ...data,
      domainId: domain.id
    };
    
    emailAccounts.push(newEmailAccount);
    return newEmailAccount;
  }

  async getEmailAccounts(domainName: string) {
    await delay(500);
    const domain = domains.find(d => d.name === domainName);
    
    if (!domain) {
      throw new Error("Domain not found");
    }

    return emailAccounts.filter(email => email.domainId === domain.id);
  }

  async deleteEmailAccount(domainName: string, username: string) {
    await delay(800);
    const domain = domains.find(d => d.name === domainName);
    
    if (!domain) {
      throw new Error("Domain not found");
    }

    const index = emailAccounts.findIndex(
      email => email.username === username && email.domainId === domain.id
    );

    if (index === -1) {
      throw new Error("Email account not found");
    }

    emailAccounts.splice(index, 1);
    return { success: true };
  }
}

export const mockApi = new MockApi();
