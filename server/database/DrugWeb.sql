create database DrugWeb;
use DrugWeb;

CREATE TABLE SignupLogIn (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    useremail VARCHAR(255) NOT NULL,
    userpassword VARCHAR(255) NOT NULL,
    confirm_password VARCHAR(255) NOT NULL
);
select * from SignupLogIn;

-- CREATE TABLE login (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     email VARCHAR(255) NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     confirm_password VARCHAR(255) NOT NULL
-- );
-- insert into login(name, email, password, confirm_password)
-- values('mia', 'mia@gmail.com', '123', '123');

-- select*from login;

create table POSTS(
	id int auto_increment primary key,
    title varchar(255) not null,
    author varchar(255),
    cite_source varchar(255),
    content text
);
insert into POSTS (title, author, cite_source, content) 
values();

select * from POSTS;
select * from POSTS where id=5;

-- ///////////////////////////////////////////////////////////////////////////////////////////////////////
create table InformationDrug(
	nameDrug varchar(255) primary key,
    cites varchar(255),
    detail text
);
insert into InformationDrug(nameDrug, cites, detail)
values('3B-Medi', 'Bệnh viện đa khoa quốc tế VINMEC', 'Thuốc dùng điều trị các rối loạn về hệ thần kinh như đau dây thần kinh, viêm dây thần kinh ngoại biên, viêm dây thần kinh mắt, viêm dây thần kinh do đái tháo đường và do rượu, viêm đa dây thần kinh, dị cảm, suy nhược thần kinh, đau dây thần kinh tọa và co giật do tăng tính dễ kích thích của hệ thần kinh trung ương. Thuốc còn được dùng bổ sung khi đang điều trị với isoniazid, reserpin, phenothiazine.'),
('Agifamcin', 'Nhà thuốc Long Châu', 'Agifamcin llà thuốc dùng để điều trị tất cả các thể lao bao gồm cả lao màng não, điều trị phong, nhiễm khuẩn nặng do các chủng do các chủng Staphylococcus, nhiễm Mycobacteriumkhông điển hình ở người bệnh AIDS.'),
('Agifovir', '', 'Agifovir là một chất ức chế nukleotid giả mạo được sử dụng trong điều trị viêm gan do virus vi rút viêm gan B.'),
('Alpha-Choay', 'Bệnh viện đa khoa quốc tế VINMEC', 'Thuốc Alpha Choay (viên nén) là thuốc kháng viêm, phù nề có thành phần hoạt chất là alphachymotrypsin 21 microkatals (5mg). Công dụng thuốc Alpha Choay nhằm điều trị phù nề sau chấn thương, phẫu thuật, bỏng...'),
('Alprazolam-Mylam', 'VNRAS', 'Alprazolam 0,5mg Mylan có chứa thành phần chính alprazolam được sử dụng trong điều trị các triệu chứng trầm cảm, hoảng sợ, lo âu hiệu quả ở người lớn.'),
('Ambron', 'Nhà thuốc Long Châu', 'Thuốc Ambron 30mg của Công ty Cổ phần Dược Vacopharm có thành phần chính là ambroxol, thuốc được sử dụng để điều trị các bệnh cấp và mạn tính ở đường hô hấp có kèm tăng tiết dịch phế quản không bình thường, đặc biệt trong đợt cấp của viêm phế quản mạn, hen phế quản.'),
('Ameflu-Daytime', 'Nhà thuốc An Khang', 'Thuốc được chỉ định làm giảm các triệu chứng trong cảm lạnh và cảm cúm như: sốt, các cơn đau, nhức đầu, ho, đau họng, sung huyết mũi (nghẹt mũi). Làm loãng đờm (chất nhầy) và làm loãng dịch tiết phế quản giúp dễ ho hơn.'),
('Amlodipin', 'Nhà thuốc Long Châu', 'Thuốc chống đau thắt ngực; chống tăng huyết áp; thuốc chẹn kênh calci.'),
('Apha-Bevagyl', 'Bệnh viện đa khoa quốc tế VINMEC', 'Thuốc Apha bevagyl là thuốc kê đơn được dùng khi có chỉ định của bác sĩ, sử dụng trong điều trị các bệnh lý nhiễm trùng răng miệng. Thuốc chứa hai thành phần hoạt chất chính là Metronidazol và Acetyl Spiramycin với hàm lượng trong mỗi viên tương ứng lần lượt là 125m, 100mg.'),
('Arcalio', '', 'Arcalion là một loại thuốc được sử dụng để cải thiện tình trạng mệt mỏi, giúp tăng cường năng lượng và tinh thần. Nó thường được sử dụng trong điều trị mệt mỏi, suy nhược, và các tình trạng tinh thần suy giảm.');

select * from InformationDrug;
select * from InformationDrug where nameDrug = 'Alprazolam-Mylam';

-- //////////////////////////////////////////////////////////////////////////////////////////////////
create table LabelWebsite(
-- 	idWebSite int auto_increment primary key,
    nameWebSite varchar(255) not null primary key,
    imgWebSite varchar(255),
    urlWebSite varchar(255)
);
select * from LabelWebSite;
insert into LabelWebsite(nameWebSite, imgWebSite, urlWebSite) 
values ('Bệnh viện đa khoa quốc tế VINMEC', 'https://www.vinmec.com/static/img/logo.9e7e5ef03cbd.svg', 'https://www.vinmec.com/vi/'),
('Nhà thuốc Long Châu','https://cms-prod.s3-sgn09.fptcloud.com/smalls/Logo_LC_Default_2e36f42b6b.svg','https://nhathuoclongchau.com.vn/');

