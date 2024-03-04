/* L’API Rest et la Base de données : Créer un modèle Sequelize */
const validTypes = ['Plante', 'Poison', 'Insecte', 'Normal', 'Feu', 'Eau', 'Electrik', 'Fée', 'Vol']

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Le nom est déjà pris.'
      },
      validate: {
        notEmpty: { msg: 'Le nom ne peut pas être vide.' },
        notNull: { msg: 'Le nom du pokemon est une propriété requise.' }
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de vie.' },
        min: {
          args: [0],
          msg: 'Les points de vie doivent être supérieur ou égales à 0.'
        },
        max: {
          args: [999],
          msg: 'Les points de vie doivent être inférieur ou égales à 999.'
        },
        notNull: { msg: 'Les points de vie sont une propriété requise.' }
      }
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points d\'attaque.' },
        min: {
          args: [0],
          msg: 'Les points d\'attaque doivent être supérieur ou égales à 0.'
        },
        max: {
          args: [99],
          msg: 'Les points d\'attaque doivent être inférieur ou égales à 99.'
        },
        notNull: { msg: 'Les points d\'attaque sont une propriété requise.' }
      }

    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: { msg: 'Utilisez uniquement une url valide pour les images.' },
        notNull: { msg: 'l\'url est une propriété requise.' }
      }
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('types').split(',')
      },
      set(types) {
        this.setDataValue('types', types.join())
      },
      validate: {
        isTypesValid(value) {
          if (!value) {
            throw new Error('Un pokémon doit au moins avoir un type.')
          }
          if (value.split(',').length > 3) {
            throw new Error('Un pokémon ne peut pas avoir plus de trois types.')
          }
          value.split(',').forEach(type => {
            if (!validTypes.includes(type)) {
              throw new Error(`Le type d\'un pokémon doit appartenir à la liste suivante : ${validTypes}`)
            }
          });
        }
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}