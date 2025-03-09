import { useEffect, useState } from 'react'
import './App.css'
import { deleteData, getAllDatas, insertData } from '../utils/supabaseFunctions';

function App() {
  const [records, setRecords] = useState([]);
  const [studyContent, setStudyContent] = useState("");
  const [studyTime, setStudyTime] = useState("");
  const [error, setError] = useState("");
  const [totalTime, setTotalTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const onChangeContent = (event) => setStudyContent(event.target.value);;
  const onChangeTime = (event) => setStudyTime(event.target.value);
  const onClickAdd = async () => {
    // 全項目が入力されていないときにエラーを設定
    if(studyContent === "" || studyTime === 0 || studyTime === ""){
      return setError(<p data-testid="error">入力されていない項目があります</p>);
    }
    setError("");
    // データベースに記録する
    const newData = {title:studyContent, time:studyTime};
    await insertData(newData);

    // 登録後のデータを取得
    await getDatas();

    setStudyContent("");
    setStudyTime(0);
  }
  const getDatas =  async() => {
    const datas = await getAllDatas();
    setRecords(datas);
  }

  // 削除ボタン押下
  const onClickDelete = async (id) => {
    await deleteData(id);
    getDatas();
  };
  
  // 初期表示
  useEffect(() => {
    getDatas();
    setLoading((loading) => loading = false);
  }, []);

	// 登録データに変更があった場合に合計時間を計算する
	useEffect(() => {
		// 合計時間の計算
		const time = records.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.time), 0);
		setTotalTime(time);
	}, [records]);

  return (
    <>
      {loading ? <p>loading中</p> : 
      <div>
      <h1 data-testid="title">学習記録一覧</h1>
      <div>
        <label htmlFor="studyContent">学習内容</label>
        <input data-testid="studyContent" type="text" placeholder='学習内容' value={studyContent} onChange={onChangeContent}/>
      </div>
      <div>
      <label htmlFor="studyTime">学習時間</label>
        <input data-testid="studyTime" type="number"  value={studyTime} onChange={onChangeTime}/>時間
      </div>
      <div>入力されている学習内容:{studyContent}</div>
      <div>入力されている時間:{studyTime}</div>
      <table>
        <thead></thead>
        <tbody>
          {records.map((record) =>
            <tr key={record.id} >
              <td>
                {`${record.title} ${record.time}時間`}
              </td>
              <td>
                <button data-testid="delete" onClick={() => onClickDelete(record.id)}>削除</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <button data-testid="add" onClick={onClickAdd}>登録</button>
      {error}<br />
      合計時間:{totalTime} / 1000(h)  
      </div>
      }
    </>
  )
}

export default App
