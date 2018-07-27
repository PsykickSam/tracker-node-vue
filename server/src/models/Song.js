module.exports = (sequelize, DataTypes) => {
    const Song = sequelize.define('Song', {
        title: DataTypes.STRING,
        artist: DataTypes.STRING,
        genre: DataTypes.STRING,
        albam: DataTypes.STRING,
        albamImageUrl: DataTypes.STRING,
        youtubeId: DataTypes.STRING,
        lyrics: DataTypes.TEXT,
        tab: DataTypes.TEXT
    })

    return Song
}
