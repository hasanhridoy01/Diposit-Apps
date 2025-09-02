export interface User {
  id: string;
  email: string;
  role: 'admin' | 'member';
  full_name: string;
  created_at: string;
}

export interface Member {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone?: string;
  status: 'active' | 'inactive';
  created_at: string;
}

export interface DepositRequest {
  id: string;
  member_id: string;
  amount: number;
  currency: 'BDT';
  screenshot_url?: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}