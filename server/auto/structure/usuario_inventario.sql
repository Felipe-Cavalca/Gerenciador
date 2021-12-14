CREATE TABLE IF NOT EXISTS `usuario_inventario` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `usuario` int(10) NOT NULL,
    `inventario` int(10) NOT NULL,
    `created` datetime NOT NULL,
    `modified` datetime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;