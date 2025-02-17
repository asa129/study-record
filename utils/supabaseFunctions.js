import { supabase } from "./spabase"

export const getAllDatas = async() => {
  const datas = await supabase.from("study-record").select("*"); 
  return datas;
};