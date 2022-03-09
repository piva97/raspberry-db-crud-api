create table weather(
    timestamp integer primary key,
    temperatura real,
    temp2 real,
    umidita real,
    pressione real);

insert into weather (timestamp, temperatura, temp2, umidita, pressione)
values(strftime('%s','now'), 13.2, 14.5, 50, 1000),
values(strftime('%s','now'), 13.2, 14.5, 50, 1000),
values(strftime('%s','now'), 13.2, 14.5, 50, 1000);