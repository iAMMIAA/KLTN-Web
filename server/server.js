require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer'); // Thư viện multer để xử lý dữ liệu hình ảnh
const { spawn } = require('child_process');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const { Exchange } = require('./src/models/exchange.model');
const { ExchangeComment } = require('./src/models/comment.model');
const { ValidationError, fn } = require("sequelize");
const { ExchangeLike } = require('./src/models/like.model');
const { checkAccess } = require("./src/middleware/auth.middleware");
const { User } = require('./src/models/user.model');
const { createClient } = require('@clickhouse/client');

const app = express();
const port = process.env.PORT || 3001;
const jwtSecretKey = process.env.JWT_SECRET_KEY;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors()); 

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// const db_clickhouse = new createClient({
//     url: 'http://160.191.164.16:10123/',
//     username: 'mia',
//     password: 'miamia'
// })

// Kiểm tra kết nối
// async function testConnection() {
//     try {
//         const result = await db_clickhouse.ping();
//         console.log('Kết nối ClickHouse thành công:', result);
//     } catch (error) {
//         console.error('Lỗi kết nối ClickHouse:', error);
//     }
// }

// app.get('/clickhouse/:nameDrug', async (req, res) => {
//     const nameDrug = req.params.nameDrug;
//     const query = `SELECT * FROM drug_database WHERE name = {nameDrug:String}`;
//     try {
//         const result = await db_clickhouse.query({
//             query: query,
//             format: 'JSONEachRow',
//             query_params: {nameDrug}
//         });
//         const rows = await result.json();
//         console.log('result:', rows);      
//         res.status(200).json(rows);
//     } catch (error) {
//         console.error('Error querying ClickHouse:', error);
//         res.status(500).json({ error: 'Internal server error.' });
//     }
// });
app.get('/get-name-drug/:nameDrug', async (req, res) => {
    const nameDrug = req.params.nameDrug;
    const query = `SELECT * FROM informationdrug_detect WHERE name_drug = ?`;

    try {
        const [rows] = await connection.execute(query, [nameDrug]);
        console.log('result:', rows);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error querying MySQL:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// app.post('/write-info-drug', async (req, res) =>{
//     const { id_drug, uses, excipients, side_effects, name } = req.body;

//     try {
//         await db_clickhouse.insert({
//             table: 'drug_database',
//             values: [{ id_drug, uses, excipients, side_effects, name }],
//             format: 'JSONEachRow' // ClickHouse yêu cầu định dạng JSON khi insert
//         });

//         console.log('Data inserted successfully');
//         res.status(200).json({ message: 'Data inserted successfully' });

//     } catch (error) {
//         console.error('Error inserting data:', error);
//         res.status(500).json({ error: 'Internal server error.' });
//     }
// })
app.post('/write-info-drug', async (req, res) => {
    const { id_drug, uses, excipients, side_effects, name } = req.body;

    const query = `
        INSERT INTO informationdrug_detect (id_drug, uses, excipients, side_effects, name_drug)
        VALUES (?, ?, ?, ?, ?)
    `;

    try {
        const [result] = await connection.execute(query, [id_drug, uses, excipients, side_effects, name]);
        
        console.log('Data inserted successfully:', result);
        res.status(200).json({ message: 'Data inserted successfully' });

    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.post('/signup', (req, res) => {
    const { username, useremail, userpassword, confirm_password } = req.body;

    // Kiểm tra xem username hoặc useremail có tồn tại hay không
    const checkQuery = 'SELECT * FROM signuplogin WHERE username = ? OR useremail = ?';
    connection.query(checkQuery, [username, useremail], (checkErr, checkData) => {
        if (checkErr) {
            console.error('Error checking data in database: ' + checkErr.stack);
            return res.status(500).json({ error: 'Error checking data in database' });
        }

        if (checkData.length > 0) { // Nếu username hoặc useremail đã tồn tại
            return res.status(400).json({ message: 'Existed' });
        } else { // Nếu không tồn tại, tiếp tục chèn dữ liệu mới
            const insertQuery = 'INSERT INTO signuplogin (username, useremail, userpassword, confirm_password) VALUES (?,?,?,?)';
            connection.query(insertQuery, [username, useremail, userpassword, confirm_password], (insertErr, insertData) => {
                if (insertErr) {
                    console.error('Error inserting data into database: ' + insertErr.stack);
                    return res.status(500).json({ error: 'Error inserting data into database' });
                }
                console.log('Data inserted into database');
                res.status(200).json({ message: 'Success' });
            });
        }
    });
});
app.post('/login', (req, res) => {
    const { username, userpassword } = req.body;
    const query = 'select * from signuplogin WHERE username=? AND userpassword=?';
    
    connection.query(query,[username,userpassword],(error,data) => {
        if (error) {
            console.error('Error querying database: ' + err.stack);
            return res.status(500).json({ error: 'Error querying database' });
        }
        if (data.length > 0) {
            console.log('User found in database: ', data);
            const user = data[0];
            const token = jwt.sign({ userId: user.id, username: user.username, userpassword:user.userpassword }, jwtSecretKey);
            res.status(200).json({ message: 'Success', token: token, idUser: user.id, adminUser: user.adminUser});
        } else {
            console.log('User not found in database');
            return res.status(401).json({ error: 'Invalid email or password' });
        }
    })
});
app.post('/write-paper', (req, res) =>{
    console.log('iammia', req.body);
    const { title, author, content, tag, cite_source } = req.body;
    const query = 'insert into posts(title, author, cite_source, content, tag) values(?,?,?,?,?)';

    connection.query(query, [title, author, cite_source, content, tag], (error, results) =>{
        if(error) {
            console.error('Error inserting data: ', error);
            res.status(500).json({error: 'Internal server error.'});
        } else {
            console.log('Data inserted successfully');
            res.status(200).json({ message: 'Data inserted successfully' });
        }
    })
})
app.get('/exchanges', checkAccess(), async (req, res) => {
    try {
        const data = await Exchange.findAll({
            include: [
                {
                    model: User, 
                    as: 'user'
                },
                {
                    model: ExchangeLike,
                    required: false,
                    as: 'like',
                    where: { userId: res.locals.user.id }
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        console.log(JSON.stringify(data, null, 2)); // In toàn bộ dữ liệu với định dạng đẹp
        return res.status(200).send(data);
    } catch (e) {
        res.status(500).json({ error: 'Internal server error.' });
    }
});
app.post('/exchanges', checkAccess(), async (req, res) => {
    try {
        const { content } = req.body;
        const data = await Exchange.create({ content, createdBy: res.locals.user.id });
        return res.status(200).send(data);
    } catch (e) {
        console.error(e);
        if (e instanceof ValidationError) 
            return res.status(400).send({message: e.errors[0].message || e.message});
        res.status(500).json({error: 'Internal server error.'});
    }
});
app.get('/exchanges/:id', checkAccess(), async (req, res) => {
    try {
        const data = await Exchange.findByPk(req.params.id);
        return res.status(200).send(data);
    } catch (e) {
        res.status(500).json({error: 'Internal server error.'});
    }
});
app.patch('/exchanges/:id', checkAccess(), async (req, res) => {
    try {
        const [count, rows] = await Exchange.update(req.body, { returning: true });
        if (!count) {
            return res.status(404).send({
                message: 'Not Found',
            });
        }
        return res.status(200).send(rows[0]);
    } catch (e) {
        console.error(e);
        if (e instanceof ValidationError) {
            return res.status(400).send({
                message: e.errors[0].message || e.message
            });
        }
        res.status(500).json({error: 'Internal server error.'});
    }
});
app.get('/exchanges/:id/comments', checkAccess(), async (req, res) => {
    try {
        const data = await ExchangeComment.findAll({
            where: { exchangeId: req.params.id },
            include: ['user'],
            order: [['createdAt', 'DESC']],
        });
        return res.status(200).send(data);
    } catch (e) {
        res.status(500).json({error: 'Internal server error.'});
    }
});
app.post('/exchanges/:id/comments', checkAccess(), async (req, res) => {
    try {
        const exchangeId = req.params.id;
        const data = await ExchangeComment.create({
            exchangeId,
            userId: res.locals.user.id,
            contentComment: req.body.content,
        });
        console.log(JSON.stringify(data, null, 2)); // In toàn bộ dữ liệu với định dạng đẹp
        const user = await data.getUser();
        return res.status(200).send({ ...data.dataValues, user });
    } catch (e) {
        res.status(500).json({error: 'Internal server error.'});
    }
});
app.post('/exchanges/:id/like', checkAccess(), async (req, res) => {
    try {
        const exchangeId = req.params.id;
        const like = await ExchangeLike.findOne({
            where: {
                exchangeId,
                userId: res.locals.user.id,
            },
            attributes: ['id'],
        });

        if (like) {
            await like.destroy();
            await Exchange.update({
                likeNumber: Exchange.sequelize.literal('likeNumber - 1')
            }, {
                where: { id: exchangeId }
            });
            res.status(200).json({ message: 'unlike successfully' });
        }

        const data = await ExchangeLike.create({
            exchangeId,
            userId: res.locals.user.id,
        });
        await Exchange.update({
            likeNumber: Exchange.sequelize.literal('likeNumber + 1')
        }, {
            where: { id: exchangeId }
        });
        return res.status(200).send(data);
    } catch (e) {
        res.status(500).json({error: 'Internal server error.'});
    }
});
app.get('/comments/count', checkAccess(), async (req, res) => {
    try {
        const data = await ExchangeComment.findAll({
            group: ['exchangeId'],
            attributes: ['exchangeId', [fn('COUNT', 'exchangeId'), 'value']],
        });
        return res.status(200).send(data);
    } catch (e) {
        console.log('error', e);
        res.status(500).json({error: 'Internal server error.'});
    }
});
app.post('/update_profile/:idUser', (req, res) => {
    const data = req.body;
    const idUser = req.params.idUser;
    const query = `update signuplogin set fullName = ?, school = ?, phonenumber = ?, career = ?, gender = ?, country = ?, city = ?, areaCode = ? where id = ?;`
    connection.query(query, [data.fullName, data.school, data.phoneNumber, data.career, data.gender, data.country, data.city, data.areaCode, idUser], (error, results) => {
        if(error) {
            console.error('Error inserting data: ', error);
            res.status(500).json({error: 'Internal server error.'});
        } else {
            console.log('id user: ', idUser);
            res.status(200).json({ message: 'Data inserted successfully' });
        }
    })
})
// Thiết lập multer để lưu trữ hình ảnh tạm thời trong thư mục uploads
const upload = multer({ dest: 'uploads/' });
app.post('/predict', upload.single('image'), (req, res) => {
    const imagePath = req.file.path;
    const pythonProcess = spawn('python', ['predict_drug.py', imagePath]);

    pythonProcess.stdout.on('data', (data) => {
        console.log(`Tên thuốc: ${data}`);

        const nameDrug = data.toString().trim();
        const query = 'select * from informationdrug where nameDrug = ?';
        connection.query(query, [nameDrug], (error, results) => {
            if(error) {
                console.error(results);
                res.status(500).json({error: 'Loi khi truy van co so du lieu.'});
            }
            else {
                if (results.length > 0) res.json(results[0]);
                else res.status(404).json({ error: 'Không tìm thấy thông tin thuốc.' });
            }
        })
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
    });
});
app.get('/posts/:id', (req, res) => {
    const postID = req.params.id;
    const query1 = 'update posts set number_of_viewer = number_of_viewer + 1 where id = ?';
    const query2 = 'select * from posts where id = ?';

    connection.query(query1, [postID], (error, results) => {
        if(error) {
            res.status(500).json({error: 'Loi khi truy van co so du lieu.'});
        } else {
            connection.query(query2, [postID], (error,results) =>{
                if(error)
                    res.status(500).json({error: 'Loi khi truy van co so du lieu.'});
                else
                        if(results.length > 0)
                            res.json(results[0]);
                        else
                            res.status(404).json({ error: 'Không tìm thấy bài viết' });
                })
            }
        }
    );
});
app.get('/notification/:idUser', (req, res) => {
    const idUser = req.params.idUser;
    const readComment = `SELECT ec.*, u.username
                            FROM exchangecomments ec
                            JOIN exchanges e ON ec.exchangeId = e.id
                            JOIN signuplogin u ON ec.userId = u.id
                            WHERE ec.readComment = FALSE AND e.createdBy = ?;`;
    connection.query(readComment, [idUser], (error, results) => {
        if(error) {
            res.status(500).json({error: 'Loi khi truy van co so du lieu.'});
        } else res.status(200).json(results);
    })
});
app.get('/see_notication/:idComment', (req, res) => {
    const idComment = req.params.idComment;
    const updateQuery = "UPDATE exchangecomments SET readComment = true WHERE id = ?";
    const readComment = `SELECT u1.username as createrContent, ex.content, ec.contentComment, ec.userId as idUserComment, u.username as userComment, ec.createdAt, ec.id as idComment
                         FROM exchanges ex
                         JOIN exchangecomments ec ON ex.id = ec.exchangeId
                         JOIN signuplogin u ON ec.userId = u.id
                         JOIN signuplogin u1 ON ex.createdBy = u1.id
                         WHERE ec.exchangeId = (
                             SELECT exchangeId
                             FROM exchangecomments
                             WHERE id = ?
                         )
                         ORDER BY ec.createdAt desc;`;

    connection.query(updateQuery, [idComment], (updateError, updateResults) => {
        if (updateError) {
            res.status(500).json({ error: 'Error updating readComment.' });
        } else {
            connection.query(readComment, [idComment], (selectError, selectResults) => {
                if (selectError) {
                    res.status(500).json({ error: 'Error querying the database.' });
                } else {
                    res.status(200).json(selectResults);
                }
            });
        }
    });
});
app.get('/posts', (req, res) => {
    const query = `select * from posts`;

    connection.query(query, (error, result) => {
        if(error) {
            res.status(500).json({error: 'Loi khi truy van co so du lieu.'});
        } else {
            if(result.length > 0){
                res.json(result);
            } else {
                res.status(404).json({ error: 'Không tìm thấy bài viết' });
            }
        }
    })
})
app.get('/related_post/:tag', (req, res) => {
    const tagPost = req.params.tag;
    console.log(tagPost);
    const query = `select posts.title, posts.id, posts.author, posts.url_img, posts.date_update
                    from posts 
                    join tags 
                    on tags.tags = tags.tags 
                    where tags.tags = ?`;
    connection.query(query, [tagPost], (error, results) => {
        if(error) {
            console.error('loi');
            res.status(500).json({error: 'loi cmnr'});
        } else {
            res.status(200).json(results);
        }
    })
});
app.get('/related_drug/:tag', (req, res) => {
    const tagPost = req.params.tag;
    console.log(tagPost);
    const query = `select posts.title, posts.id
                    from posts 
                    where posts.tag = ?`;
    connection.query(query, [tagPost], (error, results) => {
        if(error) {
            console.error('loi');
            res.status(500).json({error: 'loi cmnr'});
        } else {
            res.status(200).json(results);
        }
    })
});
app.get('/arrange_view', (req, res) => {
    const query = `select * from posts 
                    order by number_of_viewer desc`;
    connection.query(query, (error, results) => {
        if(error) {
            console.error('loi');
            res.status(500).json({error: 'loi cmnr'});
        } else {
            res.status(200).json(results);
        }
    })
});
app.get('/top_posts', (req, res) => {
    const query = `SELECT * FROM posts
                    ORDER BY number_of_viewer DESC
                    LIMIT 4;`;
    connection.query(query, (error, results) => {
        if(error) {
            console.error('loi:', error);
            res.status(500).json({error: 'loi cmnr'});
        } else {
            res.status(200).json(results);
        }
    })
});
app.get('/arrange_dateupdate', (req, res) => {
    const query = `select *
                    from posts 
                    order by date_update desc`;
    connection.query(query, (error, results) => {
        if(error) {
            console.error('loi');
            res.status(500).json({error: 'loi cmnr'});
        } else {
            res.status(200).json(results);
        }
    })
});
app.get('/user/:idUser', (req, res) => {
    const idUser = req.params.idUser;
    const query = `select * from signuplogin where id=?`
    
    connection.query(query, [idUser], (error, results) => {
        if(error) res.status(500).json({error: 'Error to get infor'});
        else res.status(200).json(results[0]);
    })
})
app.delete('/deleteAccount', (req, res) => {
    const userEmail = req.body.useremail;
    const sql = 'DELETE FROM signuplogin WHERE useremail = ?';
  
    connection.query(sql, [userEmail], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error deleting account');
      } else {
        res.send('Account deleted successfully');
      }
    });
  });
  
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
