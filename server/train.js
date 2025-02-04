//lenh cua admin
app.post('/addTable', (req, res) => {
    const createTable = `
        CREATE TABLE testTable (
            id int auto_increment primary key,
            test1 varchar(255),
            test2 text
        )
    `;

    connection.query(createTable, (error, results) => {
        if(error){
            console.error('loi: ', error);
            res.status(500).json({error: 'loi'});
        } else {
            console.log('truyen thanh cong');
            // res.status(200).json({message: 'them thanh cong'});
        }
    })
})

app.get('/viewTable', (req, res) => {
    const {name, password} = req.body;
    const query = 'SELECT * FROM login WHERE name = ? AND password = ?';
    console.log('here');
    connection.query(query, [name, password], (error, results) => {
        console.log('here1');

        if(error) {
            console.error('loi: ', error);
            res.status(500).json({error: 'khong xem duoc'});
        } else {
            console.log('here2');
            console.log('thanh cong');
            res.status(200).json(results);
        }
    })
})