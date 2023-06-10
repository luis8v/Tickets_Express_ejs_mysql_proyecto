
/**
 * Generado por Database Modeler Pro
 * https://play.google.com/store/apps/details?id=adrian.adbm.pro
 * 
 * Creado: 17 mar 2023
*/


/*
DROP TABLE IF EXISTS `ticket`;
DROP TABLE IF EXISTS `modulo_atencion`;

*/

create database tickets;

use tickets;



CREATE TABLE `modulo_atencion` (
    `id_modulo` INT (10) NOT NULL AUTO_INCREMENT,
    `tipo_modulo` VARCHAR (30) NOT NULL,
    PRIMARY KEY (`id_modulo`)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8;

INSERT INTO `modulo_atencion` (`tipo_modulo`) VALUES
('Caja'),
('Caja'),
('Ejecutivo'),
('Caja'),
('Ejecutivo'),
('Caja'),
('Ejecutivo'),
('Ejecutivo'),
('Caja'),
('Ejecutivo');

drop table ticket;

CREATE TABLE `ticket` (
    `id_ticket` INT (10) NOT NULL AUTO_INCREMENT,
    `id_modulo` INT (10),
    `descripcion` VARCHAR (100) NOT NULL,
    `timestamp` DATETIME NOT NULL,
    `status` TINYINT (1) NOT NULL,
    `es_cliente` TINYINT (1) NOT NULL,
    PRIMARY KEY (`id_ticket`)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8;

select * from ticket where status = 0;

ALTER TABLE `ticket`
ADD FOREIGN KEY modulo_atencion_ticket_fk (`id_modulo`) REFERENCES `modulo_atencion`(`id_modulo`);

drop procedure insertar_ticket;

DELIMITER //

CREATE PROCEDURE `insertar_ticket` (
    IN p_id_modulo INT(10),
    IN p_descripcion VARCHAR(100),
    IN p_status TINYINT(1),
    IN p_cliente TINYINT(1)
)
BEGIN
    INSERT INTO ticket (`id_modulo`, `descripcion`, `timestamp`, `status`, `es_cliente`)
    VALUES (p_id_modulo, CONCAT(p_descripcion,'#', LAST_INSERT_ID()), NOW(), p_status, p_cliente);
END
//

DELIMITER ;

describe ticket;
DELIMITER //
CREATE PROCEDURE `actualizar_ticket` (
    IN p_id_ticket INT(10),
    IN p_id_modulo INT(10),
    IN p_status TINYINT(1)
)
BEGIN
    UPDATE ticket
    SET id_modulo = p_id_modulo, status = p_status
    WHERE id_ticket = p_id_ticket;
END //
DELIMITER ;

select * from ticket;

drop procedure actualizar_ticket;

use ticket;

DELIMITER //

CREATE PROCEDURE actualizar_tickets(
IN p_id_modulo INT(10)
)
BEGIN
  DECLARE contador INT DEFAULT 0;
  DECLARE cliente INT DEFAULT 0;
  DECLARE id INT DEFAULT 0;
  DECLARE registro CURSOR FOR SELECT id_ticket, es_cliente FROM ticket WHERE status = 0 ORDER BY id_ticket ASC;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET contador = -1;

  OPEN registro;
  read_loop: LOOP
    FETCH registro INTO id, cliente;
    IF contador = -1 THEN
      LEAVE read_loop;
    END IF;

    IF cliente = 1 THEN
      IF contador % 2 = 0 THEN
        UPDATE ticket SET status = 1, id_modulo = p_id_modulo WHERE id_ticket = id;
      END IF;
      SET contador = contador + 1;
    ELSE
      UPDATE ticket SET status = 1, id_modulo = p_id_modulo WHERE id_ticket = id;
    END IF;
  END LOOP;

  IF contador = 0 THEN
    UPDATE ticket SET status = 1 WHERE status = 0;
  ELSEIF contador > 0 AND contador % 2 = 1 THEN
    UPDATE ticket SET status = 1 , id_modulo = p_id_modulo WHERE es_cliente = 1 AND status = 0 ORDER BY id_ticket ASC LIMIT 1;
  END IF;

  CLOSE registro;
END //

DELIMITER ;

CALL actualizar_tickets();

use tickets;

select * from ticket;

DELETE FROM ticket WHERE id_ticket > 0;



select * from modulo_atencion;


DELIMITER //

CREATE PROCEDURE `actualizar_ticket` (IN id_modulo_param INT)
BEGIN
    UPDATE ticket SET id_modulo = id_modulo + id_modulo_param, status = 1
    WHERE status = 0 AND es_cliente = 1
    ORDER BY id_ticket ASC
    LIMIT 1;

    IF ROW_COUNT() = 0 THEN
        UPDATE ticket SET id_modulo = id_modulo + id_modulo_param, status = 1
        WHERE status = 0
        ORDER BY id_ticket ASC
        LIMIT 1;
    END IF;
END;
 //

DELIMITER ;

DELIMITER //
CREATE PROCEDURE actualizar_ticket(IN modulo INT)
BEGIN
    DECLARE ticket_id INT;
    DECLARE ticket_cliente TINYINT;
    SET ticket_id = NULL;
    SET ticket_cliente = NULL;

    SELECT id_ticket, es_cliente INTO ticket_id, ticket_cliente FROM ticket WHERE status = 0 ORDER BY es_cliente DESC, RAND() < 0.35 DESC, id_ticket ASC LIMIT 1;

    IF ticket_id IS NOT NULL THEN
        UPDATE ticket SET id_modulo = modulo, status= 1 WHERE id_ticket = ticket_id;
    END IF;
END //
DELIMITER ;



