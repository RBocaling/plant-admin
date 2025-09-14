import { supabase } from "../lib/supabaseClient";

// Generic CRUD functions without handling file upload
export const getItems = async (table) => {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
};

export const addItem = async (table, item) => {
  const { error } = await supabase.from(table).insert([item]);
  if (error) throw error;
};

export const updateItem = async (table, id, updates) => {
  const { error } = await supabase.from(table).update(updates).eq("id", id);
  if (error) throw error;
};

export const deleteItem = async (table, id) => {
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw error;
};
