import { Properties } from './properties.model';

export interface Config {
  id?: string;
  name: string;
  value: string;
  deprecated: boolean;
  properties: Properties[];
}
