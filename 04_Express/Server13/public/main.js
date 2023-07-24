getBoard_list();

// 데이터베이스에서 게시물들을 읽어와서 table 의 tbody 에 tr 과 td로 삽입해넣는 함수
async function getBoard_list(){
    try{
        const result = await axios.get('/boards/boardList');
        const boards = result.data;

        const tbody = document.querySelector('#board-list tbody');
        tbody.innerHTML = '';
        boards.map( async (board)=>{

            const row = document.createElement('tr');

            let td = document.createElement('td');
            td.textContent = board.id;
            td.id = 'boardnum';
            row.appendChild(td);    // 게시물 번호

            td = document.createElement('td');
            let tContent = board.subject;

            // 해당 게시물의 댓글 갯수를 조회해서 제목 옆에 붙여넣을 예정
            try{
                const result = await axios.get(`boards/replycnt/${ board.id }`);
                const data = result.data;
                let cnt = data.cnt;
                if(cnt != 0){
                    tContent = tContent + '<span style="color:red; font-weight=bolad">[' + cnt + ']</span>';
                }
            }catch(err){
                console.error(err);
            }

            td.innerHTML = tContent;
            row.appendChild(td);    // 게시물 제목

            td = document.createElement('td');
            td.textContent = board.writer;
            td.id = 'writer';
            row.appendChild(td);    // 작성자

            td = document.createElement('td');
            tContent = board.created_at;
            td.textContent = tContent.substr(0, 10);
            td.id = 'created_at';
            row.appendChild(td);    // 작성일

            td = document.createElement('td');
            td.textContent = board.readCount;
            td.id = 'readCount';
            row.appendChild(td);    // 조회수

            tbody.appendChild(row); // 완성된 행을 tbody에 삽입
        });
    }catch(err){
        console.error(err);
    }
}