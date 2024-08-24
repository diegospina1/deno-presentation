create database example_deno;

create table usuarios(
    id bigint not null auto_increment,
    nombre varchar(100) not null, 
    pais varchar(100) not null,
    fecha_creacion datetime default current_timestamp,

    primary key(id)
)