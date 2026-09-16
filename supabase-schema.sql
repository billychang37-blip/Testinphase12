-- SQL Schema for OCBC Digital Banking (Run this in the Supabase SQL Editor)

-- 1. Create the `profiles` table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name TEXT,
    last_name TEXT,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    gender TEXT,
    dob DATE,
    id_type TEXT,
    id_no TEXT,
    skip_id BOOLEAN DEFAULT FALSE,
    account_type TEXT,
    currency TEXT,
    country TEXT,
    address TEXT,
    
    -- Generated banking credentials
    generated_user_id TEXT UNIQUE,
    generated_pin TEXT,
    account_number TEXT UNIQUE,
    
    -- Starting balances and status
    wallet_balance NUMERIC(15, 2) DEFAULT 0.00,
    savings_balance NUMERIC(15, 2) DEFAULT 0.00,
    total_assets NUMERIC(15, 2) DEFAULT 0.00,
    
    kyc_status TEXT DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'approved', 'rejected')),
    account_status TEXT DEFAULT 'active' CHECK (account_status IN ('active', 'suspended', 'frozen')),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on profiles but allow the service role (API) to bypass it
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
CREATE POLICY "Users can view own profile" 
    ON public.profiles FOR SELECT 
    USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" 
    ON public.profiles FOR UPDATE 
    USING (auth.uid() = id);

-- =================================================================================

-- 2. Create the `transactions` table
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    type TEXT NOT NULL CHECK (type IN ('deposit', 'transfer', 'withdrawal', 'loan_disbursement', 'gift_card')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    
    amount NUMERIC(15, 2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    
    recipient_name TEXT,
    recipient_account TEXT,
    recipient_bank TEXT,
    
    reference TEXT,
    description TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on transactions
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own transactions
CREATE POLICY "Users can view own transactions" 
    ON public.transactions FOR SELECT 
    USING (auth.uid() = user_id);

-- =================================================================================

-- 3. Create the `loans` table
CREATE TABLE IF NOT EXISTS public.loans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    amount NUMERIC(15, 2) NOT NULL,
    duration_months INTEGER NOT NULL,
    interest_rate NUMERIC(5, 2) NOT NULL, -- e.g. 0.15 for 15%
    
    total_repayment NUMERIC(15, 2) NOT NULL,
    monthly_repayment NUMERIC(15, 2) NOT NULL,
    purpose TEXT,
    
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'paid')),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on loans
ALTER TABLE public.loans ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own loans
CREATE POLICY "Users can view own loans" 
    ON public.loans FOR SELECT 
    USING (auth.uid() = user_id);

-- Allow users to insert their own loans
CREATE POLICY "Users can insert own loans" 
    ON public.loans FOR INSERT 
    WITH CHECK (auth.uid() = user_id);
