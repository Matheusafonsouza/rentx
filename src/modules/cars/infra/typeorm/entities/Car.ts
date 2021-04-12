import { v4 as uuidV4 } from 'uuid';

class Car {
  id: string;

  name: string;

  description: string;

  license_plate: string;

  daily_rate: number;

  fine_amount: number;

  brand: string;

  category_id: string;

  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Car };