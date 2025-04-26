import mongoose, { Schema, Document } from 'mongoose';

export interface IDomain extends Document {
  name: string;
  url: string;
}

const DomainSchema: Schema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

export const Domain = mongoose.model<IDomain>('Domain', DomainSchema);
