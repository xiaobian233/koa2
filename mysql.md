## mysql01

### DDL 语法
***Data Definition Language***

#### DATABASE 数据库
```sql
-- 创建数据库
CREATE DATABASE 数据库名 ;
```
```sql
-- 不存在数据库则创建
CREATE DATABASE IF NOT EXISTS 数据库名;
```
```sql
-- 设置数据库编码为 UTF-8
ALTER DATABASE 数据库名 CHARSET utf8;
```
```sql
-- 不存在编码为 UTF-8数据库则创建
CREATE DATABASE IF NOT EXISTS 数据库名 CHARSET utf8;
```
```sql
-- 删除数据库
DROP DATABASE 数据库名;
```

#### table 表
```sql
-- 创建表
CREATE TABLE 表名称(
column_name1 data_type(size) [AUTO_INCREMENT] [constraint_name],
column_name2 data_type(size) [constraint_name],
column_name3 data_type(size) [constraint_name]
)
```
```sql
-- 删除表
DROP TABLE 表名称;
```

```sql
-- eg
CREATE TABLE zjszjr_abs.`abs_asset` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `asset_no` varchar(60) NOT NULL COMMENT '资产编号',,
  `interest_rate` decimal(10,2) DEFAULT NULL COMMENT '融资利率',
  `debt_expire_date` date DEFAULT NULL COMMENT '应收账款到期日',
  `loan_days` int(11) DEFAULT NULL COMMENT '融资期限（天）',
  `pay_day` date DEFAULT NULL COMMENT 'E信资产付款日期',
  `ts_asset_id` bigint(20) DEFAULT NULL COMMENT 'E信资产凭证id',
  `file_list` json DEFAULT NULL,
  `lot_app_no` varchar(100) DEFAULT NULL COMMENT 'E信的融资申请编号',
  `enable` bigint(20) NOT NULL DEFAULT '0' COMMENT '是否删除;启用/删除状态：0-禁用/删除，1-启用/正常',
  `create_by` bigint(20) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` bigint(20) DEFAULT NULL COMMENT '更新人',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `abs_asset_asset_no_IDX` (`asset_no`)
) ENGINE=InnoDB AUTO_INCREMENT=1670819613207531522 DEFAULT CHARSET=utf8 COMMENT='abs资产';
```

##### 约束
`PRIMARY` 主键约束 用来唯一标识表中的一行记录

* 主键约束相当于唯一约束+非空约束的组合，主键约束列不允许重复，也不允许出现空值
* 一个表最多只能有一个主键约束
* 主键约束对应着表中的一列或者多列
* 如果是多列组合的复合主键约束，那么这些列都不允许为空值，并且组合的值不允许重复
* 当创建主键约束时，系统默认会在所在的列或列组合上建立对应的主键索引
```sql
-- 将指定字段设置为主键
ALTER TABLE 表名称 ADD PRIMARY KEY (字段名称);

-- 将多个指定字段设置为主键
ALTER TABLE 表名称 ADD PRIMARY KEY (字段名称1,字段名称2);
```

`UNIQUE` 唯一约束 用来限制某个字段/某列的值不能重复

* 同一个表可以有多个唯一约束
* 唯一约束可以是某一个列的值唯一，也可以多个列组合的值唯一
* 唯一性约束允许列值为空
* 在创建唯一约束的时候，如果不给唯一约束命名，就默认和列名相同
* MySQL会给唯一约束的列上默认创建一个唯一索引
```sql
-- 将指定字段设置为不能重复
ALTER TABLE 表名称 ADD UNIQUE KEY (字段名称); 
-- 将指定字段设置为不能重复
ALTER TABLE 表名称 MODIFY 字段名称 字段类型 UNIQUE;
```

`AUTO_INCREMENT` 自增约束 某个字段的值自增

* 一个表最多只能有一个自增长列
* 当需要产生唯一标识符或顺序值时，可设置自增长
* 自增长列约束的列必须是键列（主键列，唯一键列）
* 自增约束的列的数据类型必须是整数类型
```sql
-- 将指定字段设置为自增
ALTER TABLE 表名称 MODIFY 字段名称 字段类型 AUTO_INCREMENT;
```

`NOT NULL` 非空约束 限定某个字段/某列的值不允许为空
```sql
-- 将指定字段设置为非空
ALTER TABLE 表名称 MODIFY 字段名称 字段类型 NOT NULL;
```

`DEFAULT` 默认值约束 在插入数据时，如果此字段没有显式赋值，则赋值为默认值
```sql
ALTER TABLE 表名称 MODIFY 字段名称 字段类型 DEFAULT 默认值;
```

#### column 列/表字段 
```sql
-- 添加字段到已有字段之后
ALTER TABLE 表名称 ADD COLUMN 字段名称 字段类型 COMMENT '字段注释' AFTER 已有字段名称;

-- eg
alter table zjszjr_transaction.ts_cash_warn add column pass_time datetime comment '融资审批通过时间' after interest_party;
```

```sql
-- 编辑指定列
ALTER TABLE 表名称 MODIFY COLUMN 字段名称 字段类型  NULL COMMENT '字段注释';

-- eg
alter table zjszjr_limit.limit_detail modify column product_name varchar(255)  null comment '授信产品';
```

```sql
-- 删除指定列
ALTER TABLE 表名称 DROP COLUMN 字段名称;

--eg
alter table zjszjr_factoring.fac_initiation drop column applicant_identity;
```

#### index 索引
```sql
-- 创建索引
ALTER TABLE 表名称 ADD INDEX 索引名称 (字段名称);

-- eg
alter table zjszjr_transaction.ts_trans_asset add index ts_trans_asset_mid_asset_id_IDX (mid_asset_id);
```

```sql
-- 创建组合索引
CREATE INDEX 索引名称 ON 表名称 (字段名称1,字段名称2);

-- eg
create index ts_trans_asset_lot_id_mid_asset_id_IDX on zjszjr_transaction.ts_trans_asset (mid_asset_id,lot_id);
```

```sql
-- 删除索引
ALTER TABLE 表名称 DROP INDEX 索引名称;

-- eg
alter table zjszjr_transaction.ts_trans_asset drop index ts_trans_asset_lot_id_mid_asset_id_IDX;
```
### DML 语法

#### JSON 
```sql
-- 将表中 value1字段，value2字段以json类型返回
SELECT a, JSON_OBJECT('field1', value1, 'field2', value2, ...) AS json_data FROM your_table;

--eg
select
	JSON_OBJECT('buyerId', buyer_id , 'buyerName', buyer_name) as json_data
from
	zjszjr_factoring.fac_business_decisions
where
	enable = 1
	and buyer_list is null;
```
```sql
-- 将表中 value1字段，value2字段以json数组类型返回
SELECT JSON_ARRAY(JSON_OBJECT('field1', value1, 'field2', value2, ...)) AS json_data FROM your_table;

--eg
select
	JSON_ARRAY(JSON_OBJECT('buyerId', buyer_id , 'buyerName', buyer_name) ) as json_data
from
	zjszjr_factoring.fac_business_decisions
where
	enable = 1
	and buyer_list is null;
```

### explain 执行计划

#### id 
id列的编号是select的序列号，有几个select就有几个id，并且id是按照select出现的顺序增长的，id列的值越大优先级越高，
id相同则是按照执行计划列从上往下执行，id为空则是最后执行

#### select_type 
表示对应行是简单查询还是复杂查询
* `SIMPLE`        不包含子查询和union的简单查询
* `PRIMARY`       复杂查询中最外层的select
* `SUBQUERY`      包含在select中的子查询（不在from的子句中）
* `DERIVED`       包含在from子句中的子查询。mysql会将查询结果放入一个临时表中，此临时表也叫衍生表
* `UNION`         使用了UNION关键字就会被标记为该类型
* `UNION RESULT`  为union合并的结果，一般出现在不带ALL的UNION语句中

#### table
表示当前行访问的是哪张表
当from中有子查询时，table列的格式为<derivedN>，表示当前查询依赖id=N行的查询，所以先执行id=N行的查询
当有union查询时，UNION RESULT的table列的值为<union1,2>，1和2表示参与union的行id

#### partitions
查询将匹配记录的分区，对于非分区表，该值为 NULL

#### type
此列表示关联类型或访问类型，也就是MySQL决定如何查找表中的行（针对单表的访问方法）
依次从最优到最差分别为：system > const > eq_ref > ref > range > index > all
* `NULL`    表示MySQL能在优化阶段分解查询语句，在执行阶段不用再去访问表或者索引
* `const`   MySQL对查询的某部分进行优化并把其转化成一个常量（可以通过show warnings命令查看结果）
* `system`  是const的一个特例，表示表里只有一条元组匹配时为system
* `eq_ref`  主键或唯一键索引被连接使用，最多只会返回一条符合条件的记录。简单的select查询不会出现这种type
* `ref`    相比eq_ref，不使用唯一索引，而是使用普通索引或者唯一索引的部分前缀，索引和某个值比较，会找到多个符合条件的行
* `range`   通常出现在范围查询中，比如in、between、大于、小于等。使用索引来检索给定范围的行
* `index`   扫描全索引拿到结果，一般是扫描某个二级索引，二级索引一般比较少，所以通常比ALL快一点
* `ALL`     全表扫描，扫描聚簇索引的所有叶子节点

#### possible_keys
此列显示在查询中可能用到的索引
如果该列为NULL，则表示没有相关索引，可以通过检查where子句看是否可以添加一个适当的索引来提高性能

#### key
此列显示MySQL在查询时实际用到的索引
在执行计划中可能出现possible_keys列有值，而key列为null，这种情况可能是表中数据不多，MySQL认为索引对当前查询帮助不大而选择了全表查询
如果想强制MySQL使用或忽视possible_keys列中的索引，在查询时可使用force index或ignore index

#### key_len
此列显示MySQL在索引里使用的字节数，通过此列可以算出具体使用了索引中的那些列
索引最大长度为768字节，当长度过大时，MySQL会做一个类似最左前缀处理，将前半部分字符提取出做索引。当字段可以为null时，还需要1个字节去记录

> key_len计算规则：
> * 字符串：
>  `char(n)`     n个数字或者字母占n个字节，汉字占3n个字节
>  `varchar(n)`  n个数字或者字母占n个字节，汉字占3n+2个字节。+2字节用来存储字符串长度。
> * 数字类型：
>  `tinyint`    1字节      
>  `smallint`   2字节               
>  `int`        4字节             
>  `bigint`     8字节
> * 时间类型
>  `date`      3字节        
>  `timestamp` 4字节          
>  `datetime`  8字节

#### ref
此列显示key列记录的索引中，表查找值时使用到的列或常量。常见的有const、字段名

#### rows
此列是MySQL在查询中估计要读取的行数。注意这里不是结果集的行数

#### filtered
表示某个表经过条件过滤之后，剩余记录条数的百分比，值越大越好

#### Extra
此列是一些额外信息
* `Using index ` 使用覆盖索引，即查询和检索条件的列都在使用的索引里面
* `Using where` 使用 where 语句来处理结果，并且查询的列未被索引覆盖
* `Using index condition` 查询的列不完全被索引覆盖，where条件中是一个查询的范围
* `Using join buffer`  即基于块的嵌套循环算法：当被驱动表不能够有效利用索引加快访问速度，mysql就会为其在内存中分配一块join buffer的内存块来加快访问的速度
* `Using temporary` MySQL需要创建一张临时表来处理查询。出现这种情况一般是要进行优化的,一般是由于group by|distinct|union的字段没有索引导致的
* `Using filesort` 将使用外部排序而不是索引排序，数据较小时从内存排序，否则需要在磁盘完成排序,一般是由于order by的字段没有索引导致的
* `Select tables optimized away` 使用某些聚合函数（比如 max、min）来访问存在索引的某个字段时

_如果select后面查询的字段都可以从这个索引的树中获取，不需要通过辅助索引树找到主键,_
_再通过主键去主键索引树里获取其它字段值，这种情况一般可以说是用到了覆盖索引_

> 
> | id | select_type | table | partitions | type | possible_keys | key | key_len | ref | rows | filtered | Extra       |
> |:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|
> |1  |PRIMARY |a   |[NULL] |ALL |[NULL] |[NULL] |[NULL] |[NULL] |736 |0.9 |Using where|
> |1  |PRIMARY |ac  |[NULL] |ref |asset_confirm_asset_id_IDX	|asset_confirm_asset_id_IDX |10 |zjszjr_asset.a.id |1 |100 |Using where;Using index|
> |1  |PRIMARY |<derived2> |[NULL] |ALL |[NULL] |[NULL] |[NULL] |[NULL] |2 |100 |Using where;Using join buffer (Block Nested Loop)|
> |2  |DERIVED |tta |[NULL] |ALL	|ts_trans_asset_lot_id_IDX,ts_trans_asset_mid_asset_id_IDX |[NULL] |[NULL] |[NULL] |642 |10 |Using where;Using temporary;Using filesort|
> |2  |DERIVED |ta  |[NULL] |eq_ref	|PRIMARY |PRIMARY	|8	|zjszjr_transaction.tta.mid_asset_id	|1	|10	|Using |where|
> |2  |DERIVED |tl  |[NULL] |eq_ref	|PRIMARY |PRIMARY	|8	|zjszjr_transaction.tta.lot_id	|1	|5	|Using |where|

```sql
-- 连边查询 - 以 user为中心查询
SELECT * FROM koa.`user` a left join koa.file b on  b.userId  = a.id where a.id=1;
