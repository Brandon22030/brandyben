-- Le formulaire de contact propose désormais un troisième choix de pôle
-- ("Je ne sais pas encore") en plus de dev/batiment.
alter type pole add value if not exists 'indetermine';
