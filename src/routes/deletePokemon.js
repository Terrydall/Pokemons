const { pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.delete('/api/pokemon', (req, res) => {
        Pokemon.findByPk(req.params.id).then(pokemon => {
            if (pokemon === null) {
                const message = 'Le pokémon demandé n\'existe pas. Réessayez avec un autre identifiant';
                return res.status(404).json({ message })
            }
            const pokemonDeleted = pokemon;
            Pokemon.destroy({
                where: { id: pokemon.id }
            })
                .then(_ => {
                    const message = `Le pokemon avec l'ID n° ${pokemonDeleted} a bien été supprimé.`
                    res.json({ message, data: pokemonDeleted })
                })
        })
            .catch(error => {
                const message = `Le pokémon n\'a pas pu être supprimé. Réessayez dans un instant.`
                res.status(500).json({ message, data: error })
            })
    })
}

//commentaire pour tester git 