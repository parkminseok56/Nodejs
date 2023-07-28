// insertmember.js

document.getElementById("join-form").addEventListener('submit', async (e)=>{
    e.preventDefault();
    const userid = e.target.userid.value;
    const pwd = e.target.pwd.value;
    const name = e.target.name.value;
    if (!userid) {  return alert('아이디를 입력하세요');    }
    if (!pwd) {  return alert('비밀번호를 입력하세요');    }
    if (!name) {  return alert('이름을 입력하세요');    }
    try{
        await axios.post('/members/insertMember', {userid, pwd, name} );
        location.href = '/login.html';
    }catch(err){ console.error(err);  }
});


