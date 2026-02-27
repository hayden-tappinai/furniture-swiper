-- Furniture items
CREATE TABLE IF NOT EXISTS items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  store TEXT NOT NULL,
  url TEXT NOT NULL,
  image_url TEXT,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User swipes (for persistence)
CREATE TABLE IF NOT EXISTS swipes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  item_id UUID REFERENCES items(id),
  liked BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS but allow anonymous access for now
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE swipes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous read items" ON items FOR SELECT USING (true);
CREATE POLICY "Allow anonymous read swipes" ON swipes FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert swipes" ON swipes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous delete swipes" ON swipes FOR DELETE USING (true);
