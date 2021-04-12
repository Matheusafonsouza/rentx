interface ICreateCarDTO {
  name: string;
  description: string;
  license_plate: string;
  daily_rate: number;
  fine_amount: number;
  brand: string;
  category_id: string;
}

export { ICreateCarDTO };
