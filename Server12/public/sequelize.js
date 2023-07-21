getUser();





document.getElementById('user-form').addEventListener('submit',async(e)=>{
      e.preventDefault();
      const name = e.target.username.value;
      const age = e.target.age.value;
      const married = e.target.married.checked;
      if(!name){return alert('이름을 입력하세요')};
      if(!age){return alert('나이를 입력하세요')};
          
      try{
           await axios.post('/users/insert',{name, age, married});
      }catch(e){
        console.log(e);
        getUsers();
      }
      e.target.username.value = '';
      e.target.age.value = '';
      e.target.married.checked = '';
});     

async function getUser(){
    try{
        // 모든 user를 조회새서 user-list를 테이블에 표시함.
        const result =  await axios.get('/users');
        const users = result.data;

        const tbody = document.querySelector("#user-list tbody");
        tbody.innerHTML='';
    
        users.map(
             (user)=>{
                const row = document.createElement('tr'); // tr 태그 생성

                let td = document.createElement('td');  // td 태그 생성
                td.textContent = user.id;  // 생성된 태그에 user의 id 삽입
                row.appendChild(td); // tr 안에 td 삽입

                td = document.createElement('td');  
                td.textContent = user.name;  
                row.appendChild(td); 

                td = document.createElement('td');  
                td.textContent = user.age;  
                row.appendChild(td); 

                td = document.createElement('td');  
                td.textContent = user.married ? '기혼' : '미혼0';  
                row.appendChild(td); 

                tbody.appendChild(row); // 완성된 tr을 tbody에 추가
        }
   );


    }catch(err){
        console.log(err);
    }
};



document.getElementById('comment-form').addEventListener('submit',async(e)=>{
    e.preventDefault();
    const id = e.target.userid.value;
    const comment = e.target.comment.value;

    if(!id){return alert('아이디를 입력하세요')};
    if(!comment){return alert('댓글을 입력하세요')};
        
    try{
         await axios.post('/comments/insert',{id, comment});
    }catch(err){
      console.error(err);
    }
    e.target.userid.value = '';
    e.target.comment.value = '';
});    



async function getComments(){
    try{
         const res = await axios.get('/comments');
         const comments = result.data;
         const tbody = document.querySelector('#comment-list-tbody');
         tbody.innerHTML = '';

         comments.map(
            (comment)=>{
              const row = document.createElement('tr');

              let td = document.createElement('td');
              td.textContent = comment.id; // 댓글 번호
              row.appendChild(td);

              td = document.createElement('td');  
              td.textContent = comment.User.name;  
              // td.textContent = comment.commenter
              row.appendChild(td); 

              td = document.createElement('td');  
              td.textContent = comment.comment;
              row.appendChild(td); 

              // 수정-삭제 버튼
              const edit = document.createElement('button');
              edit.textContent = '수정';
              const remove = document.createElement('button');
              remove.textContent = '삭제';
              td = document.createElement('td');   // td 생성
              td.appendChild(edit);   // 버튼을 td에 추가
              row.appendChild(td);     // 버튼이 든 td에
              td = document.createElement('td');
              td.appendChild(remove);
              row.appendChild(td);

              tbody.appendChild(row);
         }
        );
    }catch(err){
        console.error(err);
    }
}