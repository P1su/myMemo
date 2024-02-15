import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";

function Header(props){
  return(
    <header>
      <h1 className = 'headTitle'>{props.title}</h1>      
    </header>
  )
  
}

function Create(props){
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  
  return(
    <article className='createZone'>

      <form onSubmit={event =>{ 
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;

        props.onCreate(title, body);
        setTitle("");
        setBody("");
        
      }}>
        <p className='inputTitle'><input type='text' name='title' placeholder='제목을 입력하세요' value = {title}
          onChange={e=>setTitle(e.target.value)}
        ></input></p>
        <p className='inputBody'><textarea type='text' name='body' placeholder='내용을 입력하세요' value = {body}
          onChange = {e=>setBody(e.target.value)}
        ></textarea></p>
        <p className='createBtn'><button type='submit' name='submit' >새 메모 생성하기</button></p>
      </form>
        
    </article> 
  )
}

function Nav(props){
  const lis =[];//lis는 article을 담음.....

  for(let i = 0 ; i < props.memo.length ; i++){
    let t = props.memo[i];

    lis.push(<article key = {t.id} class='memo'>
      <p className='title'>{t.title}</p>
      <button type='button'>삭제</button>
      <p className = 'body'>{t.body}</p>
      <p className = 'date'>{t.id}</p>
    </article>

    )
  }
  lis.sort((a,b) => b.key - a.key);

  return(
    <ul>
      {lis}
    </ul>
    
  )

}

function App() {
  let storedMemo = [];

  if(localStorage.getItem('memoData')){
    storedMemo= JSON.parse(localStorage.getItem('memoData'));
  }else storedMemo=[];

  const [memo,setMemo] = useState(storedMemo);
  const [id, setId] = useState(0);
  const [nxtId,setNxtId] = useState(1);
  let content = null;

  useEffect(()=>{
    localStorage.setItem('memoData', JSON.stringify(memo)) 
  }, [memo]);
 

  return (
    <div className="App">
      <Header title = 'myMemo'></Header>

      <Create onCreate = {(_title, _body)=>{
        const newMemo = {id : nxtId, title : _title, body : _body};
        const newMemos = [...memo];
        newMemos.push(newMemo);
        

        setMemo(newMemos);
        setId(nxtId);
        setNxtId(nxtId+1);
        
      }}></Create>    

  
      <Nav memo = {memo} className='memoZone'></Nav>
     
    </div>
    
  );
}

export default App;