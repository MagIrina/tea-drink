export interface OrderRequest {
  name: string;
  last_name: string;
  phone: string;
  country: string;
  zip: string;
  address: string;
  product: string;
  comment?: string;
}
