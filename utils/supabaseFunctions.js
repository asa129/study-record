import { supabase } from "./spabase"

export const getAllDatas = async() => {
  const datas = await supabase.from("study-record").select("*"); 
  return datas.data;
};

export const insertData = async(props) => {
  const { title, time } = props;
  const { error } = await supabase.from("study-record").insert({ title: title, time: time });
  console.log(error);
};
