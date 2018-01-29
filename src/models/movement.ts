import { Item } from './item';

export class Movement {
    _id: string;
    concept: string;
    type: string;
    description: string;
    date: Date;
    items: Item[];

    constructor(concept: string, type: string, description: string, date: Date, items: Item[]) {
      this.concept = concept;
      this.type = type;
      this.description = description;
      this.date = date;
      this.items = items;
    }
}
