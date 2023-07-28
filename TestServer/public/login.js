document.getElementById("login-form").addEventListener('submit', async (e) => {
    e.preventDefault();
    const userid = e.target.userid.value;
    const pwd = e.target.pwd.value;
    if (!userid) { 
        return alert('아이디를 입력하세요');    
    }
    if (!pwd) {  
        return alert('비밀번호를 입력하세요');    
    }

    try {
        const response = await axios.post('/members/login', { userid, pwd });
        const member = response.data;
        const msg = document.getElementById('msg');
        if (member == null) {
            msg.innerHTML = '아이디가 없습니다';
        } else if (member.pwd != pwd) {
            msg.innerHTML = '비밀번호가 맞지 않습니다';
        } else if (member.pwd == pwd) {
            // 로그인 성공 시 main.html로 이동
            location.href = '/main';
        } else {
            msg.innerHTML = '알 수 없는 이유로 로그인이 안돼요';
        }
    } catch (err) {
        console.error(err);
    }
    e.target.pwd.value = ''; // 로그인이 실패했을 때, 비밀번호 입력 필드 비움
});