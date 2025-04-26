import { Request, Response } from 'express';
import { Domain } from '../models/domainModel';

// GET all domains
export const getDomains = async (req: Request, res: Response) => {
  try {
    const domains = await Domain.find();
    res.status(200).json(domains);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch domains' });
  }
};

// POST a new domain
export const createDomain = async (req: Request, res: Response) => {
  try {
    const { name, url } = req.body;
    const newDomain = new Domain({ name, url });
    await newDomain.save();
    res.status(201).json(newDomain);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create domain' });
  }
};
