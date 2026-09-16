ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS kyc_status TEXT DEFAULT 'unverified';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS kyc_document_type TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS kyc_document_data TEXT;
