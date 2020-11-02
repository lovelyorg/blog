递归查询节点及其子节点

    select id,name,pid from t start with id=1 connect by prior id=pid

显示百分比

    select to_char(0.01,'990.99')||'%' from dual;

删除重复数据

    delete tableName
    where name in(select name from tableName group by name having count(1)>1)
    and rowid not in(select min(rowid) from tableName group by name having count(1)>1)

replace

    update SYS_MENU set Text=replace(text,'操作员','用户') where TEXT like '操作员%';
